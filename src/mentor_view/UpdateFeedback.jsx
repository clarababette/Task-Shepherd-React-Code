import { Box, Typography, TextField, Button, Radio, RadioGroup, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import AxiosInstance from '../AxiosInstance';
import { useState, useContext } from 'react';
import FocusTaskContext from '../context/FocusTaskContext';
import UserContext from '../context/UserContext';

function UpdateFeedback() {
  const axios = AxiosInstance();
  const [comment, setComment] = useState();
  const [complete, setComplete] = useState();
  const { user } = useContext(UserContext);
  const { focusTaskID, setSent } = useContext(FocusTaskContext)


  const submitFeedback = async () => {
    setSent('busy')
    await axios.post('/update/feedback', { taskID: focusTaskID, mentorID: user.id, comment, complete }).then(() => {
      setSent(true)
    })
  }

 const handleChange = (event) => {
    setComplete(event.target.value);
  };

  return (
    <Box component='form' sx={{display:'flex', flexDirection:'column', rowGap:'0.25rem'}} className='request-feedback'>
      <Typography variant='h6' >Update Feedback</Typography>
      <TextField
        size='small'
        multiline
        maxRows={4}
        minRows={4}
        sx={{ width: '15rem'}}
        placeholder='Add your feedback.'
        onChange={(e) => setComment(e.target.value)}
      />
      <FormControl>
      <FormLabel>Mark task as complete?</FormLabel>
        <RadioGroup
        onChange={handleChange}
        >
        <FormControlLabel value="false" control={<Radio />} label="No" />
        <FormControlLabel value="true" control={<Radio />} label="Yes" />
      </RadioGroup>
    </FormControl>
      <Button variant='contained' sx={{width: 'fit-content'}} onClick={submitFeedback}>Send</Button>
    </Box>
  );
}

export default UpdateFeedback;
