import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from 'react';
import Collapse from '@mui/material/Collapse';
import TaskDetails from './TaskDetails';

function TaskRow({ task }) {
  const [open, setOpen] = useState(false);
  const { name, id, "Assigned": assigned, "Feedback requested": feedbackRequested, "Feedback updated": feedbackUpdated, "Completed": completed} = task
  
  return (
    <>
      <TableRow sx={{ border: 'none' }}>
        <TableCell sx={{ paddingLeft: '2rem', border: 'none' }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell className="name" sx={{ border: 'none' }}>
          {name}
        </TableCell>
        <TableCell sx={{ textAlign: 'right', border: 'none' }}>{assigned ? assigned.length : 0}</TableCell>
        <TableCell sx={{ textAlign: 'right', border: 'none' }}>{feedbackRequested ? feedbackRequested.length : 0}</TableCell>
        <TableCell sx={{ textAlign: 'right', border: 'none' }}>{feedbackUpdated ? feedbackUpdated.length : 0}</TableCell>
        <TableCell sx={{ textAlign: 'right', border: 'none', paddingRight: '2rem' }}>{completed ? completed.length : 0}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <TaskDetails task={task} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

export default TaskRow;
