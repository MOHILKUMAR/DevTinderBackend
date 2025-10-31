-Create a repository
-Initialize the repository
-node_modules, package.json, package-lock.json
-Install express
Create a server
-Listen to port 7777
-Write request handler for the /test, /hello
-Install nodemon and update scripts inside package.json
-what is the use of "-g" while npm install
-Difference between caret and tilde (^ vs ~)


-initialize git
-.gitignore
-Create a remote repo on github
-Push all code to remote origin
-Play with routes and extension (Order of the route is matter)
-install Postman
-create workspace and test the API and save it.
-write logic to  handle get , POST, PUT , DELETE.
- Reading the query params in the routes
-Reading the Dynamic routes

-Create a free cluster on mongoDb offical website (Mongo atlas);
-install mongoose library 
-Connect your application to the Database "Connection -Url"/devTinder;
-Call the connectDb function and connect to database before starting application on 7777
-Create a userschema & userModel;
-Create Post /signup Api to add data to database
Push some documents using Api calls from postman 
-Error handling with try and catch;

- Js oject vs json 
- Add the express.json middleware to your app
- Make your signup Api dynamic to recieve data from the end user
-APi - get user by email
-Api - Feed Api = Get/feed - get all the users from the database
-create the Api  get the data by the Id (Use findById);
-How to delete the data; (Fi)
-How to update the data;
-Create the API for update the user with the emailId.


-Explore Schema type options from the documention
-Add required, unique, lowerCase, min, minLength, Trim
-Add default
- Create a custom validate functions for gender
-Improve the Db Schema - PUT all appropite validations on each field in Schema;
- Add Timestamps to the userSchema
-Add API level  validation on patch request @ signup post API.
- DATA sanitizing : Add API validation for each field.

-Install validator 
-explore the validator library functions and use for password , email;
-Never TRUST req.body

-Validate in signUp API
-Install bcrypt package
-create PasswordHash using bcrypt.hash & save the user is excrupted password
-create login API 
-Valid the data and compare password
-show the error message is invaild creadentials


-install cookies-parse
-just send a dummy cookies to user 
-create GET /profile API and Check if you get the cookies back
-install jwt - jsonwebtoken
-In Login api, after email and password validation , create a jwt token and send it to user in coolies
-read the cookies inside your profile API and find the login user 
-userAuth Middleware 
-Add the userAuth middleware in profile api and a new connectionRequest API.
-set the expiry of the jwt token and cookies to 7 days.
-create scheme method to getJWT()
-create USERscheme method to compare password(PasswordInputBYUser = Name);
