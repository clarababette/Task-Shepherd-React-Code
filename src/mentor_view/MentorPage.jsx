import { TaskProvider } from '../context/MentorContext';
import { FocusTaskProvider } from '../context/FocusTaskContext';
import { useContext } from 'react';
import UserContext from '../context/UserContext';
import Paper from '@mui/material/Paper';
import Tasks from './Tasks';

function MentorPage() {
  const { user } = useContext(UserContext);
  return (
    <TaskProvider>
      
      <FocusTaskProvider>
    <Paper
      className="mentor-container"
      sx={{
        margin: '1rem', padding: '1rem', overflow: 'hidden',
      }}
    >
 <Tasks />
        </Paper>
        </FocusTaskProvider>
       
      </TaskProvider>
  );
}

export default MentorPage;
