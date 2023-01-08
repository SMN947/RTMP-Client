import './App.css';
import React, { Component } from 'react';
import { Icon, Card, Table, Modal, Input } from "antd";
import { secondsToDhmsSimple } from "../tools/Util";
import Flvplayer from "../tools/Flvplayer";
import { Spin } from 'antd';
// import Cookies from 'universal-cookie';
import md5 from 'js-md5';

class App extends Component {

  state = {
    streamsData: [],
    loading: false,
    visible: false,
    password: ''
  };

  columns = [{
    title: 'App',
    dataIndex: 'app',
    key: 'app',
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (name, record) => {
      return <a href="##" onClick={() => this.openVideo(record)}>{name}</a>;
    }
  }, {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  }, {
    title: 'IP',
    dataIndex: 'ip',
    key: 'ip',
  }, {
    title: 'Audio',
    children: [{
      title: 'codec',
      dataIndex: 'ac',
      key: 'ac',
    }, {
      title: 'freq',
      dataIndex: 'freq',
      key: 'freq',
    }, {
      title: 'chan',
      dataIndex: 'chan',
      key: 'chan',
    },
    ]
  }, {
    title: 'Video',
    children: [{
      title: 'codec',
      dataIndex: 'vc',
      key: 'vc',
    }, {
      title: 'size',
      dataIndex: 'size',
      key: 'size',
    }, {
      title: 'fps',
      dataIndex: 'fps',
      key: 'fps',
    },]
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  }, {
    title: 'Clients',
    dataIndex: 'clients',
    key: 'clients',
  }];

  openVideo = (record) => {
    let sign = '';
    if (this.state.password) {
      let hash = md5.create();
      let ext = Date.now() + 30000;
      hash.update(`/${record.app}/${record.name}-${ext}-${this.state.password}`);
      let key = hash.hex();
      sign = `?sign=${ext}-${key}`;
    }
    this.videoModal = Modal.info({
      icon: null,
      title: "Video Player",
      width: 640,
      height: 480,
      content: <Flvplayer url={`/${record.app}/${record.name}.flv${sign}`} type="flv" />,
    });
  }

  fetch = () => {
    this.setState({ loading: true });
    fetch('/api/streams', {
      credentials: 'include'
    }).then(function (response) {
      // console.log(response)
      return response.json();
    }).then((data) => {
      console.log(data);
      // Read total count from server
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
        streamsData,
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

  componentDidMount() {
    this.fetch();
  }

  render() {
    return (
      <>
        {this.state.loading}
        {
          (this.state.loading) ? <>

            <div className='center'>
              <Spin className='center2' />
              <p>Cargando...</p>
            </div>

          </> : <>
            <Table
              dataSource={this.state.streamsData}
              columns={this.columns}
              loading={this.state.loading}
              bordered
              small
              pagination={false}
            />
          </>
        }
      </>
    )
  }
}

export default App;
