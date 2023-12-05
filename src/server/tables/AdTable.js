const { withOracleDB } = require("./../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP SEQUENCE aid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER ad_insert_trigger`);
   } catch (e) {} 
    await connection.execute(`DROP TABLE Ad`);
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    const result = await connection.execute(`
        CREATE TABLE Ad(
            aid INTEGER,
            company VARCHAR(50),
            url VARCHAR(50),
            PRIMARY KEY (aid)
        )
    `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE aid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER ad_insert_trigger
        BEFORE INSERT
        ON Ad
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT aid_sequence.nextval INTO :NEW.aid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};



const loadDummyData = async () => {
  try {
    await insert("Google", "https://www.google.com");
    await insert("Apple", "https://www.apple.com");
    await insert("Microsoft", "https://www.microsoft.com");
    await insert("Amazon", "https://www.amazon.com");
    await insert("Facebook", "https://www.facebook.com");
    await insert("Tesla", "https://www.tesla.com");
    await insert("Netflix", "https://www.netflix.com");
    await insert("Twitter", "https://www.twitter.com");
    await insert("IBM", "https://www.ibm.com");
    await insert("Salesforce", "https://www.salesforce.com");
    await insert("Adobe", "https://www.adobe.com");
    await insert("Intel", "https://www.intel.com");
    await insert("Cisco", "https://www.cisco.com");
    await insert("HP", "https://www.hp.com");
    await insert("Oracle", "https://www.oracle.com");
    await insert("Uber", "https://www.uber.com");
    await insert("Airbnb", "https://www.airbnb.com");
    await insert("Spotify", "https://www.spotify.com");
    await insert("Dropbox", "https://www.dropbox.com");
    await insert("Slack", "https://www.slack.com");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

async function insert(company, url) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Ad (company, url) VALUES (:company, :url)`,
      [company, url],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM Ad");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (aid) FROM Ad");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

module.exports = {
  intializeTable,
  loadDummyData,
  fetch,
  fetchKeys,
  dropTable,
};
