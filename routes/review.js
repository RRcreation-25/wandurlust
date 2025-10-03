const express = require("express")
const router = express.Router({mergeParams:true})
const wrapAsync = require("../wandurlust/utils/wrapAsync.js")
const ExpressError = require("../wandurlust/utils/expressError.js")
const {listingSchema,reviewSchema} = require("../schema.js")
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");




const validateReview = (req,res,next)=>{
let {error} =  reviewSchema.validate(req.body)


  if(error){
    
    let errMsg = error.details.map((el)=>el.message).join(",")
    throw new ExpressError(400,errMsg)
  }else{
    next()
  }
}

//review
//post route


router.post("/",validateReview,wrapAsync(async (req,res)=>{
let listing = await Listing.findById(req.params.id)

let newReview = new Review(req.body.review)

listing.reviews.push(newReview)
await newReview.save() 
await listing.save()


res.redirect(`/listings/${listing._id}`)

}))

//review delete route

router.delete("/:reviewid",async(req,res)=>{
 const {id,reviewid} = req.params
  
  let result1 = await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewid}})
let result = await Review.findByIdAndDelete(reviewid)

res.redirect(`/listings/${id}`)
})


module.exports = router