import { useState, useEffect, useContext } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel, Button, Box } from '@mui/material';
import AxiosInstance from '../AxiosInstance';
import MentorContext from '../context/MentorContext';

function AssignTask() {
  const { newTask: { id: taskID, name }, handleClose: close, setUpdate } = useContext(MentorContext)
  const [coders, setCoders] = useState();
  const axios = AxiosInstance();
  useEffect(async () => {
    axios.get(`/assign/task/${taskID}`).then((res) => {
      setCoders([...res.data]);
    });
  }, []);

  const assignTask = (e) => {
    const goldFish = coders.map((coder) => {
      if (coder.id == e.target.value) {
        coder.assignNew = e.target.checked;
      }
      return coder;
    });
    setCoders([...goldFish]);
  };

  const submitAssignments = async (e) => {
    e.preventDefault();
    const goldFish = coders.filter((coder) => coder.assignNew == true);
    await axios
      .post(`/assign/task/${taskID}`, { coders: goldFish })
      .then(() => {
        setUpdate(true)
        close()
      });
  };

  if (!coders) return null;
  return (
    <div className="assign-coders">
      <DialogTitle>Assign Task - {name}</DialogTitle>
      <Box component="form" onSubmit={submitAssignments}>
        {coders.map((coder) => (
          <div key={coder.id}>
            {coder.status && (
              <FormControlLabel
                control={(
                  <Checkbox id={coder.id.toString()} checked readOnly />)}
                label={`${coder.first_name} ${coder.last_name}`}
              />
            )}
            {!coder.status && (
              <FormControlLabel
                control={(
                  <Checkbox

                    id={coder.id.toString()}
                    value={coder.id}
                    onChange={assignTask}
                  />
)}
                label={`${coder.first_name} ${coder.last_name}`}
              />

            )}
          </div>
        ))}
        <Button variant="contained" type="submit" sx={{ width: 'fit-content'}}>Save</Button>
      </Box>
    </div>
  );
}

export default AssignTask;
