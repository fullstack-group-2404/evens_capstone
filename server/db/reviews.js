const { client } = require("./client");

const createReview = async ({stars, input, userid, busid})=>{
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
      const SQL = `SELECT reviews.id, businesses.busname, businessess.description, businesses.busimage,
      reservations JOIN books ON reviews.busid = businesses.id AND userid = $1`;

      const {rows} = await client.query(SQL, []);
      if(!rows) return;
      console.log(rows);
      return rows;

  }
  catch(err)
  {throw err;}
};


module.exports = {createReview, fetchReviews, getBusinessReviews}