### POST-IT

> Post-It is a simple social media app called Postit (or Post-it). Post-it allows you to post anything (text, images, video, and/or audio) on a single post-it. A post-it is a single post on the post-it app, just like a tweet. Other users can reply to a post-it. Replying to a post-it is like adding a comment to a post (post-it).

## Requirements

1. Clone the repo
2. Have your mongodb database up and running
3. Have your server running

### Technologies used:

- For Developement:

  - Nodejs
  - ExpressJs
  - MongoDb

- For Api testing:
  - POSTMAN
  - Thunder Client
  - REST Client

## Model Specification

### User

The User component represents a type of user in our database. A User has the following properties:

- firstName: The firstName of the user
- lastName: The lastName of the user
- userName: The userName of the user
- email: A unique email of the user
- avatar: A random avatar automatically generated once a user registers
- phoneNumber: user phoneNumber
- password: user password, select is false
- gender: gender of the user
- birthDate: Date of birth of the user
- location: user location
- bio: bio of the user

## Post

The Post Component represents the structure of post in our database. A Post has the following properties:

- title: The title of the post
- body: The body of the post
- file: The file uploads in the post
- createdBy: The users that created post
- comment: The comments on the post

## Comment

The Comment component represents a structure of comments in our database. A Comment has the following properties:

- post: The post that was commented on
- body: The body of the comment
- file: file uploads by users in the comment section
- user: The user that commented

## Usage

- Clone the repo
- cd into the directory such that you are in `Post-It API`.
- Create a project on mongodb and copy your MONGODB_URI
- Create a .env file at the root of the folder and include the following

```
- PORT
- MONGODB_URI
- NODE_ENV
- EMAIL_TEST
- EMAIL_TEST_PSWO
- EMAIL_TEST_APP_PSWD
- JWT_SECRET
- CLOUD_NAME
- API_KEY
- API_SECRET
- BASE_URL

```

- To run the solution, make sure you have [nodejs](https://nodejs.org/) installed.

- Use the following command in your terminal to initialize the applicationa and to install the necessary dependencies.

```
npm init -y
npm install
npm run dev or npm start
```

# Testing

- For Api testing:
  - POSTMAN
  - Thunder Client
  - REST Client

**note**

- Make sure to specify the url, token and id correctly when making requests

### App Routes

> The App routes holds the 3 routes together for ease and simplicity.

const basePath = "/api/v1";

```
export default (app) => {
  app.use(`${basePath}/auth`, authRouter);
  app.use(`${basePath}/users`, userRouter);
  app.use(`${basePath}`, userOnlyRouter);
  app.use(`${basePath}/posts`, postRouter);
  app.use(`${basePath}/comments`, commentRouter);
};

```

### Auth

- POST "{baseUrl}/api/v1/register": Creates a new user(Requires Authentication, Validation)
- GET "{baseUrl}/api/v1/verify": Verifies Email
- POST "{baseUrl}/api/v1/resend": Resend Email Verification
- POST "{baseUrl}/api/v1/change-password": Password Change

### User Routes

- GET "/api/v1/:userId": Retrieves a user by its id(Requires Authentication)
- GET "/api/v1/": Retrieves all users.(Requires Authentication)
- GET "/api/v1/user": searches a user by firstName, lastName,date added
- PUT "/api/v1/:userId": Updates a user by its id. (Requires Authorization and Authentication).
- DELETE "/api/v1/:userId": Deletes a user by its id. (Requires Authorization and Authentication)

### Post Routes

- POST "/api/v1/": Creates a new post(Requires Authentication, Validation)
- GET "/api/v1/:postId": Retrieves a post by its id(Requires Authentication)
- GET "/api/v1/": Retrieves all post.(Requires Authentication)
- PUT "/api/v1/:postId": Updates a post by its id. (Requires Authorization and Authentication).
- DELETE "/api/v1/:postId": Deletes a post by its id. (Requires Authorization and Authentication)

### Comment Routes

- POST "/api/v1/": Creates a new commnets(Requires Authentication, Validation)
- GET "/api/v1/:commentId": Retrieves a comment by its id(Requires Authentication)
- GET "/api/v1/": Retrieves all comment.(Requires Authentication)
- PUT "/api/v1/:commentId": Updates a comment by its id. (Requires Authorization and Authentication).
- DELETE "/api/v1/:commentId": Deletes a comment by its id. (Requires Authorization and Authentication)

### Postman Documentation

> Test out your endpoints by making the necessary request to their responsive endpoints

### API URL

```
https://mini-api-lasp.onrender.com
```
