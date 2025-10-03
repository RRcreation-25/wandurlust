const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const methodOverride = require("method-override");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/expressError.js")
const {listingSchema,reviewSchema} = require("./schema.js")

const Review = require("./models/review.js");

const listing = require("./routes/listing.js")
const review = require("./routes/review.js")
const MONGO_URL = "mongodb+srv://wanderlust:ravi1234@cluster0.fipaaa0.mongodb.net/";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));



app.get("/", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index2.ejs", { allListings });
}));


app.use("/listings",listing)
app.use("/listings/:id/review",review)



app.use((req,res,next)=>{
   next(new ExpressError(404,"page not found!"))
})


app.use((err, req, res, next) => {
  let {statusCode = 500,message = "something went wrong"} = err
  res.status(statusCode).render("error.ejs",{message})
  // res.status(statusCode).send(message)
})

app.listen(8080, () => {
  console.log("server is listening to port 8080");
});