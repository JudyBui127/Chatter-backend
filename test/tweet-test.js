const request = require('supertest');
const app = require('../server');
const expect = require('chai').expect;

describe('/POST Create Tweet', function() {
    it('Should success if valid token authorization and userId', function(done) {
        request(app)
           .post('/api/tweet/create')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MDVmNTA0ZTRlMjcxMzJiMzBiOWU0Y2IiLCJpYXQiOjE2MTY4NTkyMjEsImV4cCI6MTYxNjk0NTYyMX0._GK2fgqStz6qAnDujIZOO7K5kI0nnope69dsPk2V1d8')
           .send({
            content:'Hello World! This is the testing tweet of Judy!!!',
            userId:'605f504e4e27132b30b9e4cb'
        })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
              expect(response.body).to.have.property('status').eql(200);
              expect(response.body).to.have.property('message').eql('Success!');
              expect(response.body.newTweet).to.have.property('_id');
              expect(response.body.newTweet).to.have.property('content').eql('Hello World! This is the testing tweet of Judy!!!');
              expect(response.body.newTweet).to.have.property('postedBy').eql('605f504e4e27132b30b9e4cb');
           })
           .end(done);
    }); 
}); 

describe('/POST Create Tweet', function() {
    it('Should success if valid token authorization and userId', function(done) {
        request(app)
           .post('/api/tweet/create')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MDVmNTA0ZTRlMjcxMzJiMzBiOWU0Y2IiLCJpYXQiOjE2MTY4NTkyMjEsImV4cCI6MTYxNjk0NTYyMX0._GK2fgqStz6qAnDujIZOO7K5kI0nnope69dsPk2V1d8')
           .send({
            content:'Hello World! This is the 2nd testing tweet of Judy!!!',
            userId:'605f504e4e27132b30b9e4cb'
        })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
              expect(response.body).to.have.property('status').eql(200);
              expect(response.body).to.have.property('message').eql('Success!');
              expect(response.body.newTweet).to.have.property('_id');
              expect(response.body.newTweet).to.have.property('content').eql('Hello World! This is the 2nd testing tweet of Judy!!!');
              expect(response.body.newTweet).to.have.property('postedBy').eql('605f504e4e27132b30b9e4cb');
           })
           .end(done);
    }); 
}); 

describe('/GET Read all tweets of a user', function() {
    it('Should success userId exists with posted tweets', function(done) {
        request(app)
           .get('/api/tweet/readAll')
           .set('Accept', '*/*')
           .set('Content-Type', 'application/json')
           .send({
            userId:'605dfa59fc92905a8cdd29e1'
        })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.deep.equal([
                {
                    "_id": "605f479b3b863059d03ff3e0",
                    "content": "Hello World! This is the testing tweet!!!",
                    "created": "2021-03-27T14:56:27.013Z",
                    "updated": "2021-03-27T14:56:27.013Z",
                    "postedBy": "605dfa59fc92905a8cdd29e1",
                    "__v": 0
                },
                {
                    "_id": "605f47a03b863059d03ff3e1",
                    "content": "Hello World! This is the 2nd testing tweet!!!",
                    "created": "2021-03-27T14:56:32.162Z",
                    "updated": "2021-03-27T14:56:32.162Z",
                    "postedBy": "605dfa59fc92905a8cdd29e1",
                    "__v": 0
                }
            ]);
           })
           .end(done);
    }); 
}); 


describe('/GET Read a tweet', function() {
    it('Should success userId exists with posted tweets', function(done) {
        request(app)
           .get('/api/tweet/read/605f479b3b863059d03ff3e0')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
            //    console.log(response);
            expect(response.body).not.to.be.empty;
            // expect(response.body).to.be.an('array');
            expect(response.body).to.have.property('_id').eql('605f479b3b863059d03ff3e0');
            expect(response.body).to.have.property('content').eql('Hello World! This is the testing tweet!!!');
            expect(response.body).to.have.property('postedBy');
         })
           .end(done);
    }); 
}); 


describe('/PUT Update Tweet', function() {
    it('Should success if valid token authorization and tweetId', function(done) {
        request(app)
           .put('/api/tweet/update/605f5447cf55021060c8fc21')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MDVmNTE3ZDY1MmI2YzRlNjQwODFjZjEiLCJpYXQiOjE2MTY4NTk1MjcsImV4cCI6MTYxNjk0NTkyN30.5nn7ElHN5R0q-ix1LyY3H1tk3XTbfWl9bA5g46jnEt4')
           .send({
            content:'Hello Wolrd! This is the successfully updated tweet!!!'
        })
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
              expect(response.body).to.have.property('status').eql(200);
              expect(response.body).to.have.property('message').eql('Success!');
              expect(response.body.newUpdatedTweet).to.have.property('_id').eql('605f5209652b6c4e64081cf3');
              expect(response.body.newUpdatedTweet).to.have.property('content').eql('Hello Wolrd! This is the successfully updated tweet!!!');
              expect(response.body.newUpdatedTweet).to.have.property('postedBy');
           })
           .end(done);
    }); 
}); 


describe('/DELETE delete Tweet', function() {
    it('Should success if valid token authorization and tweetId', function(done) {
        request(app)
           .delete('/api/tweet/delete/605f542ecf55021060c8fc20')
           .set('Accept', 'application/json')
           .set('Content-Type', 'application/json')
           .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MDVmNTE3ZDY1MmI2YzRlNjQwODFjZjEiLCJpYXQiOjE2MTY4NTk1MjcsImV4cCI6MTYxNjk0NTkyN30.5nn7ElHN5R0q-ix1LyY3H1tk3XTbfWl9bA5g46jnEt4')
           .expect(200)
           .expect('Content-Type', /json/)
           .expect(function(response) {
              expect(response.body).not.to.be.empty;
              expect(response.body).to.be.an('object');
              expect(response.body).to.have.property('status').eql(200);
              expect(response.body).to.have.property('message').eql('Deleted tweet!');
           })
           .end(done);
    }); 
}); 