# rest-api
 ## Unit 9 Project Treehouse Full Stack Techdegree

In this project, I have created a REST API using Express. The API provides a way to administer a school database containing information about users and courses. 
Users can interact with the database to create new courses, retrieve information on existing courses, and update or delete existing courses. To make changes to the database, users will be required to log in so the API will also allow users to create a new account or retrieve information on an existing account.


#### Areas where I exceeded expectations:

##### Ensured User Email Address is Valid and Unique
- Added validation to the emailAddress attribute in the User model to ensure that the provided email address is properly formatted.
- Added the unique constraint to the User model to ensure that the provided email address isn't already associated with an existing user.


##### Updated the User Routes
- Updated the /api/users GET route so that the following properties are filtered out of the response:
   * password
   * createdAt
   * updatedAt

- Updated the /api/users POST route to check for and handle SequelizeUniqueConstraintError errors.
- If a SequelizeUniqueConstraintError is thrown a 400 HTTP status code and an error message should be returned.


##### Updated the Course Routes
- Updated the /api/courses and /api/courses/:id GET routes so that the following properties are filtered out of the response:
   * createdAt
   * updatedAt

- Updated the /api/courses/:id PUT and /api/courses/:id DELETE routes to ensure that the currently authenticated user is the owner of the requested course.
- If the currently authenticated user is not the owner of the requested course a 403 HTTP status code should be returned.