const {body, validationResult} = require('express-validator')

exports.validateListing = [

    // Validate title
    body('name')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('namee is required')
    .isLength({min:3})
    .withMessage('namee must be at least 3 characters long'),
  
    // Validate description
    body('description')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({min:5})
    .withMessage('Description must be at least 5 characters long'),
  
    // Validate category
    body('category')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Category is required')
    .isLength({min:3})
    .withMessage('category must be at least 3 characters long'),
  
    // Validate listingType
    body('listingType')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Listing type is required')
    .isLength({min:3})
    .withMessage('listingType must be at least 3 characters long'),
  
    // Validate location
    body('location')
    .trim()
    .isString()
    .notEmpty()
    .withMessage('Location is required'),
  
    // Validate price
    body('price')
    .isNumeric()
    .withMessage('Price must be a number')
    .notEmpty()
    .withMessage('Price is required'),
  
    // Validate dimensions (optional)
    body('dimensions')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('dimensions must be between 1 and 50 characters'),
  
    // Validate images (optional)
    
    body('images')
    .optional(),
  
    // Validate owner
  
    // body('owner')
    // .trim()
    // .isString()
    // .notEmpty()
    // .withMessage('Owner ID is required'),
  
    // Custom middleware to check for validation errors
  
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    }
  ];
  