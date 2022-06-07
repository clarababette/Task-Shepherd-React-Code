
import { useState, useContext } from 'react';
import UserContext from './context/UserContext';
import AppContext from './context/AppContext';
import { FocusTaskProvider } from './context/FocusTaskContext'
import CoderPage from './coder_view/CoderPage';
import MentorPage from './mentor_view/MentorPage';
import './styles/mui-styles.scss';
import Header from './Header';
import { CircularProgress, Box } from '@mui/material';


function App() {
  const { setEmail, user, loading, setLoading } = useContext(UserContext);
  const [emailInput, setEmailInput] = useState();
  const { colors } = useContext(AppContext)

  
  
  return (
    <FocusTaskProvider>
      <Box className="app"> 
      {loading && <Box sx={{width:'100vw', height: '100vh', backgroundColor: colors.blue.dark}}><CircularProgress size={100} sx={{color: colors.blue.light, margin:'calc(50vh - 50px) calc(50vw - 50px)'}}></CircularProgress> </Box>}
      {!loading && !user && <form onSubmit={(e) => {
          e.preventDefault();
          setLoading(true);
          setEmail(emailInput);
      }}>
        <h2>Enter email</h2>
        <input type='text' onChange={(e) => { setEmailInput(e.target.value) }} />
        <input type='submit'></input>
      </form>}

      {!loading && user && <Header name={`${user.first_name} ${user.last_name}`} role={ user.role}/>}
      {!loading && user && user.role == 'mentor' && <MentorPage />}
      {!loading && user && user.role == 'coder' && <CoderPage />}
      </Box>
      </FocusTaskProvider>
  );
}

export default App;
