const Event = require('../models/event')

function indexRoute(req, res) {

  Event
    .find(req.query)
    .then(events => res.status(200).json(events))
    .catch(err => console.log(err))
}

function showRoute(req, res) {
  console.log('showing')
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event) throw new Error('Not Found')
      return res.status(200).json(event)
    })
    .catch(err => console.log(err))
}







module.exports = {
  index: indexRoute,
  show: showRoute

}
