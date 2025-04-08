import { Box, Container, IconButton, Grid, Button, Snackbar, Alert, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Table from "./components/Table"
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { APIAddress } from '../ApiVersion';

const Templates = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState();
  const [tableData, setTableData] = useState([]);
  const [clickedCreate, setClickedCreate] = useState(false);
  const [snackBarInfo, setSnackBarInfo] = useState();
  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch(`${APIAddress}/api/v1/templates`,
      {
        method: "GET",
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl9pZCI6MiwiZXhwIjoxNzYwOTgwNDgxfQ.x6HpeiH-3U5girByflMR0pskpAOPFT-NNPcNQR6R3tg",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        }
      })
      .then(response => response.json())
      .then(result => {
        setTableData(result.data.attributes.objects.data.map(keys => keys.attributes));
        setSnackBarInfo({open: true, severity: "success", message: result.data.attributes.summary});
        setIsLoading(false);
      })
  }, [])

  return (
    <Box>
      <Container maxWidth={false}>
      {isLoading ? <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        bgcolor: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(5px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <CircularProgress open={false} />
    </Box> :
        <Grid container lg={12} md={12} xl={12}>
          <Grid item lg={12} md={12} xl={12} style={{ textAlign: 'right' }}>
            <Button
              variant="contained"
              style={{ background: 'green', color: 'white' }}
              onClick={() => {
                console.log(formData)
                setFormData({});
                setOpen(prevState => !prevState);
                setClickedCreate(true);
              }}
            >
              Create
            </Button>
            <IconButton
              onClick={() => {
                setFormData({});
                setOpen(prevState => !prevState);
                setClickedCreate(true);
              }}
            >
              <LocalHospitalIcon fontSize='large' style={{ color: 'white' }} />
            </IconButton>
          </Grid>
          <Table open={open} setIsLoading={setIsLoading} setSnackBarInfo={setSnackBarInfo} setOpen={setOpen} tableData={tableData} setTableData={setTableData} formData={formData} setFormData={setFormData} clickedCreate={clickedCreate} setClickedCreate={setClickedCreate} />
        </Grid>}
        <Snackbar
        open={snackBarInfo?.open}
        autoHideDuration={3000}
        onClose={() => setSnackBarInfo({...snackBarInfo, open: false})}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackBarInfo({...snackBarInfo, open: false})}
          severity={snackBarInfo?.severity}
          sx={{ width: "100%" }}
        >
          {snackBarInfo?.message}
        </Alert>
      </Snackbar>
      </Container>
    </Box>
  )
}

export default Templates