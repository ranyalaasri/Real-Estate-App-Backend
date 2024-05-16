const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ListingsSchema = new mongoose.Schema({

  Object_id : {
    type : String,
  },

  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  listingType: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  number_of_beds: {
    type: Number
  },
  number_of_bathrooms: {
    type: Number
  },
  price: {
    type: Number,
    required: true
  },
  dimensions: {
    type: Number
  },
  contact:{
    type: Number
  },
  features: {
    type: Array,
  },
  rating: {
    type: Number,
  },
  images: [],
  owner: {
    // type: String
    // type: Schema.Types.ObjectId,
    // ref: 'User',
    // required: true

    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true

  }
});

module.exports = mongoose.model('Listing', ListingsSchema)