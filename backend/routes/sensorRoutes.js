const express = require("express");

const router = express.Router();

const {

    addSensor,
    getLatest,
    getHistory

}=require("../controllers/sensorController");


router.post("/",addSensor);

router.get("/latest",getLatest);

router.get("/history",getHistory);

module.exports=router;