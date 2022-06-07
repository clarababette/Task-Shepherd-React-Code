import { useContext } from 'react';
import FocusTaskContext from '../context/FocusTaskContext';
import AppContext from '../context/AppContext';
import { Typography, Box, Chip } from '@mui/material';

function TaskInfo() {
  const { focusTask } = useContext(FocusTaskContext);
  const { description, info_urls } = focusTask;
  const { colors } = useContext(AppContext)

  return (
    <Box sx={{padding:'1rem', display:'flex', flexDirection:'column', rowGap:'1rem', minWidth: '15rem', overflow:'scroll', marginTop:'0.5rem', }}>
      {!description && <Typography sx={{color: colors.grey.mid}} variant='body1'>No additional information was provided for this task.</Typography>}
      {description && <Typography variant='body1'>{description}</Typography>}
      <Box>
      {info_urls && info_urls.map((url, index) => (
        <Chip key={index} label={url.description} onClick={() => { window.open(url.address) }} sx={{width:'fit-content', marginLeft:'0.5em'}}/>
          ))}
      </Box>
    </Box>
  );
}

export default TaskInfo;
