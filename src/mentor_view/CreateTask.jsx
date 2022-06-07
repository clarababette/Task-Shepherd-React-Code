import {useState, useContext} from 'react';
import AxiosInstance from '../AxiosInstance';
import MentorContext from '../context/MentorContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  Typography,
  Box,
  IconButton,
  DialogTitle,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

function CreateTask() {
  const {setNewTask, setUpdate} = useContext(MentorContext);
  const axios = AxiosInstance();
  const standardURLs = [{url:'GitHub Repo', selected:false},{url:'GitHub Pages', selected:false},{url:'Heroku', selected:false},{url:'Travis CI', selected:false}]
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [infoURLs, setInfoURLs] = useState([{}]);
  const [coderURLs, setCoderURLs] = useState(standardURLs);
  const [otherURL, setOtherURL] = useState('');

  const handleSubmitNewTask = async (e) => {
    e.preventDefault();
    if (name != '') {
      await axios
        .post('/create-task', {
          name,
          description,
          infoURLs,
          coderURLs: coderURLs.map(link => {if(link.selected == true){return link.url}}),
        })
        .then((res) => {
          setNewTask({...res.data[0]});
          setUpdate(true);
        });
    }
  };

  return (
    <div className='create-task'>
      <DialogTitle>Create Task</DialogTitle>
      <Box component='form' className='new-task' onSubmit={handleSubmitNewTask}>
        <TextField
          required
          size='small'
          sx={{gridColumn: 'span 2'}}
          label='Task name'
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <TextField
          size='small'
          sx={{gridColumn: 'span 2'}}
          label='Description'
          value={description}
          multiline
          minRows={4}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <Box sx={{gridColumn: 'span 2'}}>
          <Typography>Additional Resources</Typography>
          {infoURLs.map((url, index) => (
            <Box key={index} sx={{gridColumn: '1 / 2', width: '30em'}}>
              <TextField
                size='small'
                label='Description'
                type='text'
                onChange={(e) => {
                  const urls = [...infoURLs];
                  urls[index]['description'] = e.target.value;
                  setInfoURLs(urls);
                }}
              />
              <TextField
                size='small'
                label='URL'
                type='text'
                onChange={(e) => {
                  const urls = [...infoURLs];
                  urls[index]['address'] = e.target.value;
                  setInfoURLs(urls);
                }}
              />
            </Box>
          ))}
          <IconButton
            className='add-url'
            onClick={() => {
              setInfoURLs([...infoURLs, {}]);
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </Box>
        <Box sx={{gridColumn: 'span 2'}}>
          <Typography>Coder Submission Links</Typography>
          <FormGroup>
            
          {coderURLs.map((link, index) => (
            <FormControlLabel
              key={index}
              control={<Checkbox onChange={(e) => {coderURLs[index].selected = e.target.checked}}/>}
              label={link.url}
            />
                      ))}
          </FormGroup>
            <TextField
              size='small'
              sx={{gridColumn: '1 / 2'}}
              label='other'
              type='text'
              onChange={(e) => {
                setOtherURL(e.target.value);
              }}
            />
          <IconButton
            className='add-url'
            onClick={() => {
              setCoderURLs([...coderURLs, { url: otherURL, selected: false }]);
              setOtherURL('');
            }}
          >
            <AddCircleIcon />
          </IconButton>
        </Box>
        <Button
          variant='contained'
          type='submit'
          sx={{
            gridColumn: 'span 2',
            width: 'fit-content',
            justifySelf: 'center',
          }}
        >
          Save Task
        </Button>
      </Box>
    </div>
  );
}

export default CreateTask;
