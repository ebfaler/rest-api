var express = require('express');
var router = express.Router();


const { User } = require('../models/');
const { asyncHandler } = require('../middleware/async-handler');

/* GET route */

//route will return all properties and values for the currently
// authenticated User along with a 200 HTTP status code.

router.get('/', asyncHandler(async (req, res) => {

  let users = await User.findAll();
  res.status(200).json(users);

})
);


/* POST route */

//route that will create a new user, set the Location header to "/", 
//and return a 201 HTTP status code and no content.

router.post('/', asyncHandler(async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ "message": "User successfully created!" });
  } catch (error) {
    console.log('ERROR: ', error.name);

    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));



module.exports = router;