const {addReviewDB , GetReviewByIdDB ,getAllReviewsDB, UpdateReviewDB , deleteReviewDB, ReviewsForUser} = require('../models/methods/reviews.Methods')
const mongoose = require('mongoose')
const  generateCustomUUID  = require ('../Utils/customUuidGenerator.js')


//Create Review
exports.CreateReview = async (req, res) => {
  try {
    const { rating, comment, property_id } = req.body
    const owner = req.user.id
    if (!owner) {
      return res.status(404).send('No user identified')
    }
    const Object_id = generateCustomUUID()
    const Review = await addReviewDB({ rating, comment, owner, property_id, Object_id })
    if (!Review) {
      return res.status(404).send('Failed to create review. Please try again later.')
    }
    return res.status(200).json({ message: 'Review created successfully', review: Review })
  } catch (error) {
    return res.status(404).json({ error: "Error creating review. Please try again later.", Error : error.message })
  }
}




//Get review By Id
exports.GetReviewById = async (req, res) => {
  try {
    const { id } = req.params
    if (!id)  {
      return res.status(404).json({message : 'No review ID was provided.'})
    }
    const review = await GetReviewByIdDB(id)
    if (!review) {
      return res.status(404).json({message : 'No review was found fro the provided ID'})
    }
    return res.status(200).json({message :'Review retrieved successfully', Review : review })
  } catch (error) {
    return res.status(404).json({message : 'Unable to retrieve review. Please try again later.', error : error.messaeg})
  }
}

//update review
exports.updateReview = async (req, res) =>{
  try{
    const { rating , comment , property_id } = req.body
    const { id } = req.params
    const user_id = req.user.id
    const review= await UpdateReviewDB(id , {rating , comment, user_id, property_id})
    if(!review)
    {
      return res.status(404).json(`message: cannot find any review with ID ${id}`);
    }
    const update =await GetReviewByIdDB(id)
    res.status(200).json(update)
  } catch(error){
    res.status(500).json({message:'Failed to Update Review', Error :error.message}) 
  }
}


// delete review by ID 

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id
    if (!reviewId) {
      return res.status(400).send('Review ID is required')
    }
    const deletedReview = await deleteReviewDB(reviewId)
    if (!deletedReview){
      res.status(400).json({message : 'unable to Delete'})
    }
      if(deletedReview.deletedCount == 0) {
      return res.status(404).send('Review not found')
    }
    return res.status(200).json({ message: 'Review deleted successfully' })
  } catch (error) {
    return res.status(500).json({ error: 'Error deleting review. Please try again later.', details: error.message })
  }
}


//get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await getAllReviewsDB()
    return res.status(200).json(reviews)
  } catch (error) {
    return res.status(404).json({message : 'Couldnt Get Review', Error : error.message})
  }
}


//get the user's Review at the top of reviews
exports.getReviewUserAddTop =async(req,res)=>{
  try {
    const userID=req.user.id;
    const reviewUser= await ReviewsForUser(userID);
    res.send(reviewUser);

  } catch (error) {
    res.status(500).send(error);
  }
}