const { client } = require("./client");
const uuid = require("uuid");

const createBusiness = async ({
    busName,
    category,
    description,
    busImage,
  }) => {
    try {
      const SQL = `INSERT INTO businesses(busName, category, description, busImage) VALUES($1, $2, $3, $4) RETURNING *`;
      const {
        rows: [business],
      } = await client.query(SQL, [
        busName,
        category,
        description,
        busImage || "https://en.wikipedia.org/wiki/Retail#/media/File:AA446b_copy.jpeg",
      ]);
      return business;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBusinesses = async () => {
    const SQL = `
      SELECT * FROM businesses;
    `;
    const response = await client.query(SQL);
    return response.rows;
  };

  const fetchSingleBusinesses = async (id) => {
    try{
    const SQL = `SELECT * FROM businesses WHERE id=$1`;
    const { rows: [business],
      
     } = await client.query(SQL, [id]);
    return business;}
    catch(err){console.log(err)}
  };

  module.exports = {createBusiness, fetchBusinesses, fetchSingleBusinesses}