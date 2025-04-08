import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

const CoverPage = () => {
  const history = useHistory();

  return (
    <Box
      sx={{
        width: "calc(100vw-60px)",
        height: "100vh",
        bgcolor: "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
        px: 2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "-20%",
          left: "-20%",
          width: "150%",
          height: "150%",
          background: "radial-gradient(circle, rgba(34,193,195,0.2) 0%, rgba(0,0,0,0.8) 100%)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />

      <Typography
        variant="h2"
        sx={{
          fontWeight: 700,
          zIndex: 1,
          color: "#22d3ee",
        }}
      >
        Welcome to UNIMATE
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: 600,
          mt: 2,
          fontSize: "1.2rem",
          zIndex: 1,
        }}
      >
        Your intelligent companion for process automation. Streamline tasks, boost productivity,
        and simplify your workflow — all in one place.
      </Typography>

      <Box sx={{ mt: 4, zIndex: 1 }}>
        <Button
          variant="contained"
          onClick={() => history.push("/templates")}
          sx={{
            backgroundColor: "#06b6d4",
            color: "#000",
            px: 4,
            py: 1.5,
            fontSize: "1rem",
            borderRadius: 4,
            textTransform: "none",
            '&:hover': {
              backgroundColor: "#22d3ee",
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default CoverPage;