const eventsData = require("../events/assign");

const control_insertassign = async (req, res) => {
    try {
      const {
        username,
        itemid,
        assignby
      } = req.body;
      const result = await eventsData.assignAsset(
        username,
        itemid,
        assignby
      );
      if (result !== null) {
        res
          .status(200)
          .json({ status: 200, message: "Successfully." });
      } else {
        res.status(401).json({ status: 401, message: "Failed." });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  const control_insertcomponent = async (req, res) => {
    try {
      const {
        username,
        itemid,
        component,
        assignby
      } = req.body;
      const result = await eventsData.assignComponent(
        username,
        itemid,
        component,
        assignby
      );
      if (result !== null) {
        res
          .status(200)
          .json({ status: 200, message: "Successfully." });
      } else {
        res.status(401).json({ status: 401, message: "Failed." });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  const control_deleteassign = async (req, res) => {
    try {
      const {
        username,
        itemid,
        assignby
      } = req.body;
      const result = await eventsData.deleteassignAsset(
        username,
        itemid,
        assignby
      );
      if (result !== null) {
        res
          .status(200)
          .json({ status: 200, message: "Successfully." });
      } else {
        res.status(401).json({ status: 401, message: "Failed." });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  const control_deletecomponent = async (req, res) => {
    try {
      const {
        username,
        parentid,
        childid
      } = req.body;
      const result = await eventsData.deletecomponent(
        username,
        parentid,
        childid
      );
      if (result !== null) {
        res
          .status(200)
          .json({ status: 200, message: "Successfully." });
      } else {
        res.status(401).json({ status: 401, message: "Failed." });
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  module.exports={
    control_deleteassign,
    control_insertassign,
    control_insertcomponent,
    control_deletecomponent
  }