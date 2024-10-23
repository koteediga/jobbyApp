import {Component} from 'react'
import Header from '../Header'

class Jobcomponent extends Component {
  state = {
    isActive: false,
  }

  renderprofile = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    return (
      <div>
        <h1>kote</h1>
        <img src={data.profile_image_url} className="profile" />
        <h1>{data.name}</h1>
        <p>{data.short_bio}</p>
      </div>
    )
  }

  render() {
    return (
      <>
        <div>
          <Header />
        </div>

        <div>
          <div>{this.renderprofile()}</div>
        </div>
      </>
    )
  }
}

export default Jobcomponent
