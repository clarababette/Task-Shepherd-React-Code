import { useState, useEffect, useContext } from 'react'
import FocusTaskContext from '../context/FocusTaskContext';
import { Box, Typography, Tabs, Tab } from '@mui/material';
import TaskHeader from '../coder_view/TaskHeader';
import TaskInfo from './TaskInfo';
import Review from './Review';
import Feedback from './Feedback';

function ReviewCard() {
  const { focusTask: task, comments } = useContext(FocusTaskContext)
  const [value, setValue] = useState('Review');
  const [message, setMessage] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if(comments) {
      setMessage(comments.find(
                  (comment) => comment.first_name == undefined,
      ))
    } else {
      setMessage()
                }
  }, [comments])

  if (!task) return null;


  return <Box>
    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
    <TaskHeader
        name={task.name}
        status={task.status}
        timestamp={task.status_timestamp}
        
    />
      <Typography variant='h5' sx={{ height: 'fit-content' }}>{task.first_name} {task.last_name}</Typography>
      </Box>
      <Tabs
        centered
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        <Tab value="Info" label="Info" />
        <Tab value="Review" label="Review" />
        {comments && typeof comments != 'string' && <Tab value="Feedback History" label="Feedback History" />}
      </Tabs>
    {value == 'Info' && <TaskInfo></TaskInfo>}
    {value == 'Review' && <Review message={message} />}
    {comments && value == 'Feedback History' && <Feedback/>}
  </Box>
}

export default ReviewCard