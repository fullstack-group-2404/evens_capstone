const { client } = require("./client");

const createReview = async ({ stars, input, userid, busid})=>{
    try{
        const SQL = `INSERT INTO reviews(stars, input, userid, busid) VALUES($1, $2, $3, $4) RETURNING *`;
        const {
            rows: [result],
          } = await client.query(SQL, [
            stars,
            input,
            userid,
            busid
          ]);
          return result;
    }catch(err){
        throw err;
    }
};

const fetchReviews = async () => {
  const SQL = `
    SELECT * FROM reviews;
  `;
  const response = await client.query(SQL);
  return response.rows;
};

const getBusinessReviews = async (businessesId) => {
  try {
      const SQL = `SELECT reviews.id, reviews.input, reviews.userid, reviews.busid, reviews.stars, businesses.busname, businesses.description, businesses.busimage FROM reviews
       JOIN businesses ON reviews.busid = businesses.id WHERE businesses.id = $1`;

      const {rows} = await client.query(SQL, [businessesId]);
      if(!rows) return;
      
      return rows;

  }
  catch(err)
  {throw err;}
};

const getUserReviews = async (userId) => {
  try {
      const SQL = `SELECT reviews.id, reviews.input, reviews.stars, businesses.busname, businesses.category, businesses.description, businesses.busimage, users.username FROM businesses
       JOIN reviews ON reviews.busid = businesses.id JOIN users ON users.id = reviews.userid WHERE users.id = $1`;

      const {rows} = await client.query(SQL, [userId]);
      if(!rows) return;
      
      return rows;

  }
  catch(err)
  {throw err;}
};

const deleteReview = async(id)=>{
  try{
      const SQL = `DELETE FROM reviews WHERE id=$1 RETURNING *`;
      const {
          rows: [result],
        } = await client.query(SQL, [id]);
        return result;


  }catch(err){
      throw err;
  }
};





module.exports = {createReview, fetchReviews, getBusinessReviews, getUserReviews, deleteReview}