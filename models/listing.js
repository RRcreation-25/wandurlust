const mongoose = require("mongoose")
const Review = require("./review.js")
const schema = mongoose.Schema

const listingSchema = new schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
       
    },
    image:{
        type:String,
 
        set:(v)=>v===""? "https://images.unsplash.com/photo-1625505826533-5c80aca7d157?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGdvYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60":v,
    },
    reviews:[
        {
            type:schema.Types.ObjectId,
            ref:"Review"

        }
    ],
    price:Number,
    location:String,
    country:String
})

listingSchema.post("findOneAndDelete", async (listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }

})





const Listing = mongoose.model("Listing",listingSchema)

module.exports = Listing