import { Card, Typography, Link } from '@mui/material';
import { useContext } from 'react';
import FocusTaskContext from '../context/FocusTaskContext';

function LatestFeedback() {
const { latestFeedback: feedback, viewAllFeedback, setViewAllFeedback } = useContext(FocusTaskContext);
  
if (!feedback) return null;
  const { first_name, comment, timestamp } = feedback
  return (
    <Card sx={{padding:'1rem', display:'flex', flexDirection:'column', rowGap:'0.25rem', minWidth: '15rem', overflow:'scroll', marginTop:'0.5rem', gridRow:'2 / 3', gridColumn:'1 / 2',}}>
      <Typography variant='h6'>Latest Feedback</Typography>
      <Typography variant='body2' sx={{color:'hsl(200, 18%, 46%)'}}>Feedback given by {first_name} • {timestamp}</Typography>
      <Typography variant='body1' sx={{flexGrow:'1'}} className="feedback-text">{comment}</Typography>
      <Link href="#" variant='body1' sx={{alignSelf: 'flex-end'}} onClick={() => {setViewAllFeedback(!viewAllFeedback)}} underline="hover">View all feedback</Link>
    </Card>
  );
}

export default LatestFeedback;
