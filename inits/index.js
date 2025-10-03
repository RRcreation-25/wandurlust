const mongoose = require("mongoose")
const initdata = require("./data.js")
const listing =  require("../models/listing.js")

main().then(()=>{
    console.log("connected to db")
}).catch((err)=>{
    console.log(err)
})

async function main() {

   await mongoose.connect("mongodb+srv://wanderlust:ravi1234@cluster0.fipaaa0.mongodb.net/")
}


const initData = async ()=>{
  
    await listing.insertMany(initdata.data)
    
}

initData()


