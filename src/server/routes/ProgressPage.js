const userTable = require("./../tables/ProgressTable");

const createRoutes = (router) => {
  router.post("/progress-table", async (req, res) => {
    const tableContent = await userTable.fetchUserProgress(req.body.userid);
    res.json(tableContent);
  });
}

module.exports = createRoutes;