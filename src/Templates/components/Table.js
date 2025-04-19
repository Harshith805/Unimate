import * as React from 'react';
import { Box, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogBox from './DialogBox';
import { useState } from 'react';
import { useEffect } from 'react';
import { APIAddress } from '../../ApiVersion';

export default function Table({ open, setOpen, setIsLoading, setSelectedRowIds, clickedCreatedIssues, setClickedCreatedIssues, formData1, setFormData1, formDummyData, setFormDummyData, tableData, setSnackBarInfo, setTableData, formData, setFormData, clickedCreate, setClickedCreate }) {
  const [rows, setRows] = useState();

  useEffect(() => {
    setRows(tableData);
  },[tableData]);

  // Handle row click for edit
  const handleCellClick = (params) => {
    if(params.field !== "Action" && params.field !== "__check__") {
      setOpen(true);
      setFormData({...params.row, threat_scope: params.row?.threat_scope ? params.row?.threat_scope : "Internal Production"});
      setClickedCreate(false);
    }
  };

  // Handle row deletion
  const handleDeleteRow = (id) => {
    setIsLoading(true);
    fetch(`${APIAddress}/api/v1/templates/${id}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": "eyJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl9pZCI6MiwiZXhwIjoxNzYwOTgwNDgxfQ.x6HpeiH-3U5girByflMR0pskpAOPFT-NNPcNQR6R3tg",
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "69420",
        }
      })
      .then(response => response.json())
      .then(result => {
        setTableData(prevValue => prevValue.filter(keys => keys.id != id));
        setSnackBarInfo({ open: true, severity: "success", message: result.data.attributes.summary });
        setOpen(false);
        setIsLoading(false);
      })
  };

  // Define table columns
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'summary', headerName: 'Summary', width: 150, editable: true },
    { field: 'description', headerName: 'Description' },
    { field: 'detection_method', headerName: 'Detection Method', width: 150, editable: true },
    { field: 'scanner_detection', headerName: 'Scanner Detection', width: 215, editable: true },
    { field: 'owasp', headerName: 'OWASP', width: 215, editable: true },
    { field: 'threat_category', headerName: 'Threat Category', width: 150, editable: true },
    { field: 'impact_type', headerName: 'Impact Type', width: 100, editable: true },
    { field: 'impact', headerName: 'Impact', width: 200, editable: true },
    { field: 'cwe_id', headerName: 'CWE ID', width: 100, editable: true },
    { field: 'threat_scope', headerName: 'Threat Scope', width: 150, editable: true },
    { field: 'cvss_score', headerName: 'CVSS Score', width: 225, editable: true },

    // Add a Delete column with a delete button
    {
      field: 'Action',
      headerName: 'Action',
      width: 60,
      sortable: false,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleDeleteRow(params.row.id)}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
          columns: {
          columnVisibilityModel: {
            id: false,
            description: false,
          },
        }
        }}
        checkboxSelection
        disableRowSelectionOnClick
        pageSizeOptions={[5]}
        onCellClick={handleCellClick}
        onRowSelectionModelChange={(newSelection) => {
          setSelectedRowIds(newSelection); // stores selected row IDs
        }}
        sx={{
          '& .MuiCheckbox-root': {
            color: 'gray', // unchecked color
          },
          '& .Mui-checked': {
            color: 'skyblue !important', // checked/tick color
          },
        }}
      />

      <DialogBox
        open={open}
        setOpen={setOpen}
        setTableData={setTableData}
        setSnackBarInfo={setSnackBarInfo}
        setIsLoading={setIsLoading}
        formData={formData}
        setFormData={setFormData}
        clickedCreate={clickedCreate}
        clickedCreatedIssues={clickedCreatedIssues}
        setClickedCreatedIssues={setClickedCreatedIssues}
        formData1={formData1}
        setFormData1={setFormData1}
        formDummyData={formDummyData}
        setFormDummyData={setFormDummyData}
        handleDeleteRow={handleDeleteRow}
      />
    </Box>
  );
}
