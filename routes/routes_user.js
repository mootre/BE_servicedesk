const express = require("express");
const cors = require("cors");
const userControl = require("../controllers/controller_user");
const catControl = require("../controllers/controller_cat");
const assetControl = require("../controllers/controller_asset");
const assignControl = require("../controllers/controller_assign");
const middleware = require("../middleware/auth");
const token = require("../events/token_manager");
const { json } = require("body-parser");
const cookieParser = require('cookie-parser');
const router = express.Router();
router.use(cors());

router.get("/", (req, res) => {
  res.send("1234");
});
router.get("/user", userControl.control_getAllUser);
router.get("/user/:id", userControl.control_getByUser);
// GET
router.get("/prodtype", catControl.control_prodtype);
router.get("/owner", catControl.control_owner);
router.get("/v1/listasset", assetControl.control_listasset);
router.get("/v1/listassetassign", assetControl.control_listassetassign);
router.get("/v1/listcomponent", assetControl.control_component);
router.get("/v1/getasset/:id", assetControl.control_assetbyid);
router.get("/v1/gettimeline/:id", assetControl.control_assettimelinebyid);
router.get("/v1/getcomponent/:id", assetControl.control_componentbyid);
router.get("/v1/getassetusersw/:username", assetControl.control_assetusersw);
router.get("/v1/getassetuserhw/:username", assetControl.control_assetuserhw);
// POST
router.post("/v1/addasset", assetControl.control_insertasset);
router.post("/user/login", userControl.control_login);
router.post("/user/refresh",userControl.jwtRefreshTokenValidate, userControl.control_refreshtoken);
router.post("/checktoken", (req, res) => {
  let jwtStatus = token.token_manager.checkAuthToken(req);
  if (jwtStatus) {
    res.send(jwtStatus);
  } else {
    res.send("Token error.");
  }
});
// PUT --
router.put("/v1/updateasset", assetControl.control_updateasset);
router.put("/v1/addassignasset",assignControl.control_insertassign);
router.put("/v1/addassigncomponent",assignControl.control_insertcomponent);
router.put("/v1/deleteassignasset",assignControl.control_deleteassign);
router.put("/v1/deletecomponent",assignControl.control_deletecomponent);
router.put("/v1/updateassign", assetControl.control_updateassigned);


module.exports = router;
