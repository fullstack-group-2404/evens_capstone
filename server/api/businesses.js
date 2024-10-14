const express = require("express");
const router = express.Router();

const { fetchBusinesses, createBusiness, fetchSingleBusinesses } = require("../db");

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

router.get("/:id", async (req, res) => {
  try{
    const id = Number(req.params.id);
    console.log(id);
    if(isNaN(id) || req.params.id ===" "){
      next({
        name: "invalid format",
        message: "Provided paramater is not a valid id"
      });
      return
    }
    const result = await fetchSingleBusinesses(id);
    if(!result){
      next({name:"Not Found", message: "No matching business"});
      return
    }
    res.send(result);
  }catch(err){next(err);}

})



module.exports = router;
