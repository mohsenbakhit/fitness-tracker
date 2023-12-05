const {withOracleDB} = require('./../utils/envUtil');

const dropTable = async () => {
  return await withOracleDB(async (connection) => {
    try {
      await connection.execute(`DROP SEQUENCE eid_sequence`);
    } catch (e) {}
    try {
      await connection.execute(`DROP TRIGGER exercise_insert_trigger`);
   } catch (e) {}
    try { 
    await connection.execute(`DROP TABLE Exercise`);
    console.log('Exercise Table dropped.')
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
      CREATE TABLE Exercise(
          eid INTEGER,
          name VARCHAR(50),
          etype VARCHAR(50),
          PRIMARY KEY (eid)
      )
    `);

    
      const sequence = await connection.execute(`
      CREATE SEQUENCE eid_sequence
          START WITH 1
          INCREMENT BY 1
  `);

    const trigger = await connection.execute(`
    CREATE OR REPLACE TRIGGER exercise_insert_trigger
    BEFORE INSERT
    ON Exercise
    REFERENCING NEW AS NEW
    FOR EACH ROW
    BEGIN
    SELECT eid_sequence.nextval INTO :NEW.eid FROM dual;
    END;
    `);


    return true;
}).catch(() => {
    return false;
});
}

const loadDummyData = async () => {
    await insert("Barbell Front Squat", "Resistance/Conditioning");
    await insert("Barbell Back Squat", "Resistance/Conditioning");
    await insert("Barbell Bench Press", "Resistance/Conditioning");
    await insert("Bulgarian Split Squats", "Resistance/Conditioning");
    await insert("Deadlifts", "Resistance/Conditioning");
    await insert("Lat pulldowns", "Resistance/Conditioning");
    await insert("Suicides", "Cardio");
    await insert("100m dash", "Cardio");
    await insert("5k run", "Cardio");
    await insert("1 mile run", "Cardio");
    await insert("jumping ropes", "Cardio");
    await insert("30 min swim", "Cardio");
    await insert("freestyle strokes", "Swimming");
    await insert("Backstrokes", "Swimming");
    await insert("Butterfly strokes", "Swimming");
    await insert("Breaststrokes", "Swimming");
    await insert("Downward Dog","Yoga");
    await insert("Cat","Yoga");
    await insert("Cow","Yoga");
    await insert("Warrior 1","Yoga");
    await insert("Warrior 2","Yoga");
    await insert("Brazilian Jui Jitsu (No Gi)", "Martial Arts");
    await insert("Wrestling", "Martial Arts");
    await insert("Muay Thai", "Martial Arts");
    await insert("Boxing", "Martial Arts");
    await insert("Transition work", "Martial Arts");
    await insert("Takedown defence", "Martial Arts");

}

async function insert(name, etype) {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute(
            `INSERT INTO Exercise (name, etype) VALUES (:name, :etype)`,
            [name, etype],
            { autoCommit: true }
        );

        return result.rowsAffected && result.rowsAffected > 0;
    }).catch(() => {
        return false;
    });
}

async function fetch() {
    return await withOracleDB(async (connection) => {
        const result = await connection.execute('SELECT * FROM Exercise');
        return result.rows;
    }).catch(() => {
        return [];
    });
}

async function fetchKeys() {
    return await withOracleDB(async (connection) => {
      const result = await connection.execute("SELECT (eid) FROM Exercise");
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
}