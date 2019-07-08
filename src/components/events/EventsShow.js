import React, { Fragment } from 'react'
import axios from 'axios'
import Map from './Map'
import EventCreator from './EventCreator'
import EventComments from './EventComments'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'



class eventShow extends React.Component {
  constructor() {
    super()

    this.state = { event: null, attendees: null, me: null }

    this.getData = this.getData.bind(this)
  }

  componentDidMount() {
    this.getData()
    this.getAttendees()
    this.getMe()


  }


  getMe() {
    console.log('attending')
    axios.get('/api/me', {
      headers: { 'Authorization': `${Auth.getToken()}` }
    })
      .then(res => {
        console.log(res)
        this.setState({ me: res.data })
      })
      .catch(err => console.log(err))


  }

  isAttending(){
    return this.state.attendees.map(attendee => attendee._id).includes(this.state.me)
  }

  getData() {
    axios.get(`/api/events/${this.props.match.params.id}`)
      .then(res => this.setState({ event: res.data }))
      .catch(err => console.log(err))

  }

  getAttendees() {

    axios.get(`/api/events/${this.props.match.params.id}/attending`)
      .then(res => this.setState({ attendees: res.data }))
      .catch(err => console.log(err))
  }


  render() {
    if (!this.state.event) return null
    console.log(this.state)
    console.log(this.isAttending())

    return (
      <section >
        <div >

          <Fragment>
            <h2 >Event: {this.state.event.eventName}</h2>

            <hr />
            <EventCreator event={this.props.match.params.id}/>
            <div >
              <div >

                <img src={this.state.event.partyImage} alt={this.state.event.name} />

              </div>
              <div >
                <h4 >Description</h4>
                <p>{this.state.event.description}</p>
                <hr />
                <h4 >Location</h4>
                <p>{this.state.event.location}</p>
                <hr />
                <h4 >What else?</h4>

                <hr />
              </div>

            </div>

            <hr />
            {this.isAttending() &&
            <EventComments event={this.state.event} getEventData={this.getData}/>
            }

          </Fragment>
        </div>

        {this.state.attendees && this.state.attendees.map(attendee =>
          <div key={attendee._id}>

            <Link to={`/users/${attendee._id}`} key={attendee._id}> <p> {attendee.username} </p></Link>
          </div>
        )
        }


        <Map locations = {this.state.event}/>

      </section>
    )
  }
}

export default eventShow
