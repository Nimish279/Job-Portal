import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import LandingPage from './pages/LandingPage';
import RecruiterLogin from './RecruiterPages/Login_SignUp/RecruiterLogin';
import RecruiterRegister from './RecruiterPages/Login_SignUp/RecruiterRegister';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard.jsx';
import Logout from './pages/Logout.jsx';
import SavedJobs from './pages/SavedJobs.jsx'; // Added import for SavedJobs
import JobRecommendations from './pages/JobRecommendation.jsx'; // Added import for JobRecommendations
import Resume from './pages/Resume.jsx'; // Added import for Resume
import Profile from './pages/Profile.jsx'; // Added import for Profile
import EditProfile from './pages/EditProfile.jsx'; // Added import for EditProfile

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/users/register' element={<Register/>}/>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/users/logout' element={<Logout/>}/>
        <Route path='/users/dashboard' element={<Dashboard/>} />
        <Route path='/users/saved-jobs' element={<SavedJobs/>} /> {/* Added route for SavedJobs */}
        <Route path='/users/job-recommendations' element={<JobRecommendations/>} /> {/* Added route for JobRecommendations */}
        <Route path='/users/resume' element={<Resume/>} /> {/* Added route for Resume */}
        <Route path='/users/profile' element={<Profile/>} /> {/* Added route for Profile */}
        <Route path='/users/edit-profile' element={<EditProfile/>} /> {/* Added route for EditProfile */}

        {/* Recruiter Pages */}
        <Route path='/recruiters/register' element={<RecruiterRegister/>} />
        <Route path='/recruiters/login' element={<RecruiterLogin/>} />
      </Routes>
    </Router>
  )
}

export default App
