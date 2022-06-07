import {useContext} from 'react';
import URLs from './URLs';
import Feedback from './Feedback';
import RequestFeedback from './RequestFeedback';
import TaskHeader from './TaskHeader';
import LatestFeedback from './LatestFeedback';
import TaskInfo from './TaskInfo';
import { Card, Box, Typography } from '@mui/material';
import FocusTaskContext from '../context/FocusTaskContext';
import AppContext from '../context/AppContext';

function Task() {
  const { focusTask: task, comments, latestFeedback } = useContext(FocusTaskContext); 
  const { colors } = useContext(AppContext)
  if (!task) return null;

  return (
    <>
      <Box sx={{backgroundColor: colors.grey.light, width:'100%', padding:'1rem 2rem'}}>
        <Card>
      <TaskHeader
        name={task.name}
        status={task.status}
        timestamp={task.status_timestamp}
      />
      </Card>
        <Box className='task' sx={{gridAutoColumns: latestFeedback ? '1fr' : 'auto', height: 'auto'}}>
          <TaskInfo description={task.description} info_urls={task.info_urls} />

          {task.required_urls && <URLs />}
          {!task.required_urls && <Card sx={{padding:'1rem', display:'flex', flexDirection:'column', rowGap:'0.25rem', minWidth: '15rem', overflow:'scroll', marginTop:'0.5rem'}}>
      <Typography variant='h6'>Your URLs</Typography>
      <Typography sx={{color: colors.grey.mid}} variant='body1'>You are not required to submit any URLs for this task.</Typography>
    </Card>}
          

          <RequestFeedback id={task.id} />
          
          {latestFeedback && <LatestFeedback feedback={latestFeedback}/>}

      {comments && <Feedback></Feedback>}
        </Box>
      </Box>
      </>
  );
}

export default Task;
