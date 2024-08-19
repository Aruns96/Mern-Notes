import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './pages/Home'

const App = () => {
  return (
    <BrowserRouter>
        <Switch>
          <Route  path="/" exact>
              <Signup />
          </Route>
          <Route  path="/login">
              <Login />
          </Route>
          <Route  path="/home">
              <Home />
          </Route>
        </Switch>
    </BrowserRouter>
  )
}

export default App