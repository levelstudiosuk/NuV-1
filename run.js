var request = require('sync-request');
var other_request = require('request');




var response = request('POST', 'http://localhost:3000/login', {
 json: {
   user: {
     email: 'wil@example.com',
     password: 'password',
   }
 },
});
var answer = JSON.parse(response.getBody().toString('utf8'));

var auth_token = (response.headers.authorization);
console.log("SOMETHING: ", auth_token);

var options = {
 method: 'POST',
 url: 'http://localhost:3000/articles',
 headers: {
   'Content-Type': 'application/json',
   Authorization: auth_token
 },
 body: {
   article: {
     title: 'how to eat too many aubergines',
     description: 'eating way too many aubergines is a fundamental part of life for many people. It really gives you a change to see life from the view point of a whole load of aubergines'
   }
 },
 json: true
};

res = other_request(options);
console.log("done!");