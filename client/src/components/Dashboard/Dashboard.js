import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
  return (
    <div>
      {props.auth.isAuthenticated ? (
        <div className="container valign-wrapper">
          <div className="row">
            <div className="col s12 center-align">
              <h4>
                <b>Hey there,</b> {props.auth.user.name.split(' ')[0]}
              </h4>
            </div>
          </div>
        </div>
      ) : (
        <Link to="/login" className="nav-link">
          Login
        </Link>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  logoutUser: () => dispatch(logoutUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
