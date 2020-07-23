import React from 'react';
import Header from '../components/Layout/Header/Header';
import SideDrawer from '../components/Layout/SideDrawer/SideDrawer';
import Backdrop from '../components/Layout/Backdrop/Backdrop';
import Footer from '../components/Layout/Footer/Footer';
import Dashboard from '../components/Dashboard/Dashboard';
import Register from '../components/Auth/Register';
import Login from '../components/Auth/Login';
import { Route, withRouter } from 'react-router-dom';

const App = () => {
  const [sideDrawerOpen, setSideDrawerOpen] = React.useState(false);

  const drawerToggleClickHandler = () => {
    setSideDrawerOpen(!sideDrawerOpen);
  };

  const backdropClickHandler = () => {
    setSideDrawerOpen(false);
  };
  let backdrop;
  if (sideDrawerOpen) {
    backdrop = <Backdrop click={backdropClickHandler} />;
  }
  return (
    <div>
      <Header
        show={sideDrawerOpen}
        drawerClickHandler={drawerToggleClickHandler}
      />
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <SideDrawer show={sideDrawerOpen} />
      {backdrop}
      <Footer />
    </div>
  );
};

export default withRouter(App);
