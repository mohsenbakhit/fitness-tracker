const express = require("express");
const appService = require("./appService");
const createTrainerRoutes = require("./routes/TrainerPage");
const createExerciseRoutes = require("./routes/Exercise");
const createNutritionRoutes = require("./routes/Nutrition");
const createProgressRoutes = require("./routes/ProgressPage");
const createExercisePlanRoutes = require("./routes/ExercisePlan");
const createContentRoutes = require("./routes/Content");
const createloginAuthRoutes = require("./routes/LoginAuth");
const createNotificationsRoutes = require("./routes/Notifications");
const createGoalsRoutes = require("./routes/Goals");
const createAdRoutes = require("./routes/Ad")
const router = express.Router();

// !! CUSTOM ROUTES
createTrainerRoutes(router);
createExerciseRoutes(router);
createNutritionRoutes(router);
createProgressRoutes(router);
createExercisePlanRoutes(router);
createNotificationsRoutes(router);
createGoalsRoutes(router);
createAdRoutes(router);
createContentRoutes(router);

createloginAuthRoutes(router);

// ----------------------------------------------------------
// API endpoints
// Modify or extend these routes based on your project's needs.
router.get("/check-db-connection", async (req, res) => {
  const isConnect = await appService.testOracleConnection();
  if (isConnect) {
    res.send("connected");
  } else {
    res.send("unable to connect");
  }
});

router.get("/demotable", async (req, res) => {
  const tableContent = await appService.fetchDemotableFromDb();
  res.json({ data: tableContent });
});

router.get("/count-demotable", async (req, res) => {
  const tableCount = await appService.countDemotable();
  if (tableCount >= 0) {
    res.json({
      success: true,
      count: tableCount,
    });
  } else {
    res.status(500).json({
      success: false,
      count: tableCount,
    });
  }
});


// ### CUSTOM API ROUTES

router.post("/initalize-tables", async (req, res) => {
  const initiateResult = await appService.initalizeAllTables();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.post("/drop-all-tables", async (req, res) => {
  const initiateResult = await appService.dropAllTables();
  if (initiateResult) {
    res.json({ success: true });
  } else {
    res.status(500).json({ success: false });
  }
});

router.post("/custom-query", async (req, res) => {
  const data = req.body;
  const result = await appService.fetchTableFromDB(data.table);
  res.json({ data: result.rows, head: result.metaData });
});


module.exports = router;