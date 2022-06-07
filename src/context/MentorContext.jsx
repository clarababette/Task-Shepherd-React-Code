import {createContext, useState, useEffect} from 'react';
import AxiosInstance from '../AxiosInstance';
const MentorContext = createContext({});

export const TaskProvider = ({children}) => {
  const [tasks, setTasks] = useState();
  const [update, setUpdate] = useState(true);
  const [newTask, setNewTask] = useState();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setNewTask(false)
    setOpen(false);
  };

  useEffect(async () => {
    if(update)
    AxiosInstance()
      .get('tasks')
      .then((res) => {
        setTasks(res.data);
        setUpdate(false)
      });
  }, [update]);

  setInterval(() => { setUpdate(true)}, 60000)

  return (
    <MentorContext.Provider
      value={{
        tasks, setTasks, handleClickOpen, handleClose, newTask, setNewTask, open, setOpen, setUpdate
      }}
    >
      {children}
    </MentorContext.Provider>
  );
};

export default MentorContext;
