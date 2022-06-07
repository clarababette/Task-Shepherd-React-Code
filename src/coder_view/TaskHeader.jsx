import { useContext } from 'react';
import moment from 'moment';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AppContext from '../context/AppContext';

import { Box, Typography } from '@mui/material'

function TaskHeader({ status, timestamp, name }) {
  const { getStatusColor } = useContext(AppContext)
  
  return (
    <Box className='task-header' sx={{width:'fit-content'}} >
      
      {/assigned/gi.test(status) && (
        <AssignmentIcon className='statusIcon' sx={{ fontSize: '2.5rem', backgroundColor: getStatusColor(status)}}/>
      )}
      {/feedback requested/gi.test(status) && (
        <AssignmentReturnIcon className='statusIcon' sx={{ fontSize: '2.5rem', backgroundColor: getStatusColor(status)}}/>
      )}
      {/completed/gi.test(status) && (
        <AssignmentTurnedInIcon className='statusIcon' sx={{ fontSize: '2.5rem', backgroundColor: getStatusColor(status)}}/>
      )}
      {/feedback updated/gi.test(status) && (
        <AnnouncementIcon className='statusIcon' sx={{ fontSize: '2.5rem', backgroundColor: getStatusColor(status)}}/>
      )}
      <Typography className='app-name' variant='h5'>
        {name}
      </Typography>
      <Typography variant='body2' className='status'>{status} • {moment(timestamp).fromNow()}</Typography>
    </Box>
  );
}

export default TaskHeader;
