var express = require('express');
var router = express.Router();

const { asyncHandler } = require('../middleware/async-handler');

const { Course } = require('../models/');


/* GET route */

// will return all courses including the User associated with each 
//course and a 200 HTTP status code.

router.get('/', asyncHandler(async (req, res) => {
    let courses = await Course.findAll();
    res.status(200).json(courses);

})

);

/* GET route */

//will return the corresponding course including the User associated with that course and 
//a 200 HTTP status code.

router.get('/:id', asyncHandler(async (req, res) => {

    // - If the book exists, render the update-book template,
    // - Else:
    //   * Create a new 404 error
    //   * Forward the error to the global error handler
    const courses = await Course.findByPk(req.params.id);
    if (courses) {
        console.log("displaying courses");
        res.status(200).json(courses);
    } else {
        const err = new Error();
        err.status = 404;
        // err.message = `Looks like the page you requested doesn't exist.`
        next(err);

    }

})

);

/* POST route */

//will create a new course, set the Location header to the URI for the newly created course
// and return a 201 HTTP status code and no content.

router.post('/', asyncHandler(async (req, res) => {

    try {
        await Course.create(req.body);
        res.status(201).json({ "message": "Course successfully created!" });
    } catch (error) {
        console.log('ERROR: ', error.name);

        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
})

);

/* PUT route */
//will update the corresponding course and return a 204 HTTP status code and no content.


router.put('/:id', asyncHandler(async (req, res) => {
    try {
        const courses = await Course.findByPk(req.params.id);
        if (courses) {

            await courses.update(req.body);
            res.status(204).end();
        } else {
            res.status(404).end();
        }
    } catch (error) {
        // console.log('ERROR: ', error.name);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
})
);


/* DELETE route */
//will delete the corresponding course and return a 204 HTTP status code and no content.


router.delete('/:id', asyncHandler(async (req, res) => {

})

);



module.exports = router; 