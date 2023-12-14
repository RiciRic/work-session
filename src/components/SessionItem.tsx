import React, { useEffect } from "react";

import { Modal, Box, Collapse } from "@mui/material";

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

function SessionItem(props: Props) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <>
      <Modal open={props.open} onClose={handleClose}>
        <Collapse in={props.open}>
          <Box sx={{ borderRadius: "50px", backgroundColor: "white" }}>
            hallo
          </Box>
        </Collapse>
      </Modal>
    </>
  );
}

export default SessionItem;
