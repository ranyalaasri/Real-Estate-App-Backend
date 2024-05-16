//initiating express
const express = require('express')
const ListingRoute = express.Router()



//importing controllers & Middlewares
const { addNewListing, deleteListing, getListings, getListingById, updateListing, saveListingUser } = require('../controllers/listing.Controllers')
const { ListingPicsUpload } = require('../middlewares/multer')
const { isAuthenticated } = require('../middlewares/authMiddlewares')

const { validateListing } = require('../middlewares/validate/validateListing')


const { IsOwner } = require('../middlewares/IsOwner.js')



//setting limit for upload
const ImagesInfo = require('../config/constants')
const verifyRoles = require('../middlewares/roles.js')
const ROLES_LIST = require('../config/Roles_Lists.js')
const { listingFilterOptions } = require('../helpers/query.js')

//defining routes
ListingRoute.get('/All', getListings)
ListingRoute.get('/filteredListings', listingFilterOptions)
ListingRoute.get('/:id', getListingById)
ListingRoute.post('/add', isAuthenticated, ListingPicsUpload.array('images', ImagesInfo.Max_file_to_Upload), validateListing, addNewListing)
ListingRoute.delete('/:id', isAuthenticated, verifyRoles(ROLES_LIST.User, ROLES_LIST.Admin), IsOwner, deleteListing)
ListingRoute.patch('/update/:id', isAuthenticated, verifyRoles(ROLES_LIST.Admin, ROLES_LIST.User), IsOwner, ListingPicsUpload.array('images', ImagesInfo.Max_file_to_Upload), updateListing)
ListingRoute.put('/:listingId', isAuthenticated, saveListingUser)




// exporting the route
module.exports = ListingRoute

