const { token_manager } = require("../events/token_manager");
const eventsData = require("../events/category");

const control_prodtype = async (req,res)=>{
    try {
        const eventlist = await eventsData.getAllProductType();
        res.status(200).json(eventlist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const control_owner = async (req,res)=>{
    try {
        const eventlist = await eventsData.getAllOwner();
        res.status(200).json(eventlist);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports={
    control_prodtype,
    control_owner
}