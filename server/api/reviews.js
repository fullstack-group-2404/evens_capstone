const express = require("express");
const router = express.Router();

const { fetchReviews, createReview, getBusinessReviews, fetchUsers} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    res.send(await fetchReviews());
  } catch (ex) {
    next(ex);
  }
});

router.post("/", async (req,res,next) =>{
  console.log("creating new review")
  try{
    const newReview = await createReview(req.body);
  console.log(newReview);
  res.send(newReview);
  }
  
  
  catch(err){next(err)}
})
  
router.get("/businesses/:businessId", async (req,res,next) =>{
  console.log("getting business reviews");
  const {businessId} = req.params;
  try{
    const reviews = await getBusinessReviews(businessId);
    const users = await fetchUsers();
    console.log(users);
    console.log(reviews);
    const reviewsWithUsername = 
       reviews.map(review=>{
        const reviewsResult = users.find(user=> user.id === review.userid)
        return {...review, username: reviewsResult.username}
      })

    res.send(reviewsWithUsername);

  }catch(err){next(err)};
  


})


module.exports = router;