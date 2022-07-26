var express = require('express');
var router = express.Router();


//importing middleware
const { asyncHandler } = require('../middleware/async-handler');
const { authenticateUser } = require('../middleware/authenticate-user');

const { Course } = require('../models/');
const { User } = require('../models/');


/* GET route */

// will return all courses including the User associated with each 
//course and a 200 HTTP status code.

router.get('/', asyncHandler(async (req, res) => {
    let courses = await Course.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: {
            model: User,
            attributes: ['firstName','lastName', 'emailAddress']
          }
    });
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
    const courses = await Course.findByPk(req.params.id, {
        attributes: { exclude: ['createdAt', 'updatedAt']},
        include: {
            model: User,
            attributes: ['firstName','lastName', 'emailAddress']
          }
    });

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

router.post('/', authenticateUser, asyncHandler(async (req, res) => {
    let course;
    try {
        course = await Course.create(req.body);
        // set location header 
        res.location('/courses/' + course.id);
        res.status(201).end();
    }


    catch (error) {
        console.log('ERROR: ', error.name);

        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors }).end();
        } else {
            throw error;
        }
    }
})

);

/* PUT route */
//will update the corresponding course and return a 204 HTTP status code and no content.


router.put('/:id', authenticateUser, asyncHandler(async (req, res) => {
    try {

        const user = req.currentUser;
        const courses = await Course.findByPk(req.params.id);

        if (courses) {
            if (user && user.id == courses.userId) {

                await courses.update(req.body);
                res.status(204).end();
            } else {
                res.status(403).json({ "message": "You do not have permission to update this course" }).end();
            }
        } else {
            res.status(404).json({ "message": "Course does not exist" }).end();
        }
    }
    catch (error) {
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors }).end();
        } else {
            throw error;
        }
    }
})
);



/* DELETE route */
//will delete the corresponding course and return a 204 HTTP status code and no content.


router.delete('/:id', authenticateUser, asyncHandler(async (req, res) => {

    const user = req.currentUser;
    const courses = await Course.findByPk(req.params.id);

    if (courses) {
        if (user && user.id == courses.userId) {

            await courses.destroy(req.body);
            res.status(204).end();
        } else {
            res.status(403).json({ "message": "You do not have permission to delete this course" }).end();
        }
    }
    else {
        res.status(404).json({ "message": "Course does not exist" }).end();
    }

}));


module.exports = router; 