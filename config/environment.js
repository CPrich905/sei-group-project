const port = process.env.PORT || 4000
const dbURI = process.env.MONGODB_URI || 'mongodb:/localhost:27017/strangerthings'
const secret = process.env.SECRET || 'secreto'

//FOR TESTING
// const port = process.env.PORT || 4000
// const dbURI = process.env.MONGODB_URI || `mongodb://localhost/project3-${process.env.NODE_ENV || ''}`
// const secret = process.env.SECRET || 'secreto'

module.exports = {
  port: port,
  dbURI: dbURI,
  secret: secret
}
