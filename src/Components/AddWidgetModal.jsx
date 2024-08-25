import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React from "react";

const AddWidgetModal = ({
  open,
  handleClose,
  handleAddWidget,
  setNewWidgetName,
  setNewWidgetText,
  newWidgetName,
  newWidgetText,
}) => {
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        position="absolute"
        top="30%"
        left="30%"
        transform="translate(-50%, -50%)"
        bgcolor="background.paper"
        p={4}
        borderRadius={2}
        boxShadow={24}
        width={400}
      >
        <Typography variant="h6" mb={2}>
          Add New Widget
        </Typography>
        <TextField
          fullWidth
          label="Widget Name"
          value={newWidgetName}
          onChange={(e) => setNewWidgetName(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Widget Text"
          value={newWidgetText}
          onChange={(e) => setNewWidgetText(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddWidget}>
            Add Widget
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddWidgetModal;
