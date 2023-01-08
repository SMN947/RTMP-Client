import './App.css';
import React, { Component } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import AppHeader from './components/AppHeader/AppHeader';
import AppFooter from './components/AppFooter/AppFooter';
import { secondsToDhmsSimple } from "./tools/Util";
import StreamCard from './StreamCard/StreamCard';
import Grid from '@mui/material/Grid';

class App extends Component {

  state = {
    loading: false,
    streamsData: [],
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.setState({ loading: true });
    fetch('/api/streams', {
      credentials: 'include'
    }).then(function (response) {
      return response.json();
    }).then((data) => {
      let streamsData = [];
      let index = 0;
      for (let app in data) {
        for (let name in data[app]) {
          let stream = data[app][name].publisher;
          let clients = data[app][name].subscribers;
          if (stream) {
            let now = new Date().getTime() / 1000;
            let str = new Date(stream.connectCreated).getTime() / 1000;
            let streamData = {
              key: index++,
              app,
              name,
              id: stream.clientId,
              ip: stream.ip,
              ac: stream.audio ? stream.audio.codec + " " + stream.audio.profile : "",
              freq: stream.audio ? stream.audio.samplerate : "",
              chan: stream.audio ? stream.audio.channels : "",
              vc: stream.video ? stream.video.codec + " " + stream.video.profile : "",
              size: stream.video ? stream.video.width + "x" + stream.video.height : "",
              fps: stream.video ? Math.floor(stream.video.fps) : "",
              time: secondsToDhmsSimple(now - str),
              clients: clients.length
            };
            streamsData.push(streamData);
          }
        }
      }

      this.setState({
        loading: false,
        streamsData: streamsData,
      });
      // setTimeout(() => {
      //   this.setState({
      //     loading: false,
      //     streamsData,
      //   });
      // }, 10000);
    }).catch(e => {
      this.setState({
        loading: false,
      });
    });
  }

  render() {
    return (
      <>
        {this.state.loading}
        {
          (this.state.loading) ? <>

            <div className='center'>
              <CircularProgress />

              <p>Cargando...</p>
            </div>

          </> : <>
            <AppHeader />

            {(this.state.streamsData.length == 0) ? <p className='center'>No hay streams activos</p> :
              <Grid container className={"root"} spacing={16}>
                <Grid item xs={12}>

                  <Grid container className={"demo"} justify="flex-start" spacing={2}>
                    {
                      this.state.streamsData.map(stream => {
                        return <StreamCard key={stream.name} streamData={stream} elevation={4} />
                      })
                    }
                  </Grid>
                </Grid>
              </Grid>
            }


            <AppFooter />
          </>
        }
      </>
    )
  }
}

export default App;
