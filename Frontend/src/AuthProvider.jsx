// AuthProvider.jsx
import { useEffect, useState } from 'react';
import userStore from './store/userStore';

const AuthProvider = ({ children }) => {
  const fetchUser = userStore((state) => state.fetchUser);
  const fetchedUser = userStore((state) => state.fetchedUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await fetchUser(); // Wait for the user to be fetched
      setLoading(false);
    };

    init();
  }, []);

  if (loading || !fetchedUser) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthProvider;
