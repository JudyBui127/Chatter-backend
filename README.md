# CHATTER BACKEND API
Documentation: https://hackmd.io/@nwoLh2teRuWC1WEZ9Hoeqw/SJ35v03Nd
Github Repo: https://github.com/JudyBui127/Chatter-backend
## HOW TO RUN
### 1. Set up environment
- Add config.js file
- Run npm
``` 
npm install
```
### 2. Run server
```
nodemon server.js
```
### 3. Test APIs on Postman
- Import this json file to Postman: CHATTER.postman_collection.json
- Test API requests and responses as following 
### 4. Run unit test
- user-test.js
``` 
npm test -- test/user-test.js
```
- tweet-test.js
```
npm test -- test/user-test.js
```
- Auto run all unit tests
```
npm test
```
## APIs
### I. JWT Token Authentication
- middleware.js
- Check for token in request header 'Authorization' to verify valid login sesson of user before create, update, delete tweets.

### II. USER
####    [POST] /api/user/login
-Response:
``` 
{
    "status": 200,
    "message": "Successfully logged in!",
    "data": {
        "dataUser": {
            "id": string,
            "username": string
        },
        "token": string
    }
} 
```
###[POST] /api/user/register
```
{
    "status": 201,
    "message": "Register successful!",
    "data": {
        "user": {
            "id": string,
            "username": string
        }
    }
}
```

### III. TWEET
### 1. Create New Tweet
#### [POST] /api/tweet/create
- Request header: 'Authorization':'[token]'
- Request body:
    ```
    {
    "content":string,
    "userId":string 
    }
    ```
- Successful response:
    ```
    {
    "status": 200, 
    "message": "Success!",
    "newTweet": {
        "_id": string,
        "content": string,
        "created": Date.now(),
        "updated": Date.now(),
        "postedBy": userId,
        "__v": 0
    }
    ```
### 2. Read All Tweets
#### [GET] /api/tweet/readAll
- Request body:
    ```
   {
    "userId":string
    }
    ```
- Successful response:
    ```
   [ {
        "_id": string,
        "content": string,
        "created": Date.now(),
        "updated": Date.now(),
        "postedBy": userId,
        "__v": 0
    },
    {
        "_id": string,
        "content": string,
        "created": Date.now(),
        "updated": Date.now(),
        "postedBy": userId,
        "__v": 0
    },
    ...
    ]
    ```
### 3. Read 1 Tweet
#### [POST] /api/tweet/read/:tweet-id
- Successful response:
    ```
    {
        "_id": 'params.tweet-id',
        "content": string,
        "created": Date.now(),
        "updated": Date.now(),
        "postedBy": userId,
        "__v": 0
    }
### 4. Update Tweet
#### [PUT] /api/tweet/update/:tweet-id
- Request header: 'Authorization':'[token]'
- Request body:
    ```
    {
    "content":string,
    }
    ```
- Successful response:
    ```
    {
    "status": 200, 
    "message": "Success!",
    "newUpdatedTweet": {
        "_id": string,
        "content": string,
        "created": Date.now(),
        "updated": Date.now(),
        "postedBy": userId,
        "__v": 0
    }
    ```
### 5. Delete Tweet
#### [DELETE] /api/tweet/delete/:tweet-id
- Request header: 'Authorization':'[token]'
- Successful response:
    ```
    {
    "status": 200,
    "message": "Deleted tweet!"
    }
    ```

## UNIT TESTS
### 1. user-test.js
```
decribe('/POST Login', function(){});
decribe('/POST Register', function(){});
```

### 2. tweet-test.js

```
describe('/POST Create Tweet', function(){});
describe('/GET Read all tweets of a user', function(){});
describe('/GET Read a tweet', function() {});
describe('/PUT Update Tweet', function() {});
describe('/DELETE delete Tweet', function() {});;

