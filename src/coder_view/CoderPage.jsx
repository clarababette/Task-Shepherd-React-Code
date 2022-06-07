import { useState, useEffect, useContext } from 'react';
import UserContext from '../context/UserContext';
import FocusTaskContext from '../context/FocusTaskContext';
import AppContext from '../context/AppContext';
import Task from './Task';
import AxiosInstance from '../AxiosInstance';
import { Box, List,  } from '@mui/material'
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function CoderPage() {
  const { user } = useContext(UserContext);
  const {focusTaskID, setFocusTaskID } = useContext(FocusTaskContext);
  const [tasks, setTasks] = useState();
  const { colors, getStatusColor } = useContext(AppContext);
  const [hovering, setHovering] = useState(false);
  

  useEffect(async () => {
  await AxiosInstance().get(`/tasks/coder/${user.id}`)
   .then(res => {
     setTasks(res.data);
     setFocusTaskID(res.data[0].id)
    })
  },[])


  if (!tasks || !focusTaskID) return null;

  return (
    
    <Box sx={{display:'flex', overflow:'hidden', height:'100%',}}>
      <Box sx={{width: '15rem', backgroundColor: colors.blue.dark, height:'auto'}}>
      <List>
        {tasks.map((task) => (
          <ListItem button key={task.id} sx={{backgroundColor: focusTaskID == task.id  ? getStatusColor(task.status) : 'initial', "& p": {
            color: focusTaskID == task.id ? 'black' : 'white', opacity: '0.4'
      }}} onClick={() => {setFocusTaskID(task.id)}} onMouseOut={() => {setHovering(false)}} onMouseOver={() => {setHovering(task.id)}}>
            <ListItemText sx={{ color: focusTaskID == task.id  ? 'black' : 'white' }} primary={task.name} secondary={hovering == task.id || focusTaskID == task.id ? task.status : ''} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Box>
      <Task/>
      </Box>
  )
}

export default CoderPage
