const exercisePlanTable = require("../tables/ExercisePlanTable");
const planIncludes = require("./../tables/PlanIncludes");
const createRoutes = (router) => {
  router.post("/exerciseplan-table", async (req, res) => {
    const epid_list = await exercisePlanTable.fetchUserPlans(req.body.token.userid);
    const eid_list = []
    for (let i = 0; i < epid_list.length; i++) {
      eid_list.push(await planIncludes.fetchExerciseForPlan(epid_list[i][0]));
      console.log(eid_list);

    }
    res.send(eid_list);
  });
}

module.exports = createRoutes;