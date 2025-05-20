import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import LandingPage from './pages/LandingPage';
import RecruiterLogin from './RecruiterPages/Login_SignUp/RecruiterLogin';
import RecruiterRegister from './RecruiterPages/Login_SignUp/RecruiterRegister';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/users/register' element={<Register/>}/>
        <Route path='/users/login' element={<Login/>}/>
        <Route path='/users/dashboard' element={<Dashboard/>} />

        {/* Recruiter Pages */}
        <Route path='/recruiters/register' element={<RecruiterRegister/>} />
        <Route path='/recruiters/login' element={<RecruiterLogin/>} />
      </Routes>
    </Router>
  )
}

export default App
