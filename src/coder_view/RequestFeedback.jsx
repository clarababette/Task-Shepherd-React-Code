import { Card, Box, Typography, TextField, Button } from '@mui/material'
import AxiosInstance from '../AxiosInstance';
import { useState, useContext, useEffect } from 'react';
import FocusTaskContext from '../context/FocusTaskContext';
import AppContext from '../context/AppContext';

function RequestFeedback() {
  const { focusTaskID: id, setUpdate } = useContext(FocusTaskContext);
  const { colors, btn } = useContext(AppContext)
  const axios = AxiosInstance();
  const [comment, setComment] = useState();

  useEffect(() => { setComment('')},[id])

  const requestFeedback = async () => {
    await axios.post(`/task/${id}/requestFeedback`, { comment }).then((res) => {
      setUpdate(true);
      setComment('');
    });
  };

  return (
    <Card sx={{padding:'1rem', display:'flex', flexDirection:'column', rowGap:'0.25rem', minWidth: '20rem', overflow:'scroll', marginTop:'0.5rem'}}>
    <Box component='form' sx={{display:'flex', flexDirection:'column', rowGap:'1rem'}} >
      <Typography variant='h6' >Request Feedback</Typography>
      <TextField
        value={comment}
        size='small'
        multiline
        maxRows={4}
        minRows={4}
        className='coder-comment'
        placeholder='Add a message to the mentors'
          onChange={(e) => setComment(e.target.value)}
        sx={{backgroundColor: colors.grey.light, borderRadius: 1}}
      />
      <Button variant={btn.variant} sx={{width: btn.width }} onClick={requestFeedback}>Send</Button>
      </Box>
      </Card>
  );
}

export default RequestFeedback;
