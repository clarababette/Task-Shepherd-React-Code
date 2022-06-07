import {Card, Typography} from '@mui/material';

function FeedbackMsg({feedback}) {
  const {first_name, comment, timestamp} = feedback;
  return (
    <Card
      sx={{
        padding: '0.5rem',
        display: 'flex',
        flexDirection: 'column',
        rowGap: '0.25rem',
        width: 'fit-content',
        gridColumn: first_name ? '1 / 3' : '2 / 4',
        justifySelf: first_name ? 'start' : 'end',
        minHeight: 'fit-content',
        backgroundColor: first_name ? 'primary.light' : 'secondary.light'
      }}
    >
      {first_name && (
        <Typography variant='body2' className='feedback-details  '>
          {first_name}
        </Typography>
      )}
      <Typography variant='body1' className='feedback-text'>
        {comment}
      </Typography>
      <Typography
        sx={{textAlign: 'right'}}
        variant='body2'
        className='feedback-details  '
      >
        {timestamp}
      </Typography>
    </Card>
  );
}

export default FeedbackMsg;
