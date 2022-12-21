require("dotenv").config()
require("./src/db/mongo")
const express = require("express")
const app = express()
const axios = require('axios');
const cors = require("cors")

app.use(cors())

// https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id=2' -- quotes is used with a parameter to get a specific crypto else replace with listings and v1(to get info about only the latest cryptos)

// to get all the crypto use cryptocurrency/map
//https://coinmarketcap.com/api/documentation/v1 docs about this api
let response = null;
async function cmcApi () {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=20', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.cmc_key
      },
    });
  } catch(err) {
    response = null;
    // error
    return err.message
  }
  if (response) {
    // success
    const data = response.data;
    return data
  
  }
};
app.get("/api/crypto", async (req,res)=>{
  const data = await cmcApi()
  res.status(200).json({
    data:data
  })
  try{

  }catch(err){
    res.status(500).json({
      status:false,
      err:err
    })
  }
})


const port = process.env.PORT || 3000
app.listen(port, (err)=>{
  if(err){console.log(err)}
  console.log(`server started at port : ${port}`)
})