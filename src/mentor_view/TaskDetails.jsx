import { useState, useContext } from 'react';
import FocusTaskContext from '../context/FocusTaskContext';
import AppContext from '../context/AppContext'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import {
  CardContent, List, ListItem, Button, Dialog, DialogContent,Link
} from '@mui/material';
import Typography from '@mui/material/Typography';
import EditTask from './EditTask';
import ReviewCard from './ReviewCard';

export default function TaskDetails({ task }) {
  const { "Assigned": assigned, "Feedback requested": feedbackRequested, "Feedback updated": feedbackUpdated, "Completed": completed, id} = task
  const { setFocusTaskID, setSent } = useContext(FocusTaskContext);
  const { getStatusColor } = useContext(AppContext)
  const [open, setOpen] = useState(false);
  const [reviewCard, setReviewCard] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenReview = (id) => {
    setFocusTaskID(id);
    setReviewCard(true);
  };

  const handleCloseReview = () => {
    setReviewCard(false);
    setSent(false)
    setFocusTaskID();

  };


  return (
    <Box sx={{
      margin: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', columnGap: '1rem',
    }}
    >
      <Card sx={{border: 'solid 2px', borderColor: getStatusColor('assigned')}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Assigned
          </Typography>
          <List dense >
            {assigned && assigned.map((pug) => (
              <ListItem key={pug.assigned_id} sx={{cursor:'pointer'}}>
                <Link sx={{textDecoration:'none', color:'inherit'}} onClick={() => handleClickOpenReview(pug.assigned_id)}>{pug.coder}</Link>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Card sx={{border: 'solid 2px', borderColor: getStatusColor('feedback requested')}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Feedback requested
          </Typography>
          <List dense>
             {feedbackRequested && feedbackRequested.map((pug) => (
              <ListItem key={pug.assigned_id} sx={{cursor:'pointer'}}>
                <Link sx={{textDecoration:'none', color:'inherit'}} onClick={() => handleClickOpenReview(pug.assigned_id)}>{pug.coder}</Link>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Card sx={{border: 'solid 2px', borderColor: getStatusColor('feedback updated')}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Feedback updated
          </Typography>
          <List dense>
             {feedbackUpdated && feedbackUpdated.map((pug) => (
              <ListItem key={pug.assigned_id} sx={{cursor:'pointer'}}>
                <Link sx={{textDecoration:'none', color:'inherit'}} onClick={() => handleClickOpenReview(pug.assigned_id)}>{pug.coder}</Link>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Card sx={{border: 'solid 2px', borderColor: getStatusColor('completed')}}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Completed
          </Typography>
          <List dense>
            {completed && completed.map((pug) => (
              <ListItem key={pug.assigned_id} sx={{cursor:'pointer'}}>
                <Link sx={{textDecoration:'none', color:'inherit'}} onClick={() => handleClickOpenReview(pug.assigned_id)}>{pug.coder}</Link>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      <Button variant='contained' sx={{ gridColumn: 'span 4', width: 'fit-content', margin: '1em' }} onClick={handleClickOpen}>Edit task</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent><EditTask taskID={id} close={handleClose} /></DialogContent>
      </Dialog>
      <Dialog  className='review-card' open={reviewCard} onClose={handleCloseReview}>
        <DialogContent ><ReviewCard close={handleCloseReview} /></DialogContent>
      </Dialog>
    </Box>
  );
}
