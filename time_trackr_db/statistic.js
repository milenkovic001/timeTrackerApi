const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.json("ovo je Statistika mf stranica")
} )

//samo cita iz baze podataka dnevno, nedeljno, mesecno, od ove godine, godisnje...


module.exports = router;