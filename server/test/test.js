/*
    Defines all test cases
  */

var assert = require('assert');
var supertest = require("supertest");
var should = require("should");
var user = Math.random(111111,999999);
var auth="";
var x=this;
var profile="";
var id="";

var server = supertest.agent("http://localhost:4000");

describe("Unauthorized API called",function(){
  it("GET of '/users' should return unauthorize",function(done){

    server
    .get("/")
    .expect(401) 
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

});

describe("child routes called",function(){
  it("GET of '/undefined' should return 401 , because root api requires authorization",function(done){

    server
    .get("/")
    .expect(401) 
    .end(function(err,res){
      res.status.should.equal(401);
      done();
    });
  });

});
describe("Register User",function(){
  it("POST of '/register' should return 200 with success response",function(done){

    server
    .post('/users/register')
    .send({"username":"a"+user,"password":"a"+user,"firstName":"a"+user,"lastName":"a"+user})
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      assert(res.body,"success");
      done();
    });
  });

});

describe("Register already registered user",function(){
  it("POST of '/register' with same data (already registered user name) should return 400 with error",function(done){

    server
    .post('/users/register')
    .send({"username":"a"+user,"password":"a"+user,"firstName":"a"+user,"lastName":"a"+user})
    .expect(400) 
    .end(function(err,res){
      res.status.should.equal(400);
      assert(res.body,'Username "user" is already taken');
      done();
    });
  });

});

describe("Login with bad credentials",function(){
  it("POST of '/users/authenticate' with wrong data should return 400",function(done){

    server
    .post('/users/authenticate')
    .send({"username":"aqq"+user,"password":"aqq"+user,"firstName":"aqq"+user,"lastName":"aqq"+user})
    .expect(400) 
    .end(function(err,res){
      res.status.should.equal(400);
      assert(res.body,'Username or password is incorrect');
      done();
    });
  });

});


describe("Login with correct credentials",function(){
  it("POST of '/users/authenticate' with correct data should return 200",function(done){

    server
    .post('/users/authenticate')
    .send({"username":"a"+user,"password":"a"+user,"firstName":"a"+user,"lastName":"a"+user})
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      x.auth = res.body.token;
      x.id = res.body["_id"];
      done();
    });
  });

});


describe("Create profile",function(){
  it("POST of '/users/create_profile/' with correct data should return 200",function(done){

    server
    .post('/users/create_profile')
    .set("Authorization", "Bearer " + x.auth.toString())
    .send({"company":"ll","salary":"ll","year":"ll","designation":"ll","city":"ll","id":x.id})
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      x.profile = res.body["_id"];
      assert(res.body,'success');
      done();
    });
  });

});


describe("Edit profile",function(){
  it("PUT of '/users/profiles/' with correct data should return 200",function(done){

    server
    .put('/users/profiles')
    .set("Authorization", "Bearer " + x.auth.toString())
    .send({"company":"ll","salary":"ll","year":"ll","designation":"ll","city":"ll","id":x.id})
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      assert(res.body,'success');
      done();
    });
  });

});

describe("List all profile of user",function(){
  it("POST of '/users/profiles/' with correct data should return 200",function(done){

    server
    .get('/users/profiles/' +x.id)
    .set("Authorization", "Bearer " + x.auth.toString())
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      x.profile = res.body[0]["_id"];
      done();
    });
  });

});

describe("Delete profile",function(){
  it("DELETE of '/users/profiles/' with correct data should return 200",function(done){

    server
    .delete('/users/profiles/'+x.profile)
    .set("Authorization", "Bearer " + x.auth.toString())
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      assert(res.body,'success');
      done();
    });
  });

});

describe("Delete wrong profile",function(){
  it("DELETE of '/users/profiles/' with correct data should return 200",function(done){

    server
    .delete('/users/profiles/dddddd')
    .set("Authorization", "Bearer " + x.auth.toString())
    .send({"company":"ll","salary":"ll","year":"ll","designation":"ll","city":"ll","id":"dddddd"})
    .expect(200) 
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

});
