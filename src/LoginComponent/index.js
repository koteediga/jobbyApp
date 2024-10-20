import {Component} from 'react'
import {Cookies} from 'js-cookie'
import './index.css'

class LoginComponent extends Component {
  state = {
    username: '',
    password: '',
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onsubmitsuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken)
  }

  onSubmitform = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.okue) {
      this.onsubmitsuccess(data.jwt_token)
    } else {
      this.onsubmitfailure(data.error_msg)
    }
    console.log('kote')
  }

  render() {
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo"
          />
          <h1>Lobby</h1>
          <form onSubmit={this.onSubmitform}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="username"
              id="username"
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="username"
              id="username"
              onChange={this.onChangePassword}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginComponent
