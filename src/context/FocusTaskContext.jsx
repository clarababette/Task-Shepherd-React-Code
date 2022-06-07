import {createContext, useState, useEffect} from 'react';
import AxiosInstance from '../AxiosInstance';

const FocusTaskContext = createContext({});

export const FocusTaskProvider = ({ children }) => {
  const axios = AxiosInstance();
  const [focusTask, setFocusTask] = useState();
  const [focusTaskID, setFocusTaskID] = useState();
  const [comments, setComments] = useState();
  const [update, setUpdate] = useState(false);
  const [latestFeedback, setLatestFeedback] = useState();
  const [viewAllFeedback, setViewAllFeedback] = useState();
  const [urlEdit, setUrlEdit] = useState(false);
  const [sent, setSent] = useState()

  
  useEffect(async () => {
    if (focusTaskID || update) {
      await axios.get(`/task/coder/${focusTaskID}`).then((res) => {
        setFocusTask(res.data);
        setUpdate(false);
      });
    }
    }, [focusTaskID, update]);

  useEffect(async () => {
    if (focusTaskID || update) {
      await axios.get(`/task/${focusTaskID}/comments`).then((res) => {
        if (res.data.length > 0) {
          setComments(res.data);
        } else {
          setComments(undefined);
        }
        setUpdate(false);
      });
    }
  }, [focusTaskID, update]);
  
  useEffect(() => {
    if (comments) {   
      setLatestFeedback(comments.find(
                    (comment) => comment.first_name != undefined,
                  ))
    } else {
      setLatestFeedback(undefined)
    }
  }, [comments,focusTaskID, update])
  

  useEffect(() => {
    setViewAllFeedback(false)
    setUrlEdit(false)
    setLatestFeedback();
    setSent()
  },[focusTaskID])

  return (
    <FocusTaskContext.Provider
      value={{
        focusTask, setFocusTask, focusTaskID, setFocusTaskID, comments, setUpdate, latestFeedback,
        viewAllFeedback, setViewAllFeedback, urlEdit, setUrlEdit, sent, setSent
      }}
    >
      {children}
    </FocusTaskContext.Provider>
  );
};

export default FocusTaskContext;
