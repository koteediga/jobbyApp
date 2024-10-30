import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobcomponent extends Component {
  state = {
    isActive: false,
    profileDetails: {},
    jobDetails: [],
    inputValue: '',
    activeId: 1,
    Loading: true,
  }

  componentDidMount() {
    this.fetchprofileData()
    this.fetchjobData()
  }

  changeInput = event => {
    this.setState({
      inputValue: event.target.value,
    })
  }

  selectCompany = Aid => {
    console.log(Aid)
    this.setState({
      activeId: Aid,
    })
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
        //  console.log(data.jobs)
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
      <Link to={`jobs/${updatedlist.id}`}>
        <li onClick={this.selectCompany}>
          <img src={updatedlist.companyLogoUrl} alt="company logo" />
          <h1>{updatedlist.employmentType}</h1>
          <h1>{updatedlist.title}</h1>
          <p>{updatedlist.rating}</p>
          <h1>{details.packagePerAnnum}</h1>
          <p>{details.location}</p>
          <h1>Description</h1>
          <p>{updatedlist.jobDescription}</p>
        </li>
      </Link>
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
        // console.log(data.profile_details)
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
    // console.log(profileDetails)
    return (
      <li>
        <img src={profileDetails.profile_image_url} className="profile" />
        <h1>{profileDetails.name}</h1>
        <p>{profileDetails.short_bio}</p>
      </li>
    )
  }

  render() {
    const {Loading, jobDetails, profileDetails, inputValue} = this.state

    const filteredJob = jobDetails.filter(each =>
      each.title.toLowerCase().includes(inputValue.toLowerCase()),
    )
    // console.log(filteredJob)
    if (Loading) {
      return (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }
    return (
      <>
        <div>
          <Header />
        </div>
        <div className="container">
          <div className="container1">
            <div>{this.renderprofile()}</div>
            <div>
              <h1>Type of Employment</h1>
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
              <h1>Salary Range</h1>
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
          <div className="container2">
            <input
              type="search"
              onChange={this.changeInput}
              value={inputValue}
            />
            {/* <button data-testid="searchButton">
              <CiSearch />
            </button> */}
            <div>
              <ul>
                {filteredJob.map(each => (
                  <li>{this.renderCompany(each)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobcomponent
