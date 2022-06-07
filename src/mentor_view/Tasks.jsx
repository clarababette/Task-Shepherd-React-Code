import { useContext } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TaskRow from './TaskRow';
import CreateTask from './CreateTask';
import AssignTask from './AssignTask';
import MentorContext from '../context/MentorContext';

function Tasks() {
  const { tasks, open, handleClickOpen, handleClose, newTask} = useContext(MentorContext)
  
  if (!tasks) return null;

  return (
    
    <>
      <TableContainer sx={{
        width: '100%', margin: '1rem', overflow: 'scroll',
      }}
      >
        <Table stickyHeader aria-label="Task Status Summary" sx={{ margin: '1rem 8rem', width: 'calc(100% - 16rem)' }}>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell sx={{ textAlign: 'right' }}>Assigned</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>Feedback requested</TableCell>
              <TableCell sx={{ textAlign: 'right' }}>Feedback updated</TableCell>
              <TableCell sx={{ textAlign: 'right', paddingRight: '2rem' }}>Completed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.map((task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Fab
        onClick={handleClickOpen}
        sx={{ justifySelf: 'end', marginTop: '-80px', marginRight: '40px' }}
      >
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {!newTask ? <CreateTask/>
            : <AssignTask />}
        </DialogContent>
      </Dialog>
      </>
     
  );
}

export default Tasks;
