const { token_manager } = require("../events/token_manager");
const eventsData = require("../events/users");
require("../middleware/auth").jwtRefreshTokenValidate;
const cookieParser = require('cookie-parser');

const jwt = require("jsonwebtoken");
const jwtGenerate = (user) => {
  const accessToken = jwt.sign(
    { id: user.username, name: user.fullname, auth: user.auth },
    process.env.TOKEN_KEY,
    { expiresIn: "15m", algorithm: "HS256" }
  );
  return accessToken;
};
const jwtRefreshTokenGenerate = (user) => {
  const refreshToken = jwt.sign(
    { id: user.username, name: user.fullname, auth: user.auth },
    process.env.TOKEN_KEY,
    { expiresIn: "1h", algorithm: "HS256" }
  );
  return refreshToken;
};
const jwtRefreshTokenValidate = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) return res.sendStatus(401);
    const token = req.headers["authorization"].replace("Bearer ", "");
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
      if (err) throw new Error(error);
      // Check if the token has expired
      const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
      if (decoded.exp && decoded.exp < currentTime) {
        return res.sendStatus(401); // Token has expired
      }
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
const control_getAllUser = async (req, res) => {
  try {
    const eventlist = await eventsData.getAlluser();
    res.status(200).json(eventlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const control_getByUser = async (req, res, next) => {
  try {
    const eventId = req.params.id;
    const event = await eventsData.getByUser(eventId);
    if (event[0] == null) {
      return res.status(401).send("not found!.");
    } else {
      res.status(200).send({"status":200,"result":event[0]});
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};
const control_login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const incorrect = await eventsData.getUserLogin(username, password);
    if (incorrect[0] == null) {
      return res.status(401).json({ message: username });
    } else {
      const access_token = jwtGenerate(incorrect[0]);
      const refresh_token = jwtRefreshTokenGenerate(incorrect[0]);
      res.status(200).json({"status":200,"user":{"name":incorrect[0].username,"accesstoken":access_token,"refreshtoken": refresh_token} });


      /*//const token = jwt.sign({userid:eventId},process.env.TOKEN_KEY,{expiresIn: '1h'});
      //res.status(200).json({event,token:token})
      let token = token_manager.generateToken({ id: username });
      res
        .status(200)
        .json({
          id: username,
          fullname: incorrect[0].fullname,
          auth: incorrect[0].auth,
          token: token,
        });
      //res.status(200).json(incorrect)*/
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
};
const control_refreshtoken = async (req, res) => {
  const user = {
    username: req.user.id,
    fullname: req.user.name,
    auth: req.user.auth,
  };
  const access_token = jwtGenerate(user);
  const refresh_token = jwtRefreshTokenGenerate(user);

  return res.json({
    access_token,
    refresh_token,
  });
};

module.exports = {
  control_getAllUser,
  control_getByUser,
  control_login,
  control_refreshtoken,
  jwtRefreshTokenValidate,
};
