import {Switch, Route} from 'react-router-dom'

import './App.css'
import ProtectedRoute from './ProtectedRoute'
import Home from './Home'
import LoginComponent from './LoginComponent/index'
import Jobcomponent from './Jobomponent'
import jobDescription from './jobDescription'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginComponent} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobcomponent} />
    <ProtectedRoute exact path="/jobs/:id" component={jobDescription} />
  </Switch>
)
export default App
