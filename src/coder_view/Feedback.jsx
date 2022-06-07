import {Box, Card, Typography} from '@mui/material'
import FeedbackMsg from "./FeedbackMsg";
import { useContext } from 'react';
import FocusTaskContext from '../context/FocusTaskContext';

function Feedback() {
  const { comments: feedback, viewAllFeedback: view, setViewAllFeedback: setView } = useContext(FocusTaskContext);

  return (
    <Card sx={{display: view ? 'grid' : 'none', gridTemplateRows: 'auto 1fr' , margin: '1rem', padding: '1rem', height: 'auto', gridRow: 'span 2'}}>
      <Typography variant='h6'>Feedback History</Typography>
      <Box sx={{display:'grid', gridTemplateColumns: '3rem 1fr 3rem', rowGap:'1rem', padding: '0.5rem', height: 'auto', overflow: 'scroll', alignContent:'start'  }}>
        {feedback.map((thisFeedback, index) => <FeedbackMsg key={index} feedback={thisFeedback} />)}
        </Box>
      </Card>
  )
}

export default Feedback