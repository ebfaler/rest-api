var express = require('express');
var router = express.Router();

const {asyncHandler} = require('../middleware/async-handler');


/* GET route */

//route will return all properties and values for the currently
// authenticated User along with a 200 HTTP status code.

app.get('/api/users', asyncHandler(async (req, res) => {
        res.json();
      })
      
      );


/* POST route */

//route that will create a new user, set the Location header to "/", 
//and return a 201 HTTP status code and no content.


app.post('/api/users', asyncHandler(async (req, res) => {
  res.json();
})

);


module.exports = router;