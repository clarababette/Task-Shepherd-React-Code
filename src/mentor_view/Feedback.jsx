import {Box, Typography} from '@mui/material'
import FeedbackMsg from "./FeedbackMsg";
import FocusTaskContext from '../context/FocusTaskContext';
import {useContext} from 'react'

function Feedback() {
  const { comments: feedback } = useContext(FocusTaskContext);
  return (
    <Box className='feedback'>
      <Typography variant='h6'>Feedback History</Typography>
      <Box sx={{display:'grid', gridTemplateColumns: '3rem 1fr 3rem', rowGap:'1rem', marginTop:'1rem', }}>
        {feedback.map((thisFeedback, index) => <FeedbackMsg key={index} feedback={thisFeedback} />)}
        </Box>
      </Box>
  )
}

export default Feedback