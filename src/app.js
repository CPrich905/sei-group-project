import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './styles/styles.scss'

import EventsIndex from './components/events/eventsIndex'
import EventsShow from './components/events/EventsShow'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserShow from './components/auth/UserShow'
import UsersIndex from './components/auth/UsersIndex'
import EventsNew from './components/events/EventsNew'

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route path="/events/:id" component={EventsShow} />
          <Route path="/events/" component={EventsIndex} />
          <Route path="/events/new/" component={EventsNew} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/users/:userid" component={UserShow} />
          <Route path="/users/" component={UsersIndex} />
        </Switch>

      </main>
    </BrowserRouter>


  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
