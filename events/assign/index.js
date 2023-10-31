const sql = require("mssql");
const config = require("../../config");

const assignAsset = async (
    username,
    itemid,
    assignby
  ) => {
    try {
      let pool = await sql.connect(config.sql);
      const query = `exec svdAssignAsset @username, @itemid, @assignby`;
      const request = pool
        .request()
        .input("username", sql.VarChar(50), username)
        .input("itemid", sql.Int, itemid)
        .input("assignby", sql.VarChar(50), assignby)
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

  const assignComponent = async (
    username,
    itemid,
    component,
    assignby
  ) => {
    try {
      let pool = await sql.connect(config.sql);
      const query = `exec svdAssignComponent @username, @itemid, @component, @assignby`;
      const request = pool
        .request()
        .input("username", sql.VarChar(50), username)
        .input("itemid", sql.Int, itemid)
        .input("component", sql.Int, component)
        .input("assignby", sql.VarChar(50), assignby)
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

  const deleteassignAsset = async (
    username,
    itemid,
    assignby
  ) => {
    try {
      let pool = await sql.connect(config.sql);
      const query = `exec svdDeleteAssignAsset @username, @itemid, @assignby`;
      const request = pool
        .request()
        .input("username", sql.VarChar(50), username)
        .input("itemid", sql.Int, itemid)
        .input("assignby", sql.VarChar(50), assignby)
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
  const deletecomponent = async (
    username,
    parent,
    child
  ) => {
    try {
      let pool = await sql.connect(config.sql);
      const query = `exec svdDeleteComponent @username, @parent, @child`;
      const request = pool
        .request()
        .input("username", sql.VarChar(50), username)
        .input("parent", sql.Int, parent)
        .input("child", sql.Int, child)
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

module.exports={
    assignAsset,
    deleteassignAsset,
    assignComponent,
    deletecomponent
}