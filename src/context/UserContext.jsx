import {createContext, useState, useEffect} from 'react';
import AxiosInstance from '../AxiosInstance';

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const axios = AxiosInstance();
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    if(email){
      await axios.post(`user/login`, {email}).then((res) => {
        setUser(res.data)
        setLoading(false)
      });
}
  }, [email]);
  
  return (
    <UserContext.Provider
      value={{
        setEmail, user, loading, setLoading
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;