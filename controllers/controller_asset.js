const eventsData = require("../events/asset");

const control_listasset = async (req, res) => {
  try {
    const eventlist = await eventsData.getAllAsset();
    res.status(200).json(eventlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const control_listassetassign = async (req, res) => {
  try {
    const eventlist = await eventsData.getAllAssetAssign();
    res.status(200).json(eventlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const control_component = async (req, res) => {
  try {
    const eventlist = await eventsData.getAllComponent();
    res.status(200).json(eventlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const control_assetbyid = async (req, res) => {
  try {
    const ItemID = req.params.id;
    const result = await eventsData.getAssetbyid(ItemID);
    if (result.success) {
      return res.status(200).json({ status: 200, result });
    }
    return res.status(400).json({ status: 400, result });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const control_assettimelinebyid = async (req, res) => {
  try {
    const ItemID = req.params.id;
    const result = await eventsData.getAssetTimelinebyid(ItemID);
    if (result.success) {
      return res.status(200).json({ status: 200, result });
    }
    return res.status(400).json({ status: 400, result });
  } catch (error) {
    res.status(404).send(error.message);
  }
};
const control_componentbyid = async (req, res) => {
  try {
    const ItemID = req.params.id;
    const result = await eventsData.getComponentbyid(ItemID);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const control_insertasset = async (req, res) => {
  try {
    const {
      name,
      assetit,
      assetacc,
      inv,
      invdate,
      type,
      status,
      serial,
      serialno,
      model,
      manufactor,
      supplier,
      category,
      edition,
      version,
      instal,
      qty,
      sdate,
      edate,
      description,
      insertby,
    } = req.body;
    const result = await eventsData.insertAsset(
      name,
      assetit,
      assetacc,
      inv,
      invdate,
      type,
      status,
      serial,
      serialno,
      model,
      manufactor,
      supplier,
      category,
      edition,
      version,
      instal,
      qty,
      sdate,
      edate,
      description,
      insertby,
    );
    if (result !== null) {
      res
        .status(200)
        .json({ status: 200, message: "Asset inserted successfully." });
    } else {
      res
        .status(401)
        .json({ status: 401, message: "Unable to insert asset item." });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const control_updateasset = async (req, res) => {
  try {
    const {
      name,
      assetit,
      assetacc,
      inv,
      invdate,
      type,
      status,
      serial,
      serialno,
      model,
      manufactor,
      supplier,
      category,
      edition,
      version,
      instal,
      qty,
      sdate,
      edate,
      description,
      insertby,
    } = req.body;
    const result = await eventsData.updateAsset(
      name,
      assetit,
      assetacc,
      inv,
      invdate,
      type,
      status,
      serial,
      serialno,
      model,
      manufactor,
      supplier,
      category,
      edition,
      version,
      instal,
      qty,
      sdate,
      edate,
      description,
      insertby,
    );
    if (result !== null) {
      res
        .status(200)
        .json({ status: 200, message: "Asset updated successfully." });
    } else {
      res
        .status(401)
        .json({ status: 401, message: "Unable to update asset item." });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const control_assetuserhw = async (req, res) => {
  try {
    const Username = req.params.username;
    const eventlist = await eventsData.getAssetUserHW(Username);
    res.status(200).json(eventlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const control_assetusersw = async (req, res) => {
  try {
    const Username = req.params.username;
    const eventlist = await eventsData.getAssetUserSW(Username);
    res.status(200).json(eventlist);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const control_updateassigned = async (req, res) => {
  try {
    const { itemid } = req.body;
    const result = await eventsData.updateAssigned(itemid);
    if (result !== null) {
      res
        .status(200)
        .json({ status: 200, message: "Asset updated successfully." });
    } else {
      res
        .status(401)
        .json({ status: 401, message: "Unable to update asset item." });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  control_listasset,
  control_insertasset,
  control_assetbyid,
  control_updateasset,
  control_assetuserhw,
  control_assetusersw,
  control_component,
  control_listassetassign,
  control_updateassigned,
  control_componentbyid,
  control_assettimelinebyid
};
