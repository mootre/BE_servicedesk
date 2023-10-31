const sql = require('mssql')
const config = require("../../config");
const utils = require('../utils');

const getAllProductType = async()=> {
    try{
        let pool = await sql.connect(config.sql);
        //const sqlQuery = await utils.loadSqlQueries("events/users");
        const rs = await pool.request().query("select pType product_type from mProductType");//sqlQuery.selectUser);
        if(rs){return rs.recordset;}
        else{return null;}
    }catch(error){
        console.log(error);
    }
}
const getAllOwner = async()=> {
    try{
        let pool = await sql.connect(config.sql);
        //const sqlQuery = await utils.loadSqlQueries("events/users");
        const rs = await pool.request().query("select Owner,Description from mOwner");//sqlQuery.selectUser);
        if(rs){return rs.recordset;}
        else{return null;}
    }catch(error){
        console.log(error);
    }
}


module.exports ={
    getAllProductType,getAllOwner
}