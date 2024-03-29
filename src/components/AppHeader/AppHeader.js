import './AppHeader.css';
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

class AppHeader extends Component {
    state = {
        appConfig: new appConfig().getData()
    }

    render() {
        return (
            <AppBar position="static">
                <Toolbar disableGutters>

                    <Grid container>
                        <Grid item container xs={10} sx={{ px: 2 }}>
                            <MusicVideoOutlinedIcon sx={{ mr: 2, fontSize: 40 }} />
                            <Typography variant="h6" color="inherit" noWrap sx={{ fontSize: 25 }}>
                                {this.state.appConfig.appName}
                            </Typography>

                        </Grid>

                        <Grid item xs={2} sx={{ px: 2 }}>
                            <Tooltip title="Perfil" className="right" sx={{ pr: 15 }}>
                                <IconButton sx={{ p: 0 }}>
                                    <Avatar alt="Invitado" />
                                </IconButton>
                            </Tooltip>
                        </Grid>


                    </Grid>
                </Toolbar>
            </AppBar >
        )
    }
}

export default AppHeader;
