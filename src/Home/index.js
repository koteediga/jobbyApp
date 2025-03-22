import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  
  return (
    <>
      <div>
        <Header />
      </div>
      <button
        type="button"
        className="logout-desktop-btn"
        onClick={onClickLogout}
      >
        Logout
      </button>
      <div className="main-container">
        <h1>Find The Job That Fits Your Life</h1>
        <p>Millions of people are searching for jobs</p>
        <Link to="/jobs">
          <button>Find Jobs</button>
        </Link>
      </div>
    </>
  )
}

export default Home
