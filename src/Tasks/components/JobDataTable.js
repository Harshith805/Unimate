import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, LinearProgress, Typography, Chip } from "@mui/material";
import { APIAddress } from "../../ApiVersion";

function LinearProgressWithLabel(props) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "90%",
          position: "relative",
        }}
      >
        <LinearProgress
          variant="determinate"
          value={props.value}
          sx={{
            height: 24,
            borderRadius: 6,
            backgroundColor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              borderRadius: 6,
              backgroundColor: props.value === 100 ? "#4caf50" : "#1976d2",
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#000",
            fontWeight: "bold",
            fontSize: "0.75rem",
            textShadow: "0 0 2px rgba(0,0,0,0.5)",
          }}
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
};

export default function JobDataTable(props) {
  const columns = [
    {
      field: "job_name",
      headerName: "Job Name",
      width: 200,
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        const value = params?.value?.toLowerCase();
        const color =
          value === "complete"
            ? "success"
            : value === "failed"
            ? "error"
            : "default";
  
        return <Chip label={params.value} color={color} variant="outlined" />;
      },
    },
    {
      field: "percentage",
      headerName: "Progress",
      width: 400,
      renderCell: (params) => {
        return (
          <LinearProgressWithLabel value={params.value}/>
        );
      },
    },  
    {
      field: "created_at",
      headerName: "Created At",
      width: 200,
    },
  ];

  return (
      <DataGrid
        rows={props.taskData}
        columns={columns}
        pageSize={5}
      />
  );
};
