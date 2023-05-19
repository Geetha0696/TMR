import React,{useState,useEffect} from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material";
const SnackBar = ({ open, message, onClose, severity}) => {
  const [snackBarOpen, setSnackBarOpen] = useState(open);

  useEffect(() => {
    setSnackBarOpen(open);
  }, [open]);
  const defaultclose=()=>{
    setSnackBarOpen(false);
  }
  

  if (message && open) {
    return (  
      <Snackbar 
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackBarOpen}
        autoHideDuration={6000}
        onClose={() =>{if(onClose!==null){onClose();}else{defaultclose();}} }
      >
        <Alert onClose={() => onClose()} severity={severity ? severity:"error"}>
          {message}
        </Alert>
      </Snackbar>
    );
  }

  return null;
};

export default SnackBar;
