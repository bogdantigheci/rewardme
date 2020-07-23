import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth';
import classnames from 'classnames';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      props.history.push('/');
    }
    if (props.error) {
      setError(props.error);
    }
  }, [props.auth.isAuthenticated, props.error, props.history]);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    props.loginUser(userData);
  };

  return (
    <div className="container">
      <div style={{ marginTop: '4rem' }} className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to
            home
          </Link>
          <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Login</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={error.email}
                id="email"
                type="email"
                className={classnames('', {
                  invalid: error.email || error.emailnotfound,
                })}
              />
              <label htmlFor="email">Email</label>
              <div className="red-text">
                {error.email}
                {error.emailnotfound}
              </div>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={error.password}
                id="password"
                type="password"
                className={classnames('', {
                  invalid: error.password || error.passwordincorrect,
                })}
              />
              <label htmlFor="password">Password</label>
              <div className="red-text">
                {error.password}
                {error.passwordincorrect}
              </div>
            </div>
            <div className="col s12" style={{ paddingLeft: '11.250px' }}>
              <button
                style={{
                  width: '150px',
                  borderRadius: '3px',
                  letterSpacing: '1.5px',
                  marginTop: '1rem',
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: (userData) => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
