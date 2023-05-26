import { Box, Grow, Fade, Backdrop, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import style from '@/styles/global.module.css'

const NewTask = (props) => {
    const { open, setOpen, title, children, size } = props
    var defaulSize = size || 900;

    return (
        <Backdrop open={open} TransitionComponent={Fade} transitionDuration={600} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Box className={style.modalBox}>
                <Grow in={open} {...(open ? { timeout: 600 } : {})}>
                    <Box sx={{ width: { xs: Math.floor(defaulSize / 3), sm: Math.floor(defaulSize - (defaulSize / 3)), md: defaulSize } }} className={style.modalBoxInner}>
                        <Box className={style.modalHeader}>
                            <Typography component='h3'>{title}</Typography>
                            <Close onClick={() => setOpen(false)} />
                        </Box>

                        <Box sx={{ textAlign: "left", paddingTop: '20px', overflow: 'auto', height: "75%", maxHeight: '74vh' }}>
                            {children}
                        </Box>
                    </Box>
                </Grow>
            </Box>
        </Backdrop >
    )
}

export default NewTask