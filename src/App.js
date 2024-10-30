import {Switch, Route} from 'react-router-dom'

import './App.css'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import LoginComponent from './LoginComponent/index'
import Jobcomponent from './Jobcomponent'
import jobDescription from './jobDescription'
import NotFound from './NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginComponent} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobcomponent} />
    <ProtectedRoute exact path="/jobs/:id" component={jobDescription} />
    <Route component={NotFound} />
  </Switch>
)
export default App
