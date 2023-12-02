const sql = require("mssql");
const config = require("../../config");

const getAllAsset = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const rs = await pool.request().query("select ItemID,ItemName,AssetIT,AssetACC,Serial,SerialNo,Description,AssetStatus,AssetType from mAsset ");
    if (rs) {
      return rs.recordset;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const getAllComponent = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const rs = await pool.request().query(`
      select ItemID,ItemName,AssetIT,AssetACC,Serial,SerialNo,Description,AssetStatus,AssetType 
      from mAsset 
      where not exists (select itemcomponent from tAssetComponent where itemcomponent=mAsset.ItemID and active<>0) and AssetType='Part' `);
    if (rs) {
      return rs.recordset;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const getAllAssetAssign = async () => {
  try {
    let pool = await sql.connect(config.sql);
    const rs = await pool.request().query(`
      select ItemID,ItemName,AssetIT,AssetACC,Serial,SerialNo,Description,AssetStatus,AssetType 
      from mAsset 
      where not exists (select itemid from tAssignAsset where itemid=mAsset.itemid and active<>0)  
      and not exists (select itemcomponent from tAssetComponent where ItemComponent=mAsset.ItemID and Active<>0) `);
    if (rs) {
      return rs.recordset;
    }
    return null;
  } catch (error) {
    console.log(error);
  }
};

const getAssetbyid = async (ItemID) => {
  try {
    /*if (!ItemName) {
      throw new Error('Invalid ItemName parameter.');
    }*/
    let pool = await sql.connect(config.sql);
    const rs = await pool
      .request()
      .input("ItemID", sql.Int, ItemID)
      .query("select ItemID,ItemName,AssetIT,AssetACC,Invno,Invdate,AssetType,AssetStatus,Serial,SerialNo,Model,Manufactor,Supplier,Category,Edition,Version,Installation,Qty,Description,Entrydate,Expirydate from mAsset where ItemID=@ItemID");
    if (rs.recordset.length===0) {
      return { success: false, message: 'No records found.' };
    }
    return { success: true, data: rs.recordset };
  } catch (error) {
    throw error;
  }
};
const getAssetTimelinebyid = async (ItemID) => {
  try {
    let pool = await sql.connect(config.sql);
    const rs = await pool
      .request()
      .input("ItemID", sql.Int, ItemID)
      .query("exec svdAssetTimeline @ItemID");
    if (rs.recordset.length===0) {
      return { success: false, message: 'No records found.' };
    }
    return {success: true,data:rs.recordset};
  } catch (error) {
    throw error;
  }
};
const getComponentbyid = async (ItemID) => {
  try {
    let pool = await sql.connect(config.sql);
    const rs = await pool
      .request()
      .input("ItemID", sql.Int, ItemID)
      .query(`
      select mAsset.ItemID,ItemName,AssetIT,AssetACC,AssetType,AssetStatus,Serial,SerialNo,Model,Manufactor,Supplier,Category,Edition,Version,Installation,Qty,Description,mAsset.Entrydate,Expirydate 
      from tAssetComponent 
      left join mAsset on mAsset.ItemID=tAssetComponent.ItemComponent 
      where tAssetComponent.ItemID=@ItemID and tAssetComponent.active=1`);
    if (rs.recordset.length===0) {
      return { success: false, message: 'No records found.' };
    }
    return { success: true, data: rs.recordset };
  } catch (error) {
    throw error;
  }
};

const getAssetUserHW = async (Username) => {
  try {
    let pool = await sql.connect(config.sql);
    const rs = await pool
      .request()
      .input("Username", sql.VarChar(50), Username)
      .query("select AssetItem,ItemID from AssetUser_HW(@Username) ");
    if (rs.recordset.length===0) {
      return { success: false, message: 'No records found.'};
    }
    return { success: true, data: rs.recordset };
  } catch (error) {
    throw error;
  }
};

const getAssetUserSW = async (Username) => {
  try {
    let pool = await sql.connect(config.sql);
    const rs = await pool
      .request()
      .input("Username", sql.VarChar(50), Username)
      .query("select AssetItem,ItemID from AssetUser_SW(@Username) ");
    if (rs.recordset.length===0) {
      return { success: false, message: 'No records found.'};
    }
    return { success: true, data: rs.recordset };
  } catch (error) {
    throw error;
  }
};

const insertAsset = async (
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
) => {
  try {
    let pool = await sql.connect(config.sql);
    const query = `exec svdAssetitemmaster 
        @ItemName, @AssetIT, @AssetACC, @Invno, @Invdate, @AssetType, @AssetStatus, @Serial, @SerialNo,
        @Model, @Manufactor, @Supplier, @Category, @Edition, @Version, @Installation, @Qty, @Description, @Entrydate, @Expirydate, @insertby
      `;
    const request = pool
      .request()
      .input("ItemName", sql.VarChar(150), name)
      .input("AssetIT", sql.VarChar(50), assetit)
      .input("AssetACC", sql.VarChar(50), assetacc)
      .input("Invno", sql.VarChar(50), inv)
      .input("Invdate", sql.Date, invdate)
      .input("AssetType", sql.VarChar(50), type)
      .input("AssetStatus", sql.VarChar(20), status)
      .input("Serial", sql.VarChar(100), serial)
      .input("SerialNo", sql.VarChar(100), serialno)
      .input("Model", sql.VarChar(100), model)
      .input("Manufactor", sql.VarChar(100), manufactor)
      .input("Supplier", sql.VarChar(100), supplier)
      .input("Category", sql.VarChar(100), category)
      .input("Edition", sql.VarChar(50), edition)
      .input("Version", sql.VarChar(50), version)
      .input("Installation", sql.VarChar(100), instal)
      .input("Qty", sql.Int, qty)
      .input("Description", sql.VarChar(100), description)
      .input("Entrydate", sql.Date, sdate)
      .input("Expirydate", sql.Date, edate)
      .input("insertby", sql.VarChar(20), insertby);
    const rs = await request.query(query);
    if (rs) {
      return rs.recordset;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAsset = async (
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
) => {
  try {
    let pool = await sql.connect(config.sql);
    const query = `exec svdUpdateAssetitemmaster 
        @ItemName, @AssetIT, @AssetACC, @Invno, @Invdate, @AssetType, @AssetStatus, @Serial, @SerialNo,
        @Model, @Manufactor, @Supplier, @Category, @Edition, @Version, @Installation, @Qty, @Description, @Entrydate, @Expirydate, @insertby
      `;
    const request = pool
      .request()
      .input("ItemName", sql.VarChar(150), name)
      .input("AssetIT", sql.VarChar(50), assetit)
      .input("AssetACC", sql.VarChar(50), assetacc)
      .input("Invno", sql.VarChar(50), inv)
      .input("Invdate", sql.Date, invdate)
      .input("AssetType", sql.VarChar(50), type)
      .input("AssetStatus", sql.VarChar(20), status)
      .input("Serial", sql.VarChar(100), serial)
      .input("SerialNo", sql.VarChar(100), serialno)
      .input("Model", sql.VarChar(100), model)
      .input("Manufactor", sql.VarChar(100), manufactor)
      .input("Supplier", sql.VarChar(100), supplier)
      .input("Category", sql.VarChar(100), category)
      .input("Edition", sql.VarChar(50), edition)
      .input("Version", sql.VarChar(50), version)
      .input("Installation", sql.VarChar(100), instal)
      .input("Qty", sql.Int, qty)
      .input("Description", sql.VarChar(100), description)
      .input("Entrydate", sql.Date, sdate)
      .input("Expirydate", sql.Date, edate)
      .input("insertby", sql.VarChar(20), insertby);
    const rs = await request.query(query);
    if (rs) {
      return rs.recordset;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateAssigned = async (itemid) => {
  try {
    let pool = await sql.connect(config.sql);
    const query = `update tAssignAsset set active=0 where itemid=@itemid `;
    const request = pool
      .request()
      .input("itemid", sql.Int, itemid);
    const rs = await request.query(query);
    if (rs) {
      return rs.recordset;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  getAllAsset,
  insertAsset,
  getAssetbyid,
  updateAsset,
  getAssetUserHW,
  getAssetUserSW,
  getAllComponent,
  getAllAssetAssign,
  updateAssigned,
  getComponentbyid,
  getAssetTimelinebyid
};
