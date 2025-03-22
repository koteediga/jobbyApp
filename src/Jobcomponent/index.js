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
    failureView: false,
    isRetry: false,
    Loading: true,
    employe_type: [],
    minimum_package: '',
    noJobActive: false,
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

  onChangeSalaray = event => {
    this.setState(
      {
        minimum_package: event.target.id,
      },
      this.fetchjobData,
    )
  }

  onChangeEmployeeType = event => {
    const {employe_type} = this.state
    const {id, checked} = event.target
    const updateEmployeeType = checked
      ? [...employe_type, id]
      : employe_type.filter(each => each !== id)
    this.setState({employe_type: updateEmployeeType}, this.fetchjobData)
  }

  fetchjobData = async () => {
    const {employe_type, minimum_package, inputValue, noJobActive} = this.state
    const query = employe_type.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${query}&minimum_package=${minimum_package}&search=${inputValue}`
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
        if (data.jobs.length === 0) {
          this.setState({
            noJobActive: true,
          })
        } else {
          this.setState({
            jobDetails: data.jobs,
            Loading: false,
          })
        }
      } else {
        console.error('Fetching error')
        this.setState({
          Loading: false,
          failureView: true,
        })
      }
    } catch (error) {
      console.log('Error in fetching data:', error)
      this.setState({
        Loading: false,
        failureView: true,
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
          <p>{updatedlist.employmentType}</p>
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
        this.setState({
          profileDetails: data.profile_details,
          Loading: false,
          isRetry: false,
        })
      } else {
        console.error('Fetching error')
        this.setState({
          Loading: false,
          isRetry: true,
        })
      }
    } catch (error) {
      console.log('Error in fetching data:', error)
      this.setState({
        Loading: false,
        isRetry: true,
      })
    }
  }

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" onClick={this.fetchjobData}>
        Retry
      </button>
    </div>
  )

  renderprofile = () => {
    const {Loading, profileDetails} = this.state
    // console.log(profileDetails)
    return (
      <li>
        <img
          src={profileDetails.profile_image_url}
          alt="profile_image_url"
          className="profile"
        />
        <h1>{profileDetails.name}</h1>
        <p>{profileDetails.short_bio}</p>
      </li>
    )
  }

  render() {
    const {
      Loading,
      jobDetails,
      profileDetails,
      inputValue,
      noJobActive,
      employe_type,
      failureView,
      minimum_package,
      isRetry,
    } = this.state

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

    if (failureView) {
      return this.renderFailureView()
    }
    return (
      <>
        <div>
          <Header />
        </div>
        <div className="container">
          <div className="container1">
            <div>
              {!isRetry ? (
                this.renderprofile()
              ) : (
                <button onClick={this.fetchprofileData}>Retry</button>
              )}
            </div>
            <div>
              <h1>Type of Employment</h1>
              <ul>
                {employmentTypesList.map(each => (
                  <li key={each.employmentTypeId}>
                    <input
                      type="checkbox"
                      id={each.employmentTypeId}
                      onChange={this.onChangeEmployeeType}
                      checked={employe_type.includes(each.employmentTypeId)}
                      className={
                        employe_type.includes(each.employmentTypeId)
                          ? 'active'
                          : ''
                      }
                    />
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
                    <input
                      type="radio"
                      id={each.salaryRangeId}
                      onChange={this.onChangeSalaray}
                      checked={minimum_package === each.salaryRangeId}
                      className={
                        minimum_package === each.salaryRangeId ? 'active' : ''
                      }
                    />
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
              {noJobActive ? (
                <div>
                  <h1>No Jobs Found</h1>
                  <p>We could not find any jobs. Try other filters</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                    alt="no jobs"
                  />
                </div>
              ) : (
                <ul>
                  {filteredJob.map(each => (
                    <li>{this.renderCompany(each)}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobcomponent
