const { withOracleDB } = require("../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    await connection.execute(`DROP TABLE PaidUser2`);
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    const result = await connection.execute(`
        CREATE TABLE PaidUser2(
            postalCode VARCHAR(20),
            country VARCHAR(50),
            city VARCHAR(60),
            PRIMARY KEY (postalCode, country)
        )
    `);
    // await loadDummyData();
    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  const DUMMY_DATA = [
    ["20040-010", "Brazil", "BR-Rio de Janeiro"],
    ["100-0001", "Japan", "JP-Tokyo"],
    ["2000", "Australia", "AU-Sydney"],
    ["2196", "South Africa", "ZA-Johannesburg"],
    ["110001", "India", "IN-New Delhi"],
    ["06010", "Mexico", "MX-Mexico City"],
    ["101000", "Russia", "RU-Moscow"],
    ["11564", "Saudi Arabia", "SA-Riyadh"],
    ["C1002AAP", "Argentina", "AR-Buenos Aires"],
    ["100010", "China", "CN-Beijing"],
    ["00100", "Italy", "IT-Rome"],
    ["900001", "Nigeria", "NG-Lagos"],
    ["111 20", "Sweden", "SE-Stockholm"],
    ["03187", "South Korea", "KR-Seoul"],
    ["75001", "France", "FR-Paris"],
    ["M5A 1A1", "Canada", "CA-Toronto"],
    ["11511", "Egypt", "EG-Cairo"],
    ["34000", "Turkey", "TR-Istanbul"],
    ["10100", "Thailand", "TH-Bangkok"],
    ["12345", "United Arab Emirates", "AE-Dubai"],
  ];

  for (let city of DUMMY_DATA) {
    await insert(city[0], city[1], city[2]);
  }
};

async function insert(postalCode, country, city) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO PaidUser2 (postalCode, country, city) VALUES (:postalCode, :country, :city)`,
      [postalCode, country, city],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM PaidUser2");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchCity(postalCode, country) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT city FROM PaidUser2 WHERE postalCode=:postalCode AND country=:country`,
      [postalCode, country],
      { autoCommit: true }
    );
    try {
      return result.rows[0][0];
    } catch (e) {
      return null;
    }
  }).catch(() => {
    return null;
  });
}

module.exports = {
  intializeTable,
  loadDummyData,
  fetch,
  dropTable,
  fetchCity,
  insert
};
