import jwt from "jsonwebtoken";
import keys from "../keys.js";
function createToken(id: string) {
  const token = jwt.sign({ id: id }, keys.jwtSecretKey, {
    expiresIn: keys.jwtExpires,
  });
  const options = {
    expires: new Date(
      Date.now() + parseInt(keys.cookieExpire) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  return { token, options };
}
export default createToken;
