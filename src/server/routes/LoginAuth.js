const {
  registerUser,
  isValidCredentials,
} = require("./../utils/authenticate.js");
const { createToken, validateToken } = require("./../utils/webToken.js");
const userTable = require("./../tables/UsersTable");
const paidUser2Table = require("./../tables/PaidUser2Table.js");
const paidUser1Table = require("./../tables/PaidUser1Table.js");

const createRoutes = (router) => {
  router.post("/login-auth", async (req, res) => {
    if (!req) return;
    // console.log(req.body);
    const result = await isValidCredentials(req);
    if (result.length === 0) {
      res.send(false);
      return false;
    }

    const isPaidUser = await paidUser1Table.isPaidUser(result[0][0]);

    res.json({ userid: result[0][0], name: result[0][1], email: result[0][2], freeUser: !isPaidUser });
  });

  router.post("/register", async (req, res) => {
    const data = req.body;

    const invalidEmail = await userTable.fetchUser(data.email);
    if (invalidEmail.length != 0) {
      res.json({ error: "email already in use." });
      return;
    }

    const result = await userTable.insert(data.name, data.email, data.password);

    const userdata = await userTable.fetchUser(data.email);

    // create paidusers entry if not free user
    if (data.freeUser == false) {
      const city = await paidUser2Table.fetchCity(data.postal, data.country);

      // if paiduser2 does not exist, create it.
      if (city == null) {
        await paidUser2Table.insert(data.postal, data.country, data.city);
      }

      // create paiduser1 entry
      await paidUser1Table.insert(userdata[0][0], data.postal, data.country);
    }

    res.json({
      name: data.name,
      email: data.email,
      userid: userdata[0][0],
      freeUser: data.freeUser,
    });
  });
};

module.exports = createRoutes;
