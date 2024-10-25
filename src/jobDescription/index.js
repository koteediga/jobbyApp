import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

class jobDescription extends Component {
  state = {
    companyDetails: {},
    similar: [],
    Loading: true,
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
        console.log(data)
        this.setState({
          companyDetails: data.job_details,
          similar: data.similar_jobs,
          Loading: false,
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  render() {
    const {companyDetails, similar, Loading} = this.state
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
      return <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    }

    return (
      <div>
        <div>
          <img src={updatedata.logo} alt="logo" />
          <a href={updatedata.url1}>url</a>
          <h1>{updatedata.type}</h1>
          <p>{updatedata.description}</p>
          <h1>Skills</h1>
          <ul>
            {updatedata.skills.map(each => (
              <li>
                <img src={each.image_url} />
                <h1>{each.name}</h1>
              </li>
            ))}
          </ul>
          <h1>Life at Company</h1>
          <p>{updatedata.lifeAtCompany.description}</p>
          <img src={updatedata.lifeAtCompany.image_url} />
          <p>{updatedata.location}</p>
          <h1>{updatedata.rating}</h1>
          <h1>{updatedata.package}</h1>
        </div>
        <div>
          <ul>
            {similar.map(each => (
              <li>
                <img src={each.company_logo_url} />
                <h1>{each.employment_type}</h1>
                <p>{each.description}</p>
                <p>{each.location}</p>
                <h1>{each.rating}</h1>
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
