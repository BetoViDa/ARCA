import React, { Component } from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Toolbar from './components/Toolbar/Toolbar';

import AboutUs from './pages/AboutUs/AboutUs';
import Inicio from './pages/Inicio/Inicio';
import PerfilAdmin from './pages Admin/PerfilAdmin/PerfilAdmin';
import Ranking from './pages/Ranking/Ranking';
import Directorio from './pages Admin/Directorio/Directorio';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Backdrop from './components/Backdrop/Backdrop';

class App extends Component {

  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });

  };

  render() {

    let backdrop;

    if (this.state.sideDrawerOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />
    }

    return (
      <div style={{ height: '100%' }}>
        <Router>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backdrop}
          <main style={{ marginTop: '5%' }}>
          </main>
          <Routes>
            <Route exact path='/' element={<Inicio />} />
            <Route path='/profile-admin' element={<PerfilAdmin />} />
            <Route path='/ranking' element={<Ranking />} />
            <Route path='/directorio' element={<Directorio />} />
            <Route path='/about-us' element={<AboutUs />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;