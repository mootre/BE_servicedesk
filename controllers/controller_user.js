const { token_manager } = require("../events/token_manager");
const eventsData = require("../events/users");
const jwt = require('jsonwebtoken');

const control_getAllUser = async (req, res) => {
    try {
        const eventlist = await eventsData.getAlluser();
        res.status(200).json(eventlist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const control_getByUser = async(req,res,next)=>{
    try {
        const eventId = req.params.id;
        const event = await eventsData.getByUser(eventId);
        if(event[0]==null){return res.status(401).send("not found!.")}
        else{
           res.status(200).send(event);
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
}

const control_login = async (req,res)=>{
    try{
        const {username,password} = req.body;
        const incorrect = await eventsData.getUserLogin(username,password);
        if(incorrect[0]==null){return res.status(401).json({'message':'error'})}
        else{
             //const token = jwt.sign({userid:eventId},process.env.TOKEN_KEY,{expiresIn: '1h'});
            //res.status(200).json({event,token:token})
            let token = token_manager.generateToken({id:username});
            res.status(200).json({id:username,fullname:incorrect[0].fullname,auth:incorrect[0].auth,token:token});
            //res.status(200).json(incorrect)
        }
    }catch(err){
        res.status(400).send(error.message);
    }
}

module.exports={
    control_getAllUser,control_getByUser,control_login
}