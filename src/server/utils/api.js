const { registerUser, isValidCredentials } = require("../util/authenticate.js");
const { createToken, validateToken } = require("../util/webToken.js");

const loginAndRegisterRoutes = (router) => {
router.post("/register", async (req, res) => {
  const inputData = validateLoginInput(req);
  if (!inputData) return;

  const isValid = await registerUser(inputData);

  const resData = { token: isValid && createToken(inputData.email, inputData.id) };

  res.status(isValid ? 200 : 403).send(resData);
});

router.post("/login", async (req, res) => {
  const inputData = validateLoginInput(req);
  if (!inputData) return;

  const isValid = await isValidCredentials(inputData);

  const resData = { token: isValid && createToken(inputData.email, inputData.id) };
  res.status(isValid ? 200 : 403).send(resData);
});
}
module.exports = { loginAndRegisterRoutes };