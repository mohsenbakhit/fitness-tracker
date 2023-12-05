const FUserTable = require("./tables/UsersTable");
const PaidUser1Table = require("./tables/PaidUser1Table");
const PaidUser2Table = require("./tables/PaidUser2Table");
const ExerciseTable = require("./tables/ExerciseTable");
const TrainerTable = require("./tables/TrainerTable");
const NutritionTable = require("./tables/NutritionTable");
const ContentTable = require("./tables/ContentTable");
const NotificationsTable = require("./tables/NotificationsTable");
const ProgressTable = require("./tables/ProgressTable");
const AdTable = require("./tables/AdTable");
const GoalsTable = require("./tables/GoalsTable");
const GoalReports = require("./tables/GoalReports");
const ExercisePlan = require("./tables/ExercisePlanTable");
const PlanIncludes = require("./tables/PlanIncludes");
const { withOracleDB } = require("./utils/envUtil");

// ----------------------------------------------------------
// Core functions for database operations
// Modify these functions, especially the SQL queries, based on your project's requirements and design.
async function testOracleConnection() {
  return await withOracleDB(async (connection) => {
    return true;
  }).catch(() => {
    return false;
  });
}

async function fetchDemotableFromDb() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT * FROM PaidUser2");

    return result.rows;
  }).catch(() => {
    return [];
  });
}

async function countDemotable() {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute("SELECT Count(*) FROM Goals");
    return result.rows[0][0];
  }).catch(() => {
    return -1;
  });
}

async function fetchTableFromDB(table) {
  return await withOracleDB(async (connection) => {
    const result = await connection.execute(`SELECT * FROM ${table}`);

    return result;
  }).catch(() => {
    return [];
  });
}

async function initalizeAllTables() {
  try {
    await NutritionTable.intializeTable();
    await NutritionTable.loadDummyData();

    await TrainerTable.intializeTable();
    await TrainerTable.loadDummyData();
    console.log("trainer Table added!");

    await FUserTable.intializeTable();
    await FUserTable.loadDummyData();
    console.log("fuser Table added!");

    await PaidUser2Table.intializeTable();
    await PaidUser2Table.loadDummyData();
    console.log("paiduser2 Table added!");

    await PaidUser1Table.intializeTable();
    const FUserKeys = await FUserTable.fetchKeys();
    const Tids = await TrainerTable.fetchTids();
    PaidUser1Table.loadDummyData(FUserKeys, Tids);
    console.log("paiduser1 Table added!");

    console.log("taking 5 second break (so server doesn't overload)");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    await ExerciseTable.intializeTable();
    await ExerciseTable.loadDummyData();
    console.log("exercise Table added!");

    await ExercisePlan.intializeTable();
    await ExercisePlan.loadDummyData(Tids.length);
    console.log("experciseplan Table added!");

    await NutritionTable.intializeTable();
    await NutritionTable.loadDummyData();

    await GoalsTable.intializeTable();
    await GoalsTable.loadDummyData();
    console.log("goals Table added!");

    await AdTable.intializeTable();
    await AdTable.loadDummyData();
    console.log("ad Table added!");

    await ContentTable.intializeTable();
    await ContentTable.loadDummyData();
    console.log("content Table added!");

    await NotificationsTable.intializeTable();
    await NotificationsTable.loadDummyData();
    console.log("notifications Table added!");

    await PlanIncludes.intializeTable();
    await PlanIncludes.loadDummyData();
    console.log("planincludes Table added!");

    await ProgressTable.intializeTable();
    await ProgressTable.loadDummyData();
    console.log("progress Table added!");

    await GoalReports.intializeTable();
    await GoalReports.loadDummyData();
    console.log("goalsreports Table added!");

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

async function dropDatabase() {
  await withOracleDB(async (connection) => {
    connection.execute(`
    BEGIN
       FOR cur_rec IN (SELECT object_name, object_type
                       FROM user_objects
                       WHERE object_type IN
                                 ('TABLE',
                                  'VIEW',
                                  'MATERIALIZED VIEW',
                                  'PACKAGE',
                                  'PROCEDURE',
                                  'FUNCTION',
                                  'SEQUENCE',
                                  'SYNONYM',
                                  'PACKAGE BODY'
                                 ))
       LOOP
          BEGIN
             IF cur_rec.object_type = 'TABLE'
             THEN
                EXECUTE IMMEDIATE 'DROP '
                                  || cur_rec.object_type
                                  || ' "'
                                  || cur_rec.object_name
                                  || '" CASCADE CONSTRAINTS';
             ELSE
                EXECUTE IMMEDIATE 'DROP '
                                  || cur_rec.object_type
                                  || ' "'
                                  || cur_rec.object_name
                                  || '"';
             END IF;
          EXCEPTION
             WHEN OTHERS
             THEN
                DBMS_OUTPUT.put_line ('FAILED: DROP '
                                      || cur_rec.object_type
                                      || ' "'
                                      || cur_rec.object_name
                                      || '"'
                                     );
          END;
       END LOOP;
       FOR cur_rec IN (SELECT * 
                       FROM all_synonyms 
                       WHERE table_owner IN (SELECT USER FROM dual))
       LOOP
          BEGIN
             EXECUTE IMMEDIATE 'DROP PUBLIC SYNONYM ' || cur_rec.synonym_name;
          END;
       END LOOP;
    END;
    `);
  });
}

async function dropAllTables() {
  try {
    await dropDatabase();
    // await PaidUser1Table.dropTable();
    // await PaidUser2Table.dropTable();

    // await ProgressTable.dropTable();
    // await NotificationsTable.dropTable();
    // await NutritionTable.dropTable();
    // await ExerciseTable.dropTable();
    // await GoalsTable.dropTable();
    // await GoalReports.dropTable();
    // await ExercisePlan.dropTable();
    // await PlanIncludes.dropTable();
    // await ContentTable.dropTable();

    // await FUserTable.dropTable();
    // await TrainerTable.dropTable();
    return true;
  } catch (e) {
    console.log("Couldnt drop tables");
    return false;
  }
}

module.exports = {
  testOracleConnection,
  fetchDemotableFromDb,
  countDemotable,
  initalizeAllTables,
  dropAllTables,
  fetchTableFromDB,
};
