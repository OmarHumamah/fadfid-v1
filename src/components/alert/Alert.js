import * as React from "react";

import { Modal, Stack, Button, Alert, Typography } from "@mui/material";

const alertStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  //   bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ActionAlert(props) {
  return (
    <Modal open={props.openAlert} onClose={() => props.closeAlert()}>
      <Stack sx={alertStyle} spacing={2}>
        <Alert  severity="warning" onClose={() => props.closeAlert(false)}>
          <Typography>{props.content}</Typography>
          <Button onClick={()=>props.action()} color="inherit" size="small">
            Confirm
          </Button>
          <Button onClick={() => props.closeAlert()} color="inherit" size="small">
            Cancel
          </Button>
        </Alert>
      </Stack>
    </Modal>
  );
}
