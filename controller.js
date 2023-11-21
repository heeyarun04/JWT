const pool = require("./auth");
const jwt = require("jsonwebtoken");

const secretKey = "yangtautauaja";

function verify(token) {
  let result = {};

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      result = {status: false };
    } else {
      result = {
        data: decoded,
        status:true
    }}
  });
  return result;
}

async function createData(req, res) {
  const { suhu, kelembapan, token } = req.body;
  const x = verify(token)
  if (x.status){
    console.log(x.data)
    try {
        const cek = await pool.query(`SELECT * FROM identitas WHERE id = ${x.data.id} AND nama = '${x.data.nama}'`)
        console.log(cek.rowCount)
        if(cek.rowCount === 1){
            const data= await pool.query (`INSERT INTO data ( suhu, kelembapan, id_user) VALUES ($1, $2, $3)`, [suhu, kelembapan, x.data.id])
            res.status(200).json(data)
        }
    } catch (error) {
        console.log(error)
    }
  }
}

async function readData(req, res) {
  const { id_user } = req.body;
  try {
    const data = await pool.query(
      `SELECT * from data AS a JOIN identitas AS b ON a.id_user = b.id WHERE a.id_user = ${id_user}`
    );
    console.log(data);
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
  }
}

async function generateToken (req,res){
const {id, nama} = req.body
const user = {
    id: id,
    nama: nama
}
try {
    const token = jwt.sign (user, secretKey, { noTimestamp: true })
    res.status(200).json(token)
} catch (err) {
    console.log(err)
}}

module.exports = { createData, readData, generateToken };
