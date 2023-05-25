import { Box, Button, Grow, Grid, MenuItem, Modal, Select, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import style from './style.module.css'

const NewTask = (props) => {
    const { open, setOpen } = props
    const [openTran, setOpenTran] = useState(false)
    const [age, setAge] = useState('');

    useEffect(() => {
        if (open == true)
            setOpenTran(open)
    }, [open])
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Box className={style.modalBox}>
                <Grow in={openTran}
                    {...(openTran ? { timeout: 800 } : {})}>
                    <Box sx={{ width: { xs: 500, md: 800, md: 900 } }} className={style.modalBoxInner}>
                        <Box className={style.modalHeader}>
                            <h3>New Task</h3>
                            <Close onClick={() => {
                                setOpenTran(false);
                                setTimeout(() => {
                                    setOpen(false)
                                }, 200);
                            }} />
                        </Box>

                        <Box sx={{ textAlign: "left", paddingTop: '20px', overflow: 'auto', height: "75%", maxHeight: '74vh' }}>
                            <Grid container sm={12} className={style.gridBody}>
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
                                <TextField className={style.title} ></TextField>
                            </Grid>
                            < Grid item sm={12}>
                                <div>Description</div>
                                <TextField multiline rows={5} className={style.description}></TextField>
                            </Grid>
                            < Grid item sm={12}>
                                <Button variant="contained">Submit</Button>
                            </Grid>
                        </Box>
                    </Box>
                </Grow>
            </Box>
        </Modal>
    )
}

export default NewTask