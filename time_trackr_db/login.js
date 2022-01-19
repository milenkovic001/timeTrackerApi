const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.json("ovo je da se ulogujes")
} )


//da proveri da li korisnik postoji

module.exports = router;