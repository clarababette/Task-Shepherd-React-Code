import {Typography, Box, IconButton, Button, Card} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import URL from './URL';
import {useState, useContext} from 'react';
import AxiosInstance from '../AxiosInstance';
import CancelIcon from '@mui/icons-material/Cancel';
import FocusTaskContext from '../context/FocusTaskContext';
import AppContext from '../context/AppContext';
import GitHub from '../octocat.svg'
import { BsGithub } from 'react-icons/bs';
import { DiHeroku } from 'react-icons/di';
import { SiTravisci } from 'react-icons/si';
import { HiLink } from 'react-icons/hi';

function URLs() {
  const axios = AxiosInstance();
  const { focusTask, setUpdate, urlEdit: edit, setUrlEdit: setEdit } = useContext(FocusTaskContext);
  const { colors, getStatusColor, btn } = useContext(AppContext);
  const [urls, setURLs] = useState(focusTask.urls.map((url) => {return {...url}}));

  const handleEditURL = async () => {
    if (urls) {
      await axios.post(`/task/${focusTask.id}/url_update`, { urls }).then((res) => {
        setUpdate(true);
        setEdit(false);
      });
    }
  };

  const handleURLChange = (address, description) => {
   
    setURLs(
      urls.map((url) => {
        const newUrl = {...url}
        if (newUrl['description'] == description) {
          newUrl['address'] = address;
        } return newUrl
      }),
    );
  };



  if(!focusTask) return null

  return (
    <Card sx={{padding:'1rem', display:'flex', flexDirection:'column', rowGap:'1rem', minWidth: '15rem', overflow:'scroll', justifyContent: edit ? 'space-between' : 'flex-start', marginTop:'0.5rem'}}>
      
      <Typography variant='h6'>
        Your Links
     
        {!edit && (
          <IconButton sx={{color: getStatusColor(focusTask.status), marginLeft:'1rem'}} size='small' onClick={() => setEdit(true)}>
            <EditIcon />
          </IconButton>
        )}
        {edit && (
          <IconButton
            
            sx={{color: colors.blue.light, marginLeft:'1rem'}}
            size='small'
            onClick={() => {
              setEdit(false);
            }}
          >
            <CancelIcon />
          </IconButton>
        )}
 </Typography>
      {!edit &&
        focusTask.urls.map((url, index) => (
          <Button
            variant='contained'
            disabled={url.address ? false : true}
            size='small'
            sx={{}}
            key={index}
            onClick={() => {
              window.open(url.address);
            }}
          >
            {url.description}
          </Button>
        ))}

      {edit &&
        focusTask.urls.map((url) => (
          <URL
            update={handleURLChange}
            url={url}
            key={url.description}
          ></URL>
        ))}
      {edit && <Button variant={btn.variant} sx={{ width: btn.width }} onClick={handleEditURL}>Save</Button>}
      {/* <Box sx={{display:'flex', columnGap: '1rem', rowGap:'1rem',flexWrap:'wrap'}} >
      <Button variant='contained'  disableElevation sx={{ flexDirection: 'column', rowGap:'0.25rem' }} ><BsGithub size={40} style={{paddingTop:'0.25rem'}} /><Typography>GitHub</Typography></Button>
      <Button variant='contained'  disableElevation sx={{ flexDirection: 'column', rowGap:'0.25rem' }} ><DiHeroku size={40} style={{paddingTop:'0.25rem'}} /><Typography>Heroku</Typography></Button>
      <Button variant='contained'  disableElevation sx={{ flexDirection: 'column' , rowGap:'0.25rem'}} ><SiTravisci size={40} style={{paddingTop:'0.25rem'}} /><Typography>Travis CI</Typography></Button>
      <Button variant='contained'  disableElevation sx={{ flexDirection: 'column', rowGap:'0.25rem' }} ><HiLink size={40} style={{paddingTop:'0.25rem'}}/><Typography>A link</Typography></Button>
    </Box> */}
    </Card>
  );
}

export default URLs;