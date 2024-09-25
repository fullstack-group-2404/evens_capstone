const { client } = require("./client");

const { createUser, fetchUsers } = require("./index.js");

const dropTables = async () => {
  try{
      await client.query(`DROP TABLE IF EXISTS users CASCADE`);
      await client.query(`DROP TABLE IF EXISTS businesses CASCADE`);
      await client.query(`DROP TABLE IF EXISTS reviews`);

  } catch(err){
      console.log(err);

  }};

const createTables = async () => {
  try{
  await client.query (`
      CREATE TABLE users(
      id UUID PRIMARY KEY,
      username VARCHAR(20) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL
    )`);

  // await client.query (`
  //   CREATE TABLE businesses(
  //   id SERIAL PRIMARY KEY,
  //   busname VARCHAR(64) UNIQUE NOT NULL,
  //   description VARCHAR(1023) NOT NULL,
  //   busimage VARCHAR(255) DEFAULT 
  //     'https://en.wikipedia.org/wiki/Retail#/media/File:AA446b_copy.jpeg'
  // )`);

  // await client.query (`
  //   CREATE TABLE reviews(
  //   id SERIAL PRIMARY KEY,
  //   busid INTEGER REFERENCES businesses(id)
  //   userid INTEGER REFERENCES user(id)
  //   star TINYINT(5);
  //   text VARCHAR(1023)
  // )`);


}

catch (err){console.log(err)};
};

const init = async () => {
  await client.connect();
  console.log("connected to database");
  await dropTables();
  console.log("DROPPING TABLES");

  await createTables();
  console.log("tables created");

  const [moe, lucy, ethyl, curly] = await Promise.all([
    createUser({ username: "moe", password: "m_pw" }),
    createUser({ username: "lucy", password: "l_pw" }),
    createUser({ username: "ethyl", password: "e_pw" }),
    createUser({ username: "curly", password: "c_pw" }),
    createUser({ username: "jon", password: "j_pw" })
  ]);

  console.log(await fetchUsers());
  client.end();
};

init();
