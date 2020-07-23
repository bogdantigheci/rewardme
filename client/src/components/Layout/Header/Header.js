import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Link as RLink } from 'react-router-dom';
import { logoutUser } from '../../../actions/auth';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import DrawerToggleButton from '../SideDrawer/DrawerToggleButton';

const toolbar = (props) => {
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const onLogoutClick = (e) => {
    e.preventDefault();
    props.logoutUser();
  };
  return (
    <header className="navbar wrap nav_section">
      <nav
        className="navbar navbar-b navbar-reduce navbar-expand-md fixed-top"
        id="mainNav"
      >
        <div className="container-fluid toolbar">
          <div className="toolbar__toggle-button">
            <DrawerToggleButton
              sideDrawerOpen={props.show}
              click={props.drawerClickHandler}
            />
          </div>
          <div className="toolbar__logo">
            <Link
              onClick={scrollToTop}
              to="top"
              className="navbar-brand js-scroll logo"
            >
              Some <span className="logo_title"> Title</span>
            </Link>
          </div>
          <div className="spacer" />
          <div className="toolbar_navigation-items">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="scroll#" smooth className="nav-link js-scroll">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link to="scroll#" smooth className="nav-link js-scroll">
                  Work
                </Link>
              </li>
              <li className="nav-item">
                <Link to="scroll#" smooth className="nav-link js-scroll">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                {!props.auth.isAuthenticated ? (
                  <RLink to="/login" className="nav-link">
                    Login
                  </RLink>
                ) : (
                  <Link
                    to="scroll#"
                    className="nav-link"
                    onClick={onLogoutClick}
                  >
                    Logout
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

toolbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(toolbar);
