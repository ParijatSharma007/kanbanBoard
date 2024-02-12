import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button, Dialog, DialogTitle } from "@mui/material";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalInterface{
    open : boolean,
    handleClose : any,
    error : string
}

const ErrorDialog = ({error, handleClose, open} : ModalInterface) => {

    return (
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <Box sx={{padding : "20px"}}>
            <Typography variant="h3">{error}</Typography>
          </Box>
        </Dialog>
    );
}

export default ErrorDialog
