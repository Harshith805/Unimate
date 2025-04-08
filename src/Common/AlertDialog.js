import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { withStyles } from "@mui/styles";
import MuiDialog from "@mui/material/Dialog";
import { useStateValue } from "../StateProvider";

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle style={{ color: "red" }} sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "#AAAFB2",
          }}
        ></IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const WhiteTextTypography = withStyles({
  root: {
    color: "#aaafb2",
  },
})(Typography);

const AlertDialog = ({
  open,
  message,
  api = "",
  handleonclick = "",
  handleondelete = "",
  title
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [{ theme }, dispatch] = useStateValue();

  useEffect(() => {  
  }, [theme]);
  useEffect(() => {
    setOpenDialog(open);
  }, [open]);

  const handleClose = () => {
    setOpenDialog(false);
    if (handleonclick != "") {
      handleonclick(false);
    }
    if (api == "HomePage") {
      window.location.href = "/";
    }
  };

  const handleDelete = () => {
    handleondelete(true);
    setOpenDialog(false);
    if (handleonclick != "") {
      handleonclick(false);
    }
    if (api == "HomePage") {
      window.location.href = "/";
    }
  };

  return (
    <div>
      {openDialog && (
        <Dialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={openDialog}
          PaperProps={{
            sx: {
              width: "30%",
              maxHeight: 300,
              color: theme == "darkTheme" ? "#d1d6da" :"#808080",
            },
          }}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
            style={{                
            color: theme == "darkTheme" ? "#e4551f" :"#787878",
            background: theme == "darkTheme" ? "#323639" :"#aaafb22e",
           
          }}
          >
            {title}
          </BootstrapDialogTitle>
          <DialogContent
            dividers
            style={{ 
              background: theme == "darkTheme" ? "#323639" :"#aaafb22e",
              padding: "16px" }}
          >
            <WhiteTextTypography style={{ color:"#787878"}} gutterBottom>{message}</WhiteTextTypography>
          </DialogContent>
          <DialogActions style={{            
            background: theme == "darkTheme" ? "#323639" :"#aaafb22e",
          }}>
            {(message == "Do you want to delete this comment?" || message == "Do you want to move Data from Beta to Production?") ? (
              <>
                <Button
                  autoFocus
                  onClick={handleDelete}
                  style={{ backgroundColor: "#e4551f", color: "#e3ebef" }}
                >
                  Yes
                </Button>
                <Button
                  autoFocus
                  onClick={handleClose}
                  style={{ backgroundColor: "#e4551f", color: "#e3ebef" }}
                >
                  No
                </Button>
              </>
            ) : (
              <Button
                autoFocus
                onClick={handleClose}
                style={{ backgroundColor: "#e4551f", color: "#e3ebef" }}
              >
                Ok
              </Button>
            )}
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default React.memo(AlertDialog);
