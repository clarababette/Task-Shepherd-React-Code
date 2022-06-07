import { Typography, Box, Chip, Card } from '@mui/material';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

function TaskInfo({ description = undefined, info_urls = undefined}) {
  const { colors } = useContext(AppContext)
  return (
    <Card sx={{padding:'1rem', display:'flex', flexDirection:'column', rowGap:'1rem', minWidth: '15rem', overflow:'scroll', marginTop:'0.5rem', }}>
      <Typography variant='h6'>Info</Typography>
      {!description && <Typography sx={{color: colors.grey.mid}} variant='body1'>No additional information was provided for this task.</Typography>}
      {description && <Typography variant='body1'>{description}</Typography>}
      <Box>
      {info_urls && info_urls.map((url, index) => (
        <Chip key={index} label={url.description} onClick={() => { window.open(url.address) }} sx={{width:'fit-content', marginLeft:'0.5em'}}/>
          ))}
      </Box>
    </Card>
  );
}

export default TaskInfo;
