import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'

class Jobcomponent extends Component {
  state = {
    isActive: false,
    profileDetails: {},
    jobDetails: {},

    Loading: true,
  }

  componentDidMount() {
    this.fetchprofileData()
    this.fetchjobData()
  }

  fetchjobData = async () => {
    const url = 'https://apis.ccbp.in/jobs'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({Loading: true})
    try {
      const response = await fetch(url, options)
      console.log(response.ok)
      if (response.ok) {
        const data = await response.json()
        console.log(data.jobs)
        this.setState({jobDetails: data.jobs, Loading: false})
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

  renderCompany = details => {
    const updatedlist = {
      companyLogoUrl: details.company_logo_url,
      employmentType: details.employment_type,
      id: details.id,
      jobDescription: details.job_description,
      location: details.location,
      packagePerAnnum: details.package_per_annum,
      rating: details.rating,
      title: details.title,
    }
    return (
      <li>
        <img src={updatedlist.companyLogoUrl} alt={updatedlist.title} />
        <h1>{updatedlist.employmentType}</h1>
        <p>{updatedlist.title}</p>
        <p>{updatedlist.rating}</p>
        <h1>{details.packagePerAnnum}</h1>
        <h1>Description</h1>
        <p>{updatedlist.jobDescription}</p>
      </li>
    )
  }

  fetchprofileData = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    this.setState({Loading: true})
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
    const {Loading, jobDetails, profileDetails} = this.state
    const {salaryRangesList, employmentTypesList} = this.props
    console.log(salaryRangesList[0])
    if (Loading) {
      return <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    }
    return (
      <>
        <div>
          <Header />
        </div>

        <div>
          <div>{this.renderprofile()}</div>
          <div>
            <p>Types of Employment</p>
            <ul>
              {employmentTypesList.map(each => (
                <li key={each.employmentTypeId}>
                  <input type="checkbox" id={each.employmentTypeId} />
                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                </li>
              ))}
            </ul>
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
        <div>
          <input type="search" />
          <div>
            <ul>
              {jobDetails.map(each => (
                <li>{this.renderCompany(each)}</li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }
}

export default Jobcomponent
