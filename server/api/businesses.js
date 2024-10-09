const express = require("express");
const router = express.Router();

const { fetchBusinesses, createBusiness } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchBusinesses());
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req,res,next) =>{
  console.log("creating new business")
  try{
    const newBusiness = await createBusiness(req.body);
  console.log(newBusiness);
  res.send(newBusiness);
  }
  
  
  catch(err){next(err)}
});



module.exports = router;
