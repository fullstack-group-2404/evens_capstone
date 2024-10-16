const { client } = require("./client");

const createReview = async ({busn, usern, stars, input, userid, busid})=>{
    try{
        const SQL = `INSERT INTO reviews(busn, usern, stars, input, userid, busid) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
        const {
            rows: [result],
          } = await client.query(SQL, [
            busn,
            usern,
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
      const SQL = `SELECT reviews.id, reviews.input, reviews.userid, reviews.stars, businesses.busname, businesses.description, businesses.busimage FROM reviews
       JOIN businesses ON reviews.busid = businesses.id WHERE businesses.id = $1`;

      const {rows} = await client.query(SQL, [businessesId]);
      if(!rows) return;
      console.log(rows);
      return rows;

  }
  catch(err)
  {throw err;}
};

getBusinessReviews(9);

module.exports = {createReview, fetchReviews, getBusinessReviews}