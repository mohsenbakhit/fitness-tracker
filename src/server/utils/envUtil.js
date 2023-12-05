const fs = require('fs');
const oracledb = require('oracledb');

const envVariables = loadEnvFile('.env');

// Database configuration setup. Ensure your .env file has the required database credentials.
const dbConfig = {
    user: envVariables.ORACLE_USER,
    password: envVariables.ORACLE_PASS,
    connectString: `${envVariables.ORACLE_HOST}:${envVariables.ORACLE_PORT}/${envVariables.ORACLE_DBNAME}`
};

// ----------------------------------------------------------
// Wrapper to manage OracleDB actions, simplifying connection handling.
async function withOracleDB(action) {
    let connection;
    try {
        connection = await oracledb.getConnection(dbConfig);
        return await action(connection);
    } catch (err) {
        console.error(err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
}


function loadEnvFile(filePath) {
    if (fs.existsSync(filePath)) {
        const envFile = fs.readFileSync(filePath, 'utf8');

        const envVars = envFile.split('\n').reduce((acc, line) => {
            const [key, value] = line.split('=');
            acc[key] = value;
            return acc;
        }, {});

        return envVars;
    } else {
        console.error(`.env file not found at ${filePath}`);
        return {};
    }
}

module.exports = {loadEnvFile, withOracleDB};