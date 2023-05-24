import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import style1 from './style.module.css'
import { Label } from '@mui/icons-material';
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
    const { open, setOpen } = props
    const [age, setAge] = React.useState('');
    return (
        <Box component='div'  >
            <Modal
                open={open}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }} className={style1.modalBox}>
                    <Box component='div' className={style1.container}>
                        <Box component='div' className={style1.gridHeader}>
                            <Box component='span'>New Task</Box>
                            <Button onClick={() => setOpen(false)}><CloseIcon /></Button>
                        </Box>
                        <Grid container sm={12} className={style1.gridBody}>
                            <Grid item sm={4} >
                                <div>Planned duration</div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={(e) => console.log(e.target.value)}
                                >
                                    <MenuItem value={1}>1h </MenuItem>
                                    <MenuItem value={2}>2h </MenuItem>
                                    <MenuItem value={3}>3h </MenuItem>
                                </Select>
                            </Grid>

                            <Grid item sm={4} >
                                <div>Project</div>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    onChange={(e) => console.log(e.target.value)}
                                >
                                    <MenuItem value={1}> React  </MenuItem>
                                    <MenuItem value={2}>Node.js </MenuItem>
                                    <MenuItem value={3}>Next.js </MenuItem>
                                </Select>
                            </Grid>
                            <Grid item sm={4} >
                                <div>Date</div>
                                <TextField disabled value={new Date()}></TextField>
                            </Grid>
                        </Grid>

                        < Grid item sm={12} >
                            <div>Title</div>
                            <TextField className={style1.title} ></TextField>
                        </Grid>
                        < Grid item sm={12}>
                            <div>Description</div>
                            <TextField multiline rows={5} className={style1.description}></TextField>
                        </Grid>
                    </Box>
                    < Grid item sm={12}>
                    <Button variant="contained">Submit</Button>
                        </Grid>
                </Box>
                

            </Modal>
        </Box>
    )
}

export default NewTask