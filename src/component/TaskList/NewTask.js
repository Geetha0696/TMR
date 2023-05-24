import { Box, Grid, Modal, Typography } from '@mui/material'
import React from 'react'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
const NewTask = (props) => {
    const {open,setOpen}=props
  return (
    <div>
    <Modal
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 200 }}>
        <Grid container spacing={2}>
  <Grid item xs={12}>
  <Box component='h2'>New Task</Box>
  
  </Grid>
  
</Grid>
        </Box>
      </Modal>
  </div>
  )
}

export default NewTask