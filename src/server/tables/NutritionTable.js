const { autoCommit } = require('oracledb');
const {withOracleDB} = require('./../utils/envUtil');

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP SEQUENCE nid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER nutrition_insert_trigger`);
   } catch (e) {}
    try { 
    await connection.execute(`ALTER TABLE Nutrition DROP CONSTRAINT userid`);
    await connection.execute(`DROP TABLE Nutrition`);
    console.log('Nutrition Table dropped.')
   } catch (e) {}
    return true;
  }).catch(() => {
    return false;
  });
};

const intializeTable = async () => {
  return await withOracleDB(async (connection) => {
    await dropTable();

    try {
        const result = await connection.execute(`
        CREATE TABLE Nutrition(
            nid INTEGER,
            carbs INTEGER,
            fats INTEGER,
            protein INTEGER,
            calories INTEGER,
            userid INTEGER UNIQUE,
            PRIMARY KEY (nid),
            FOREIGN KEY (userid) REFERENCES FUser(userid) ON DELETE CASCADE
        )
    `);
    } catch (e) {
        console.log('Couldnt create table');
    }

    
    try {
        const sequence = await connection.execute(`
        CREATE SEQUENCE nid_sequence
            START WITH 1
            INCREMENT BY 1
    `);
    } catch(e) {
        console.log('Couldnt create sequence');
    }

    try {
        const trigger = await connection.execute(`
        CREATE OR REPLACE TRIGGER nutrition_insert_trigger
        BEFORE INSERT
        ON Nutrition
        REFERENCING NEW AS NEW
        FOR EACH ROW
        BEGIN
        SELECT nid_sequence.nextval INTO :NEW.nid FROM dual;
        END;
    `);
    } catch (e) {
        console.log("Couldnt create trigger");
    }


    return true;
}).catch(() => {
    return false;
});
}

const loadDummyData = async () => {
    await insert(100,100,100,2200 ,1);
    await insert(150,100,80,2400, 2);
    await insert(220,60,120,2300, 3);
    await insert(280,50,90,2400, 4);
    await insert(120,80,120,2800, 5);
    await insert(180,100,100,3200, 6);
}

async function insert(carbs, fats, protein, calories, userid) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Nutrition (carbs, fats, protein, calories, userid) VALUES (:carbs, :fats, :protein, :calories, :userid)`,
            [carbs, fats, protein, calories, userid],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function fetch() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Nutrition');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchUserNutrition(userid) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT * FROM Nutrition WHERE userid= ${userid}`)
    return result.rows;
  })
}

async function fetchKeys() {
    return await withOracleDB(async (connection) => {
      const result = await connection.execute("SELECT (nid) FROM Nutrition");
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
  fetchUserNutrition,
  loadDummyData,
  fetch
}