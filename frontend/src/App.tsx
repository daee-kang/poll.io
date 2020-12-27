import React, { ElementType, useEffect, useState } from 'react'
import './App.css';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom'
import Auth from './Auth'
import LandingPage from './Pages/LandingPage/LandingPage'
import Home from './Pages/Home/Home'
import LogoutFunction from './Components/LogoutFunction'
import { LANDINGPAGESTATE } from './Types'

type RenderProps = {
  component: ElementType
  path?: string
  toggleAuthenticateStatus?: () => void
  // All other props
  [x: string]: any;
}

//these are template routes for rendering pages
const PrivateRoute: React.FC<RenderProps> = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }} />
      )
  )} />
}

const LoggedOutRoute = ({ component: Component, ...rest }: RenderProps) => {
  return <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/home',
        state: { from: props.location }
      }} />
    ) : (
        <Component {...props} {...rest} />
      )
  )} />
}

const PropsRoute = ({ component: Component, ...rest }: RenderProps) => {
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )} />
}

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false)

  useEffect(() => {
    toggleAuthenticatedStatus()
  }, [])

  const toggleAuthenticatedStatus = () => {
    setAuthenticated(Auth.isUserAuthenticated())
  }

  return (
    <div className="App">
      <Switch>
        <LoggedOutRoute path="/" exact component={LandingPage} />
        <LoggedOutRoute path="/login" component={LandingPage} state={LANDINGPAGESTATE.LOGIN} />
        <LoggedOutRoute path="/signup" component={LandingPage} state={LANDINGPAGESTATE.SIGNUP} />
        <PrivateRoute path="/home" component={Home} />
        <Route path="/logout" component={LogoutFunction} />
      </Switch>
    </div>
  );
}

export default App;
