const express = require("express");
const router = express.Router();

const { fetchReviews, createReview, getBusinessReviews, fetchUsers, getUserReviews, deleteReview} = require("../db");

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
    const reviewsWithUsername = 
       reviews.map(review=>{
        const reviewsResult = users.find(user=> user.id === review.userid)
        return {...review, username: reviewsResult.username}
      })

    res.send(reviewsWithUsername);

  }catch(err){next(err)};
  })

  router.get("/users/:id", async (req,res,next) =>{
    console.log("getting user reviews");
    const {id} = req.params;
    try{
      const reviews = await getUserReviews(id);
      
  
      res.send(reviews);
  
    }catch(err){next(err)};
    })

    router.delete('/:id', async(req, res, next)=>{
      try{
        const deletedReview = await deleteReview(req.params.id);
        res.send("review deleted")
      }catch (err) {
        next(err);
    }});


module.exports = router;