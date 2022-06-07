import { useContext } from 'react';
import AppContext from '../context/AppContext';
import { Box, Typography } from '@mui/material';

function FeedbackMsg({ feedback }) {
  const { colors, getMsgColor } = useContext(AppContext);
  const {first_name, comment, timestamp, mentor_id} = feedback;
  return (
    <Box
      sx={{
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '0.25rem',
        width: '100%',
        gridColumn: first_name ? '1 / 3' : '2 / 4',
        justifySelf: first_name ? 'start' : 'end',
        height: 'fit-content',
        backgroundColor: first_name ? getMsgColor(mentor_id) : colors.grey.light
      }}
    >
      {first_name && (
        <Typography variant='subtitle2' className='feedback-details  '>
          {first_name}
        </Typography>
      )}
      <Typography variant='body2' className='feedback-text'>
        {comment}
      </Typography>
      <Typography
        sx={{textAlign: 'right'}}
        variant='caption'
        className='feedback-details  '
      >
        {timestamp}
      </Typography>
    </Box>
  );
}

export default FeedbackMsg;
