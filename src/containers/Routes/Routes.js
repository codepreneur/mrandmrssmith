import React from 'react'

import { Route, Switch } from 'react-router-dom'

import MainPage from '../MainPage'
import NotFoundPage from '../NotFoundPage'

const Routes = () => (
  <Switch>
    <Route exact path="/" component={MainPage} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Routes
