const { withOracleDB } = require("../utils/envUtil");

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP SEQUENCE tid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER trainer_insert_trigger`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TABLE Trainer`);
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
        CREATE TABLE Trainer(
            tid INTEGER,
            name VARCHAR(50),
            email VARCHAR(50),
            password VARCHAR(72),
            city VARCHAR(60),
            country VARCHAR(50),
            PRIMARY KEY (tid),
            CONSTRAINT trainer_email_unique UNIQUE (email)
        )
    `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE tid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER trainer_insert_trigger
        BEFORE INSERT
        ON Trainer
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT tid_sequence.nextval INTO :NEW.tid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  try {
    await insert("Yuki Tanaka", "yuki.tanaka@yahoo.com", "Japan", "JP-Tokyo");
    await insert(
      "Emma Smith",
      "emma.smith@hotmail.com",
      "Australia",
      "AU-Sydney"
    );
    await insert(
      "Kgosi Ndlovu",
      "kgosi.ndlovu@aol.com",
      "South Africa",
      "ZA-Johannesburg"
    );
    await insert('Aarav Patel', 'aarav.patel@outlook.com', 'India', 'IN-New Delhi');
    // await insert('Juan Garcia', 'juan.garcia@icloud.com', 'Mexico', 'MX-Mexico City');
    // await insert('Ivan Petrov', 'ivan.petrov@protonmail.com', 'Russia', 'RU-Moscow');
    // await insert('Ahmed Al-Abdul', 'ahmed.al-abdul@zoho.com', 'Saudi Arabia', 'SA-Riyadh');
    // await insert('Mateo Fernandez', 'mateo.fernandez@yandex.com', 'Argentina', 'AR-Buenos Aires');
    // await insert('Wei Zhang', 'wei.zhang@mail.com', 'China', 'CN-Beijing');
    // await insert('Luca Rossi', 'luca.rossi@inbox.com', 'Italy', 'IT-Rome');
    // await insert('Chinedu Okoro', 'chinedu.okoro@fastmail.com', 'Nigeria', 'NG-Lagos');
    // await insert('Eriksson Andersson', 'eriksson.andersson@protonmail.com', 'Sweden', 'SE-Stockholm');
    // await insert('Minho Kim', 'minho.kim@tutanota.com', 'South Korea', 'KR-Seoul');
    // await insert('Pierre Dubois', 'pierre.dubois@rediffmail.com', 'France', 'FR-Paris');
    // await insert('Ethan Smith', 'ethan.smith@yandex.com', 'Canada', 'CA-Toronto');
    // await insert('Amir Mahmoud', 'amir.mahmoud@icloud.com', 'Egypt', 'EG-Cairo');
    // await insert('Emir Yılmaz', 'emir.yilmaz@outlook.com', 'Turkey', 'TR-Istanbul');
    // await insert('Somsak Wong', 'somsak.wong@mail.com', 'Thailand', 'TH-Bangkok');
    // await insert('Khalid Al-Mansoori', 'khalid.al-mansoori@yahoo.com', 'United Arab Emirates', 'AE-Dubai');
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

async function insert(name, email, country, city, password = "cucumber") {
  const id = Date.now();
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `INSERT INTO Trainer (name, email, country, city, password) VALUES (:name, :email, :country, :city, :password)`,
      [name, email, country, city, password],
      { autoCommit: true }
    );

    return result.rowsAffected && result.rowsAffected > 0;
  }).catch(() => {
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM Trainer");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function accountExists(email) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT * FROM Trainer WHERE email=:email`,
      [email],
      { autoCommit: true }
    );
    if (result.rows.length == 0) return false;
    else return true;
  }).catch(() => {
    return { error: "unable to determine if account exitsts." };
  });
}

async function validateCredentials({ email, password }) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(
      `SELECT * FROM Trainer WHERE email=:email`,
      [email],
      { autoCommit: true }
    );
    if (result.rows.length == 0) return false;
    const storedPw = result.rows[0][3];
    if (storedPw != password) return false;
    return {
      email: result.rows[0][2],
      name: result.rows[0][1],
      tid: result.rows[0][0],
    };
  }).catch(() => {
    return false;
  });
}

async function fetchTids() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (tid) FROM Trainer");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

module.exports = {
  intializeTable,
  loadDummyData,
  fetch,
  fetchTids,
  insert,
  dropTable,
  validateCredentials,
  accountExists,
};
