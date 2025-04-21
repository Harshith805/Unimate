import { Box, CircularProgress, Container, LinearProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { APIAddress } from '../ApiVersion'
import JobDataTable from './components/JobDataTable';

const Tasks = () => {
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${APIAddress}/api/v1/tasks`, {
          method: "GET",
          headers: {
            "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl9pZCI6MiwiZXhwIjoxNzYwOTgwNDgxfQ.x6HpeiH-3U5girByflMR0pskpAOPFT-NNPcNQR6R3tg",
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          }
        });
        const data = await response.json();

        setTaskData(data.data.attributes.objects.data.map(item => {
          const attributes = item.attributes;
          const progressStatus = attributes.progress_status || {};

          // Return a new object with merged properties
          return {
            ...attributes,
            ...progressStatus,
          };
        }));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();

    // Set interval every 3 seconds
    const intervalId = setInterval(fetchTasks, 3000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Box>
      <Container maxWidth={false}>
        <LinearProgress />
        <JobDataTable
          taskData={taskData}
        />
      </Container>
    </Box>
  )
}

export default Tasks