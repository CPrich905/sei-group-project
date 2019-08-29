/* globals api, expect, describe, beforeEach, afterEach, it */
require('../spec_helper')
// imports user and event models
const Event = require('../../models/event')
const User = require('../../models/user')
// imports secret
const { secret } = require('../../config/environment')
// imports jwt for testing secureRoutes
const jwt = require('jsonwebtoken')
// creates an event to be used in testing
const eventData = {
  eventType: 'Dog Walking',
  eventName: '(Long) Sunday Afternoon Dog Walk',
  date: new Date('08/09/2019'),
  fixed: true ,
  location: 'Richmond',
  description: 'Join me and my beautiful Chow Chow Lola for a long dong wak in Richmond park, I love a good deep chat about anything or everything (or nothing much!) and I\'m an excellent listener. Lola is very social too but does have a bit of a problem with excitable/jumpy small dogs.',
  startTime: '1200',
  endTime: '1500',
  cost: 0,
  whatToBring: 'The usual dog walking things! Maybe some money for a drink in a dog friendly pub after if you\re up for it',
  maxSize: 5,
  minSize: 2,
  tags: ['dogs', 'walking', 'talking', 'listening'],
  skillLevel: '',
  user: '5d249b40dd7fa1eab1ff08ad'
}
// creates a variable for the token
let token

describe('Event tests', () => {
  // creates the event & a user for testing, uses test user token for secureRoute testing.
  beforeEach(done => {
    Event.collection.deleteMany()
    Event.create(eventData)
      .then(() => User.deleteMany({}))
      .then(() => User.create({
        username: 'test',
        password: 'test',
        email: 'test@mail',
        bio: 'Definitely a scientist, apparently a doctor (though no one is entirely sure what type of doctor), probably insane. Also maybe a clone of Hitler.',
        passwordConfirmation: 'test'
      }))
      .then(user => {
        token = jwt.sign({ sub: user._id }, secret, { expiresIn: '9h' } )
        done()
      })

      .catch(done)
  })

  afterEach(done => {
    Event.collection.deleteMany()
    done()
  })

  //test for event index
  describe('GET /api/events', () => {

    it('should return a 200 response', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .expect(200, done)
    })

    it('should respond with a JSON object', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.header['content-type'])
            .to.be.eq('application/json; charset=utf-8')
          done()
        })
    })

    it('should return an array of Events', done => {
      api
        .get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          done()
        })
    })

    it('should return an array of Event objects', done => {
      api.get('/api/events')
        .set('Accept', 'application/json')
        .end((err, res) => {
          expect(res.body)
            .and.be.an('array')
            .and.have.property(0)
            .and.have.all.keys([
              '__v',
              '_id',
              'eventName',
              'date',
              'eventType',
              'fixed',
              'location',
              'description',
              'startTime',
              'endTime',
              'cost',
              'whatToBring',
              'maxSize',
              'minSize',
              'partyImage',
              'tags',
              'skillLevel',
              'comments',
              'likes',
              'user',
              'createdAt',
              'updatedAt'
            ])
          done()
        })
    })
  })

  //test for creating an event
  describe('POST /api/events', () => {

    it('should return a 201 response', done =>{
      api
        .post('/api/events')
        .set({ 'Accept': 'application/json', 'Authorization': `Bearer ${token}` })
        .send(eventData)
        .expect(201, done)
    })

    it('should create an event', done => {
      api
        .post('/api/events')
        .set({ 'Accept': 'application/json', 'Authorization': `Bearer ${token}` })
        .send(eventData)
        .end((err, res) => {
          // console.log(res.body)
          const event = res.body
          expect(event)
            .to.be.an('object')

          // expect(event)
          //   .to.have.property('_id')
          //   .and.to.be.a('string')
          //
          // expect(event)
          //   .to.have.property('eventName')
          //   .and.to.be.a('string')
          //
          // expect(event)
          //   .to.have.property('eventName')
          //   .and.to.be.a('string')
          //
          // expect(event)
          //   .to.have.property('date')
          //   .and.to.be.a('date')
          done()
        })
    })

  })

})

//test POST request (create event)
//test GET specific event
//test index
