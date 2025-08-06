// ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import userStore from './store/userStore';

const ProtectedRoute = ({ children }) => {
  const user = userStore((state) => state.user);
  const fetchedUser = userStore((state) => state.fetchedUser);

  if (!fetchedUser) return <div>Loading...</div>; // Safe guard, but usually won't be hit now

  if (!user) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
