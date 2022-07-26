var express = require('express');
var router = express.Router();


const { User } = require('../models/');

//importing middleware
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/authenticate-user');

/* GET route */

//route will return all properties and values for the currently
// authenticated User along with a 200 HTTP status code.

router.get('/', authenticateUser,asyncHandler(async (req, res) => {

 //the current authenticated user's information is retrieved from the Request object's 
 //currentUser property:
const user = req.currentUser;

  res.status(200).json({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    emailAddress: user.emailAddress
  });

})
);


/* POST route */

//route that will create a new user, set the Location header to "/", 
//and return a 201 HTTP status code and no content.

router.post('/', asyncHandler(async (req, res) => {
  try {
    const user = await User.create(req.body);
   // setting location header
    // res.location('/api/users/' + user.id);
    res.location('/');
    res.status(201).end();
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