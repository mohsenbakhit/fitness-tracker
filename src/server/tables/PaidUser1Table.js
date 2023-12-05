const { withOracleDB } = require("../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    await connection.execute(`DROP TABLE PaidUser1`);
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    const result = await connection.execute(`
        CREATE TABLE PaidUser1(
            userid INTEGER,
            postalCode VARCHAR(10),
            country VARCHAR(50),
            tid INTEGER,
            PRIMARY KEY (userid, postalCode, country),
            FOREIGN KEY (postalCode, country) REFERENCES PaidUser2(postalCode, country),
            FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE,
            FOREIGN KEY (tid) REFERENCES Trainer(tid) ON DELETE CASCADE
        )
    `);
    return true;
  }).catch(() => {
    return false;
  });
};

async function getBestTrainer() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`
    SELECT tid, COUNT(*) AS c
        FROM PaidUser1
        GROUP BY tid
        HAVING COUNT(*) = (
            SELECT MIN(c2)
            FROM (
                SELECT COUNT(*) AS c2
                FROM PaidUser1
                GROUP BY tid
            )
        )
    `);
    try {
      if(result.rows.length != 0) {
        return result.rows[0][0];
      } else {
        return 1;
      }
    } catch (e) {
      return -1;
    }
  }).catch(() => {
    return -1;
  });
}

const loadDummyData = async (userids, tids) => {
  const DUMMY_DATA = [
    ["20040-010", "Brazil"],
    ["100-0001", "Japan"],
    ["2000", "Australia"],
    ["2196", "South Africa"],
    ["110001", "India"],
    ["06010", "Mexico"],
    ["101000", "Russia"],
    ["11564", "Saudi Arabia"],
    ["C1002AAP", "Argentina"],
    ["100010", "China"],
    ["00100", "Italy"],
    ["900001", "Nigeria"],
    ["111 20", "Sweden"],
    ["03187", "South Korea"],
    ["75001", "France"],
    ["M5A 1A1", "Canada"],
    ["11511", "Egypt"],
    ["34000", "Turkey"],
    ["10100", "Thailand"],
    ["12345", "United Arab Emirates"],
  ];
  const DATA_SIZE = DUMMY_DATA.length;

  for (let i = 0; i < userids.length; i++) {
    const userid = userids[i][0];
    const tid = tids[i % tids.length][0];
    await insert(
      userid,
      DUMMY_DATA[i % DATA_SIZE][0],
      DUMMY_DATA[i % DATA_SIZE][1],
      tid
    );
  }
};

async function insert(userId, postalCode, country, tid = -1) {
  return await withOracleDB(async (connection) => {
    const trainer = await getBestTrainer();
    if (tid == -1) tid = trainer;

    const result = await connection.execute(
      `INSERT INTO PaidUser1 (userid, postalCode, country, tid) VALUES (:userId, :postalCode, :country, :tid)`,
      [userId, postalCode, country, tid],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM PaidUser1");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function isPaidUser(userid) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT * FROM PaidUser1 WHERE userid=${userid}`);
    return result.rows.length > 0;
  }).catch(() => {
    return [];
  });
}

module.exports = {
  intializeTable,
  loadDummyData,
  fetch,
  dropTable,
  getBestTrainer,
  insert,
  isPaidUser
};
