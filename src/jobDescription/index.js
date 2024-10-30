import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

class jobDescription extends Component {
  state = {
    companyDetails: {},
    similar: [],
    Loading: true,
    isActive: false,
  }

  componentDidMount() {
    this.getCompanyDescription()
  }

  getCompanyDescription = async () => {
    const {
      match: {
        params: {id},
      },
    } = this.props
    console.log(id)
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      const url = `https://apis.ccbp.in/jobs/${id}`
      const options = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      this.setState({Loading: true})
      try {
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok) {
          this.setState({
            companyDetails: data.job_details,
            similar: data.similar_jobs,
            Loading: false,
          })
        } else {
          this.setState({
            isActive: true,
          })
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    const {companyDetails, similar, Loading, isActive} = this.state
    const updatedata = {
      logo: companyDetails.company_logo_url,
      url1: companyDetails.company_website_url,
      type: companyDetails.employment_type,
      id: companyDetails.id,
      description: companyDetails.job_description,
      skills: companyDetails.skills,
      lifeAtCompany: companyDetails.life_at_company,
      location: companyDetails.location,
      package: companyDetails.package_per_annum,
      rating: companyDetails.rating,
    }
    if (Loading) {
      return (
        <div data-testid="loader">
          <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
        </div>
      )
    }
    if (isActive) {
      return (
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
            alt="failure view"
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We cannot seem to find the page you are looking for</p>
          <button>Retry</button>
        </div>
      )
    }
    return (
      <div>
        <div>
          <img src={updatedata.logo} alt="job details company logo" />
          <a href={updatedata.url1}>Visit</a>
          <p>{updatedata.type}</p>
          <h1>Description</h1>
          <p>{updatedata.rating}</p>
          <p>{updatedata.description}</p>
          <h1>Skills</h1>
          <ul>
            {updatedata.skills.map(each => (
              <li>
                <img src={each.image_url} alt="skills" />
                <h1>{each.name}</h1>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <p>{updatedata.lifeAtCompany.description}</p>
          <img src={updatedata.lifeAtCompany.image_url} alt="life_at_company" />
          <p>{updatedata.location}</p>
          <h1>{updatedata.rating}</h1>
          <p>{updatedata.package}</p>
        </div>
        <div>
          <h1>Similar Jobs</h1>
          <ul>
            {similar.map(each => (
              <li>
                <img
                  src={each.company_logo_url}
                  alt="similar job company logo"
                />
                <p>{each.employment_type}</p>
                <h1>Description</h1>
                <p>{each.description}</p>
                <p>{each.location}</p>
                <p>{each.rating}</p>
                <h1>{each.title}</h1>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default jobDescription
