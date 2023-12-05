const { withOracleDB } = require("./../utils/envUtil");
// const { hash } = require("bcryptjs");

const SALT_ROUNDS = 1;
const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP SEQUENCE uid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER fuser_insert_trigger`);
   } catch (e) {} 
    await connection.execute(`ALTER TABLE FUser DROP PRIMARY KEY`)
    await connection.execute(`DROP TABLE FUser`);
    console.log('FUser Table dropped.')
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    const result = await connection.execute(`
        CREATE TABLE FUser(
            userid INTEGER,
            name VARCHAR(50),
            email VARCHAR(50),
            password VARCHAR(72),
            PRIMARY KEY (userid),
            CONSTRAINT email_unique UNIQUE (email)
        )
    `);

    const sequence = await connection.execute(`
        CREATE SEQUENCE uid_sequence
            START WITH 1
            INCREMENT BY 1
    `);

    const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER fuser_insert_trigger
        BEFORE INSERT
        ON FUser
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT uid_sequence.nextval INTO :NEW.userid FROM dual;
        END;
    `);
    return true;
  }).catch(() => {
    return false;
  });
};

const loadDummyData = async () => {
  try {
    await insert("Ahmed Khan", "ahmed.khan@gmail.com", "eazyPassword");
    await insert("Maria Rodriguez", "maria.rodriguez@hotmail.com" , "eazyPassword");
    await insert("Yuki Takahashi", "yuki.takahashi@gmail.com" , "eazyPassword");
    await insert("Carlos Silva", "carlos.silva@outlook.com" , "eazyPassword");
    await insert("Priya Patel", "priya.patel@hotmail.com", "eazyPassword");
    await insert("Miguel Rodriguez", "miguel.rodriguez@gmail.com", "eazyPassword");
    await insert("Ananya Gupta", "ananya.gupta@outlook.com", "eazyPassword");
    await insert("Kenji Suzuki", "kenji.suzuki@hotmail.com", "eazyPassword");
    await insert("Fatima Al-Mansoori", "fatima.almansoori@gmail.com", "eazyPassword");
    await insert("Darnell Washington", "darnell.washington@outlook.com", "eazyPassword");
    await insert("Aisha Nkosi", "aisha.nkosi@hotmail.com", "eazyPassword");
    await insert("Ravi Menon", "ravi.menon@gmail.com", "eazyPassword");
    await insert("Sofia Morales", "sofia.morales@outlook.com", "eazyPassword");
    await insert("Khaled Abadi", "khaled.abadi@hotmail.com", "eazyPassword");
    await insert("Aaliyah Rahman", "aaliyah.rahman@gmail.com", "eazyPassword");
    await insert("Juan Carlos Hernandez", "juan.hernandez@outlook.com", "eazyPassword");
    await insert("Zara Ali", "zara.ali@hotmail.com", "eazyPassword");
    await insert("Javier Castillo", "javier.castillo@gmail.com", "eazyPassword");
    await insert("Naomi Okafor", "naomi.okafor@outlook.com", "eazyPassword");
    await insert("Elijah Thompson", "elijah.thompson@gmail.com", "eazyPassword");
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

async function insert(name, email, password) {
  // const hashedPass = await hash(password, SALT_ROUNDS);
  // console.log(`Plain password ${password} hashes to: ${hashedPass}`);
  return await withOracleDB(async (connection) => {
      const result = await connection.execute(
        `INSERT INTO FUser (name, email, password) VALUES (:name, :email, :password)`,
        [name, email, password],
        { autoCommit: true }
      );
      // console.log(true)
      return true;
  }).catch((e) => {
    // console.log(false);
    return false;
  });
}

async function fetch() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM FUser");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchUser(email) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT userid, name, email FROM FUser WHERE email = '${email}'`);
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchUserInfoUsingId(userid) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT f.userid, f.name, f.email, p.postalCode, p.country FROM FUser f JOIN PaidUser1 p ON p.userid= f.userid AND f.userid = '${userid}'`);
    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function fetchUsersWithTrainer(tid) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`
    SELECT f.userid, f.name, f.email FROM FUser f
    INNER JOIN PaidUser1 p ON f.userid = p.userid
    INNER JOIN Trainer t ON t.tid = p.tid AND t.tid = ${tid}
    `);
    return result.rows;
  }).catch(() => {
    return [];
  });
}


async function fetchPassword(email) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT password FROM FUser WHERE email = '${email}'`,);
    return result.rows[0];
  }).catch(() => {
    return [];
  })
}

async function fetchKeys() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT (userid) FROM FUser");
    return result.rows;
  }).catch(() => {
    return [];
  });
}

module.exports = {
  intializeTable,
  insert,
  loadDummyData,
  fetch,
  fetchUser,
  fetchKeys,
  fetchPassword,
  dropTable,
  fetchUserInfoUsingId,
  fetchUsersWithTrainer,
};