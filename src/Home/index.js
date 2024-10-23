import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = props => {
  const findJobs = () => {}
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="main-container">
        <h1>Find The Job That Fits Your Life</h1>
        <p>Millions of People Searching for Job</p>
        <Link to="/jobs">
          <button>Find Jobs</button>
        </Link>
      </div>
    </>
  )
}

export default Home
