import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import  userecruiterStore  from '../../store/recruiterStore';
const Logout = () => {
  const navigate = useNavigate();
  const {logout}=userecruiterStore()
  useEffect(() => {
    const logoutUser = async () => {
      try {
        const response = await fetch('https://job-portal-backend-swtv.onrender.com/api/recruiters/logout', {
          method: 'POST', // Or GET if your backend handles it that way
          credentials: 'include', // Important for sending cookies
        });

        if (response.ok) {
            toast.success("Recruiter Logged Out Successfully");
          navigate('/recruiters/login');
        } else {
          const data = await response.json();
          toast.error(data.message || "Logout failed");
        }
      } catch (error) {
        toast.error("Something went wrong while logging out.");
      }
    };

    logoutUser();
  }, [navigate]);

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <p className="text-lg text-gray-800">Logging you out...</p>
      <ToastContainer />
    </div>
  );
};

export default Logout;