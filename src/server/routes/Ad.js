const adTable = require("./../tables/AdTable");

const createRoutes = (router) => {
  router.post("/get-ad", async (req, res) => {
    const userid = req.body.userid;
    const result = await adTable.fetch(userid);
    const noAd = [0, "No Ads LEft", "/"];

    console.log(result);
    if (result.length > 0) {
      let ridx = Math.floor(Math.random() * result.length);
      res.json(result[ridx]);
    } else {
      res.json(false);
    }
  });
};

module.exports = createRoutes;
