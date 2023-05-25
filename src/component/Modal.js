import { Box, Grow, Fade, Backdrop, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';
import style from '@/styles/global.module.css'

const NewTask = (props) => {
    const { open, setOpen, title, children, size } = props

    return (
        <Backdrop open={open} TransitionComponent={Fade} transitionDuration={600} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Box className={style.modalBox}>
                <Grow in={open} {...(open ? { timeout: 600 } : {})}>
                    <Box sx={{ width: { xs: (size || 900) - 600, sm: (size || 900) - 300, md: size || 900 } }} className={style.modalBoxInner}>
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