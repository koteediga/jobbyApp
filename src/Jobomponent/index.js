import {Component} from 'react'
import Header from '../Header'

class Jobcomponent extends Component {
  state = {
    isActive: false,
    profileDetails: {},
    Loading: false,
  }

  componentDidMount() {
    this.fetchprofileData()
  }

  fetchprofileData = async () => {
    const url = 'https://apis.ccbp.in/profile'

    const options = {
      method: 'GET',
    }

    try {
      const response = await fetch(url, options)
      console.log(response.ok)
      if (response.ok) {
        const data = await response.json()
        console.log(data.profile_details)
        this.setState({profileDetails: data.profile_details, Loading: false})
      } else {
        console.error('Fetching error')
        this.setState({
          Loading: false,
        })
      }
    } catch (error) {
      console.log('Error in fetching data:', error)
      this.setState({
        Loading: false,
      })
    }
  }

  renderprofile = () => {
    const {Loading, profileDetails} = this.state
    console.log(profileDetails)
    return (
      <div>
        <h1>kote</h1>
        <img src={profileDetails.profile_image_url} className="profile" />
        <h1>{profileDetails.name}</h1>
        <p>{profileDetails.short_bio}</p>
      </div>
    )
  }

  render() {
    const {Loading} = this.state
    const {salaryRangesList, employmentTypesList} = this.props
    console.log(salaryRangesList[0])
    return (
      <>
        <div>
          <Header />
        </div>

        <div>
          <div>{this.renderprofile()}</div>
          <div>
            <p>Types of Employment</p>
            {/* <ul>
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId}>
                  <input type="checkbox" id={each.employmentTypeId} />
                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                </li>
              ))}
            </ul> */}
          </div>
          <div>
            <ul>
              {salaryRangesList.map(each => (
                <li key={each.salaryRangeId}>
                  <input type="radio" id={each.salaryRangeId} />
                  <label htmlFor={each.salaryRangeId}>{each.label}</label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobcomponent
