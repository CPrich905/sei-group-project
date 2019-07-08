import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



class UsersIndex extends React.Component {
  constructor() {
    super()

    this.state = { users: null }

  }


  componentDidMount() {
    axios.get('/api/users')
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err))
  }




  render() {

    if (!this.state.users) return null
    console.log(this.state.users)

    return (
      <main>
        <section className="frontSection">
          <div className="container front">
            <div className="frontSection">
              {this.state.users.map(user => (
                <section  key={user._id} >
                  <Link to={`/users/${user._id}`}>
                    <div>
                      <img src={user.avatar}/>
                      <span key={user._id}>
                        <h3 key={user._id}>
                          {user.username}
                        </h3></span>
                    </div>
                  </Link>
                </section>
              ))}
            </div>
          </div>
        </section>
      </main>
    )
  }
}

export default UsersIndex