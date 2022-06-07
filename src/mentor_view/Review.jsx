import { useContext } from 'react';
import  FocusTaskContext  from '../context/FocusTaskContext'
import { Card, Typography, Box, Button, CircularProgress } from '@mui/material';
import UpdateFeedback from './UpdateFeedback';

function Review({ message }) {
  const { focusTask, sent } = useContext(FocusTaskContext)
  const { required_urls, urls } = focusTask
  

  const coderURL = (url) => {
    if (required_urls && urls) {
      const pug = urls.find(x => x.description == url)
      return pug ? pug.address : undefined
    } else {
      return undefined
    }
  }

  return (
    <Box sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', rowGap: '1rem', overflow: 'scroll', width: '500px' }}>
      {sent == 'busy' && <CircularProgress />}
    {!sent && message &&
      <Card sx={{ padding: '1rem', display: 'flex', flexDirection: 'column', rowGap: '0.25rem' }}>
        <Typography variant='h6'>Coder Message</Typography>
        <Typography variant='body2' className="feedback-details">{message.timestamp}</Typography>
        <Typography variant='body1' className="feedback-text">{message.comment}</Typography>
      </Card>}
    {!sent && required_urls &&
      <Box sx={{display:'flex', columnGap:'0.5rem'}}>
    {required_urls.map((url, index) => (
    <Button variant='contained' size='small' disabled={coderURL(url) ? false: true} sx={{}} key={index} onClick={() => {window.open(coderURL(url))}}>{url}</Button>
      ))}
        </Box>
    }
    
      {!sent && <UpdateFeedback />}
      {sent == true && <Typography>Feedback sent!</Typography>}
      </Box>)
}

export default Review