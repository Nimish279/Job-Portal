import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import LandingPage from './pages/LandingPage';
import RecruiterLogin from './RecruiterPages/Login_SignUp/RecruiterLogin';
import RecruiterRegister from './RecruiterPages/Login_SignUp/RecruiterRegister';
import AllJobs_ActiveJobs from './RecruiterPages/AllJobs_ActiveJobs';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard.jsx';
import Logout from './pages/Logout.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/users/register' element={<Register/>}/>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/users/logout' element={<Logout/>}/>
        <Route path='/users/dashboard' element={<Dashboard/>} />

        {/* Recruiter Pages */}
        <Route path='/recruiters/register' element={<RecruiterRegister/>} />
        <Route path='/recruiters/login' element={<RecruiterLogin/>} />
        <Route path='/recruiters/jobs/active' element={<AllJobs_ActiveJobs/>}/>
      </Routes>
    </Router>
  )
}

export default App
