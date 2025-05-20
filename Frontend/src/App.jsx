import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import LandingPage from './pages/LandingPage';
import RecruiterLogin from './RecruiterPages/Login_SignUp/RecruiterLogin';
import RecruiterRegister from './RecruiterPages/Login_SignUp/RecruiterRegister';
import AllJobs_ActiveJobs from './RecruiterPages/AllJobs_ActiveJobs';
import AllJobs_ClosedJobs from './RecruiterPages/AllJobs_ClosedJobs.jsx';
import RecruiterProfile from './RecruiterPages/Recruiter Profile/RecruiterProfile';
import RecruiterLogout from './RecruiterPages/Login_SignUp/RecruiterLogout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard.jsx';
import Logout from './pages/Logout.jsx';
import PostJob_Job from './RecruiterPages/PostJob_Job.jsx';
import PostJob_Internship from './RecruiterPages/PostJob_Internship.jsx';
import NotificationsRecr from './RecruiterPages/NotificationsRecr.jsx';
import AcceptedApplicants from './RecruiterPages/AcceptedApplicants.jsx';
import Applicants from './RecruiterPages/Applicants.jsx';
import UpdateRecruiter from './RecruiterPages/UpdateRecruiter.jsx';
import ApplicantsProfile from './RecruiterPages/ApplicantsProfile.jsx';
import JobPage from './pages/JobPage.jsx';
import NotificationsPage from './pages/NotificationsPage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/users/register' element={<Register/>}/>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/users/logout' element={<Logout/>}/>
        <Route path='/users/dashboard' element={<Dashboard/>} />
        <Route path='/users/job/:id' element={<JobPage/>}/>
        <Route path='/users/notifications' element={<NotificationsPage/>}/>

        {/* Recruiter Pages */}
        <Route path='/recruiters/register' element={<RecruiterRegister/>} />
        <Route path='/recruiters/login' element={<RecruiterLogin/>} />
        <Route path='/recruiters/logout' element={<RecruiterLogout/>} />
        <Route path='/recruiters/jobs/active' element={<AllJobs_ActiveJobs/>}/>
        <Route path='/recruiters/jobs/closed' element={<AllJobs_ClosedJobs/>}/>
        <Route path='/recruiters/notifications' element={<NotificationsRecr/>} />
        <Route path='/recruiters/getProfile' element={<RecruiterProfile/>} />
        <Route path='/recruiters/postJob' element={<PostJob_Job/>}/>
        <Route path='/recruiters/postInternship' element={<PostJob_Internship/>} />
        <Route path='/recruiters/acceptedApplicants' element={<AcceptedApplicants/>}/>
        <Route path='/recruiters/applicants' element={<Applicants/>} />
        <Route path='/recruiters/updateRecruiter' element={<UpdateRecruiter/>}/>
        <Route path='/recruiters/applicantsProfile/:id' element={<ApplicantsProfile/>} />
      </Routes>
    </Router>
  )
}

export default App
