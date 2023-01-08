import './AppFooter.css';
import React, { Component } from 'react';
import AppBar from '@mui/material/AppBar';
import MusicVideoOutlinedIcon from '@mui/icons-material/MusicVideoOutlined';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import appConfig from '../../appConfig';
import Button from '@mui/material/Button';

class AppFooter extends Component {
    state = {
        appConfig: new appConfig().getData()
    }

    render() {
        return (

            <Grid container>


            </Grid>
        )
    }
}

export default AppFooter;
