const { withOracleDB } = require("./../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try{
      await connection.execute(`DROP SEQUENCE cid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER content_insert_trigger`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TABLE Content`);
    } catch (e) {}
    
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    const result = await connection.execute(`
        CREATE TABLE Content(
            cid INTEGER,
            url VARCHAR(100),
            author VARCHAR(50),
            PRIMARY KEY (cid)
        )
    `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE cid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER content_insert_trigger
        BEFORE INSERT
        ON Content
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT cid_sequence.nextval INTO :NEW.cid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  try {
    await insert("British Heart Foundation", "https://www.youtube.com/watch?v=wWGulLAa0O0");
    await insert("Science Animated", "https://www.youtube.com/watch?v=Mot-8b8szJI");
    await insert("The Mike Hansen Show", "https://www.youtube.com/watch?v=4WV7kAUGrgI");
    await insert("Braive", "https://www.youtube.com/watch?v=Wto7zISB2d0");
    await insert("NationwideChildrens", "https://www.youtube.com/watch?v=tWYFndopVl8");
    await insert("Meghan Livingstone", "https://www.youtube.com/watch?v=5znuV7Iyrzs");
    await insert("Pick Up Limes", "https://www.youtube.com/watch?v=XulBKrrRC3k");
    await insert("Johns Hopkins Medicine", "https://www.youtube.com/watch?v=zJgHbifIx-Q");
    await insert("Med Today", "https://www.youtube.com/watch?v=zdjWnvbaUZo");
    await insert("Liezl Jayne Strydom", "https://www.youtube.com/watch?v=j4iQkKYFH1E");
    await insert("Body Project", "https://www.youtube.com/watch?v=gC_L9qAHVJ8");
    await insert("Body Project", "https://www.youtube.com/watch?v=3SpPraOLJl4");
    await insert("National Institute on Aging", "https://www.youtube.com/watch?v=MjMkBaqimFo");
    await insert("Oasis Mental Health Applications", "https://www.youtube.com/watch?v=fRDccGSLE9k");
    await insert("TEDx Talks", "https://www.youtube.com/watch?v=37UhELFvPec");
    await insert("Doctor Mike Hansen", "https://www.youtube.com/watch?v=XqTcye_acTI");
    await insert("TED", "https://www.youtube.com/watch?v=BHY0FxzoKZE");
    await insert("Bestie", "https://www.youtube.com/watch?v=inEPlZZ_SfA");
    await insert("Dr. Eric Berg DC", "https://www.youtube.com/watch?v=VhVqz4KuEgI");
    await insert("Coach Viva", "https://www.youtube.com/watch?v=GIqW2qds3qI");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

async function insert(url, author) {
  const id = Date.now();
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Content (url, author) VALUES (:url, :author)`,
      [url, author],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM Content");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (cid) FROM Content");
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
