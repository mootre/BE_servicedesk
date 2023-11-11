const jwtValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);

    const token = req.headers["authorization"].replace("Bearer ", "");

    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) throw new Error(error);
    });
    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};
const jwtRefreshTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);
    const token = req.headers["authorization"].replace("Bearer ", "");
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) throw new Error(error);
      /*// Check if the token has expired
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
      if (decoded.exp && decoded.exp < currentTime) {
        return res.sendStatus(401); // Token has expired
      }*/
      req.user = decoded;
      req.user.token = token;
      delete req.user.exp;
      delete req.user.iat;
    });

    next();
  } catch (error) {
    return res.sendStatus(403);
  }
};

module.exports = {
  jwtValidate,
  jwtRefreshTokenValidate,
};
