const userTable = require("./../tables/UsersTable");
const exerciseTable = require("./../tables/ExerciseTable");
const exercisePlanTable = require("./../tables/ExercisePlanTable");
const PlanIncludesTable = require("./../tables/PlanIncludes");
const TrainerTable = require("./../tables/TrainerTable");
const { withOracleDB } = require("./../utils/envUtil");

const createRoutes = (router) => {
  router.get("/fuser-table", async (req, res) => {
    const tableContent = await userTable.fetch();
    res.json(tableContent);
  });

  router.get("/exercise-table", async (req, res) => {
    const tableContent = await exerciseTable.fetch();
    console.log(tableContent);
    res.json(tableContent);
  });

  router.post("/get-clients", async (req, res) => {
    const arg = req.body;

    const tableContent = await userTable.fetchUsersWithTrainer(arg.tid);

    // console.log(tableContent);

    res.json(tableContent || { sorry: "error" });
  });

  router.post("/view-client-plans", async (req, res) => {
    const args = req.body;

    // console.log(req.body);

    const tableContent = await exercisePlanTable.fetchUserPlans(args.userid);
    res.json(tableContent);
  });

  router.post("/view-client-info", async (req, res) => {
    const args = req.body;

    const tableContent = await userTable.fetchUserInfoUsingId(args.userid);
    // console.log("table content: ", tableContent);
    res.json(tableContent);
  });

  router.post("/delete-exercise-plan", async (req, res) => {
    const args = req.body;

    const result = await exercisePlanTable.removeUsingId(args.epid);
    res.json({ status: result });
  });

  router.post("/create-exercise-plan", async (req, res) => {
    const args = req.body;

    const result = await exercisePlanTable.insert(
      args.category,
      args.tid,
      args.userid
    );
    const epid = (await exercisePlanTable.fetchKeys()).length;

    for (const eid of args.eids) {
      await PlanIncludesTable.insert(epid, eid);
    }

    res.json({ status: "true" });
  });

  router.post("/edit-exercise-plan", async (req, res) => {
    const args = req.body;

    console.log("TODO: IMPLEMENT EDIT:", args);

    const result = await exercisePlanTable.updatePlanType(
      args.epid,
      args.category
    );

    await PlanIncludesTable.clearEpid(args.epid);

    for (const eid of args.eids) {
      await PlanIncludesTable.insert(args.epid, eid);
    }

    res.json({ status: "true" });
  });

  router.post("/get-exercise-plan-info", async (req, res) => {
    const args = req.body;

    const selectedExercises = await PlanIncludesTable.fetchWithEpid(args.epid);

    const planName = await exercisePlanTable.getPlanName(args.epid);

    res.json({
      eids: selectedExercises.map((value) => value[0]),
      category: planName[0][0],
    });
  });

  router.post("/trainer-login", async (req, res) => {
    if (!req) return;
    const result = await TrainerTable.validateCredentials(req.body);
    res.json(result);
  });

  router.post("/trainer-register", async (req, res) => {
    const data = req.body;

    const invalidEmail = await TrainerTable.accountExists(data.email);
    if (invalidEmail) {
      res.json({ error: "email already in use." });
      return;
    }

    console.log("email alr exists", invalidEmail);

    const result = await TrainerTable.insert(
      data.name,
      data.email,
      data.country,
      data.city,
      data.password
    );

    console.log(result);

    res.json({ username: data.username, password: data.password });
  });
};

module.exports = createRoutes;
