const {withOracleDB} = require("../utils/envUtil");

const dropTable = async () => {
    return await withOracleDB(async (connection) => {
        try {
            await connection.execute(`DROP TABLE GoalReports`);
            return true; 
        } catch(e) {}
    }).catch(() => {return false;});
};


const intializeTable = async () => {
    return await withOracleDB(async (connection) => {
      await dropTable();
  
      const result = await connection.execute(`
        CREATE TABLE GoalReports(
            gid INTEGER,
            pid INTEGER,
            PRIMARY KEY(gid, pid),
            FOREIGN KEY(gid) REFERENCES Goals(gid) ON DELETE CASCADE,
            FOREIGN KEY(pid) REFERENCES ProgressReport(pid) ON DELETE CASCADE
        )
      `);
      return true;
  }).catch(() => {
      return false;
  });
  }
  
  const loadDummyData = async () => {
      await insert(1,1);
      await insert(1,2);
      await insert(1,3);
      await insert(2,1);
      await insert(2,3);
      await insert(3,2);

  }
  
  async function insert(gid, pid) {
      return await withOracleDB(async (connection) => {
          const result = await connection.execute(
              `INSERT INTO GoalReports (gid, pid) VALUES (:gid, :pid)`,
              [gid, pid],
              { autoCommit: true }
          );
  
          return result.rowsAffected && result.rowsAffected > 0;
      }).catch(() => {
          return false;
      });
  }
  
  async function fetch() {
      return await withOracleDB(async (connection) => {
          const result = await connection.execute('SELECT * FROM GoalReports');
          return result.rows;
      }).catch(() => {
          return [];
      });
  }
  
  async function fetchKeys() {
      return await withOracleDB(async (connection) => {
        const result = await connection.execute("SELECT (gid) FROM GoalReports");
        return result.rows;
      }).catch(() => {
        return [];
      });
    }
  
  module.exports = {
    intializeTable,
    dropTable,
    fetch,
    fetchKeys,
    loadDummyData,
    fetch
  }