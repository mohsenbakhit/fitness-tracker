// const { sign, verify } = require("jsonwebtoken");

// const createToken = (email, id) => {
//   return sign({ email, id }, envVariables.ACCESS_TOKEN_KEY);
// };

// const validateToken = (token) => {
//   if (!token) return false;
//   try {
//     return verify(token, envVariables.ACCESS_TOKEN_KEY);
//   } catch {
//     return false;
//   }
// };

// const getTokenKeys = (token) => {
//   const tokenData = validateToken(token);
//   const id = tokenData.id;
//   const email = tokenData.email;
//   return { id, email };
// };

// module.exports = { createToken, validateToken, getTokenKeys };