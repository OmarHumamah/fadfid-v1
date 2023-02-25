import * as React from "react";

import { Modal, Stack, Alert, Typography } from "@mui/material";

const alertStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,

  boxShadow: 24,
  p: 4,
};

export default function SuccessAlert(props) {
  return (
    <Modal open={props.openAlert} onClose={() => props.closeAlert()}>
      <Stack sx={alertStyle} spacing={2}>
        <Alert  severity="success" onClose={() => props.closeAlert(false)}>
          <Typography>{props.content}</Typography>
        </Alert>
      </Stack>
    </Modal>
  );
}
