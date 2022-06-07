import {createContext, useState, useEffect} from 'react';

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [colors, setColors] = useState();

  const palette = {
    blue: {
      dark: 'hsl(212, 66%, 27%)',
      mid: 'hsl(212, 66%, 47%)',
      light: 'hsl(212, 66%, 67%)',
    },
    grey: {
      dark: 'hsl(200, 18%, 16%)',
      mid: 'hsl(200, 18%, 46%)',
      light: 'hsl(200, 18%, 96%)',
    },
    assigned: 'hsl(49, 97%, 49%)',
    feedbackRequested: 'hsl(31, 98%, 60%)',
    feedbackUpdated:'hsl(7, 93%, 64%)',
    completed:'hsl(149, 71%, 51%)',
    msgColors: ['hsl(49, 97%, 90%)', 'hsl(31, 98%, 90%)', 'hsl(7, 93%, 90%)', 'hsl(149, 71%, 90%)', 'hsl(212, 66%, 90%)']
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'assigned':
        return palette.assigned;
      case 'feedback requested':
        return palette.feedbackRequested;
      case 'feedback updated':
        return palette.feedbackUpdated;
      case 'completed':
        return palette.completed;
      default:
        break;
    }
  }
  

  const getMsgColor = (id) => {
    return palette.msgColors[id % 5]
  }

  const btn = {
    color: palette.blue.mid,
    variant: 'contained',
    width: 'fit-content'
  }

  useEffect(() => {
     setColors(palette)
  },[])
 

  return (
    <AppContext.Provider
      value={{
        colors, getStatusColor, btn, getMsgColor
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;