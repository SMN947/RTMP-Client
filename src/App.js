import './App.css';
import React, { Component } from 'react';
import { Spin } from 'antd';
import AppHeader from './components/AppHeader/AppHeader';

class App extends Component {

  state = {
    loading: false,
  };

  componentDidMount() {
    this.setState({
      loading: false
    })
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
            <AppHeader />
          </>
        }
      </>
    )
  }
}

export default App;
