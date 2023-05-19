import { Box, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import React from 'react'
import style from '../task/task.module.scss'
import SettingsIcon from '@mui/icons-material/Settings';
import HelpIcon from '@mui/icons-material/Help';
import { TabPanel,a11yProps } from '@/component/Dashboard';
import TocOutlinedIcon from '@mui/icons-material/TocOutlined';
import ViewWeekTwoToneIcon from '@mui/icons-material/ViewWeekTwoTone';
import GridOnIcon from '@mui/icons-material/GridOn';
import SegmentIcon from '@mui/icons-material/Segment';
import BasicTable from '@/component/TaskList/tasklist';
const task = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };
    return (
        <Box component="div" className={style.taskpage} >
            <Grid container rowSpacing={1}>
                <Grid container xs={12}>
                    <Grid item xs={6}>  <Box component="h3" > Tasks  ›  Timesheet  ›
                        My Timesheet
                    </Box>
                    </Grid>
                    <Grid className={style.setting} item xs={6}><SettingsIcon /><Box component="p" > Settings
                    </Box><HelpIcon /><Box component="p" > Help
                        </Box>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    {/* <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab icon={<TocOutlinedIcon/>} iconPosition="start" label="Task List" {...a11yProps(0)} />
                        <Tab icon={<ViewWeekTwoToneIcon/>}  iconPosition="start" label="Task board" {...a11yProps(1)} />
                        <Tab icon={<GridOnIcon/>} iconPosition="start" label="Timesheet" {...a11yProps(2)} />
                        <Tab icon={<SegmentIcon/>} iconPosition="start" label="Task bundles" {...a11yProps(3)} />
                    </Tabs> */}
                </Grid>
                <Grid item xs={6}>
                </Grid>
            </Grid>
            {/* <TabPanel value={value} index={0} dir={theme.direction}>
                Item One
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                Item Two
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                Item Three
            </TabPanel> */}
            <BasicTable/>
                    </Box>

    )
}


export default task