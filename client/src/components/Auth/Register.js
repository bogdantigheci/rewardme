import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import classnames from 'classnames';

const Register = (props) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState({});

  useEffect(() => {
    setError(props.error);
  }, [props.error]);

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      email: email,
      password: password,
      company: company,
    };
    props.registerUser(newUser, props.history);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s8 offset-s2">
          <Link to="/" className="btn-flat waves-effect">
            Back to home
          </Link>
          <div className="col s12" style={{ paddingLeft: '11.250px' }}>
            <h4>
              <b>Register</b> below
            </h4>
            <p className="grey-text text-darken-1">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
          <form noValidate onSubmit={onSubmit}>
            <div className="input-field col s12">
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                error={error.name}
                id="name"
                type="text"
                className={classnames('', {
                  invalid: error.name,
                })}
              />
              <label htmlFor="name">Name</label>
              <div className="red-text">{error.name}</div>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setCompany(e.target.value)}
                value={company}
                error={error.company}
                id="company"
                type="text"
                className={classnames('', {
                  invalid: error.name,
                })}
              />
              <label htmlFor="name">Company</label>
              <div className="red-text">{error.company}</div>
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={error.email}
                id="email"
                type="email"
                className={classnames('', {
                  invalid: error.email,
                })}
              />
              <label htmlFor="email">Email</label>
              {error ? <p className="red-text">{error.email}</p> : null}
            </div>
            <div className="input-field col s12">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={error.password}
                id="password"
                type="password"
                className={classnames('', {
                  invalid: error.password,
                })}
              />
              <label htmlFor="password">Password</label>
              <div className="red-text">{error.password}</div>
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
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
  registerUser: (userData, history) =>
    dispatch(registerUser(userData, history)),
});

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  error: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
