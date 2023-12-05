const contentTable = require("./../tables/ContentTable");

const createRoutes = (router) => {
  router.get("/content-table", async (req, res) => {
    const conContent = await contentTable.fetch();
    console.log(conContent);
    res.json(conContent);
  });
}

module.exports = createRoutes;