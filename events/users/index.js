const sql = require('mssql')
const config = require("../../config");
const utils = require('../utils');

const getAlluser = async()=>{
    try{
        let pool = await sql.connect(config.sql);
        const sqlQuery = await utils.loadSqlQueries("events/users");
        const rs = await pool.request().query(sqlQuery.selectUser);
        if(rs){return rs.recordset;}
        else{return null;}
    }catch(error){
        console.log(error);
    }
}
const getByUser = async(id)=>{
    try{
        let pool = await sql.connect(config.sql);
        const rs = await pool.request()
                    .input('username',sql.VarChar(15),id)
                    .query("select username ,firstname+' '+lastname fullname,auth,department dep from muser where username=@username");
        if(rs){return rs.recordset;}
        else{return null;}
    }catch(error){
        console.log(error);
    }
}
const getUserLogin = async(username,password)=>{
    try{
        let pool = await sql.connect(config.sql);
        const rs = await pool.request()
                    .input('username',sql.VarChar(15),username)
                    .input('password',sql.VarChar(15),password)
                    .query("select username from muser where username=@username and password=@password and active=1");
        if(rs){return rs.recordset;}
        else{return null;}
    }catch(error){
        console.log(error);
    }
}

module.exports ={
    getAlluser,getByUser,getUserLogin
}