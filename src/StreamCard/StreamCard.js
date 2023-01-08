import React from "react";
import "./StreamCard.css"
import { Component } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Flvplayer from "./../tools/Flvplayer";
import { Modal } from "antd";

class StreamCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ...props.streamData
        }
    }

    openVideo(record) {
        let sign = '';
        this.videoModal = Modal.info({
            icon: null,
            title: "Video Player",
            width: 640,
            height: 480,
            content: <Flvplayer url={`/${record.app}/${record.name}.flv${sign}`} type="flv" />,
        });
    }

    render() {
        return (
            <Grid key={this.state.name} item xs={12} md={4} xl={3}>
                <Card>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {this.state.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" className="code">
                            asfsd
                            <Button onClick={this.openVideo(this.state)}>Ver Stream</Button>
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
}

export default StreamCard;