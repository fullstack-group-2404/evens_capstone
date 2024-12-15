const express = require("express");
const router = express.Router();

const { fetchUsers, getSingleUser } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchUsers());
  } catch (ex) {
    next(ex);
  }
});

router.get("/:id", async (req, res, next) => {
  try{
    const id = req.params.id;
    console.log(id);
    
    const result = await getSingleUser(id);
    if(!result){
      next({name:"Not Found", message: "No matching user"});
      return
    }
    res.send(result);
  }catch(err){next(err);}

})

module.exports = router;
