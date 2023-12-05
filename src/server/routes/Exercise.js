const exerciseTable = require("../tables/ExerciseTable");

const createRoutes = (router) => {
  router.get("/exercise-table", async (req, res) => {
    const exContent = await exerciseTable.fetch();
    res.json(exContent);
  });
}

module.exports = createRoutes;