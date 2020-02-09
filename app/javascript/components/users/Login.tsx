import React, { Component } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { AppState } from '../../store/types';
import { loginAction } from '../../store/actions/users';

const mapStateToProps = (state: AppState) => {
  return {
    csrf: state.csrf
  }
}

const mapDispatchToProps = {
  loginAction,
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

function LoginComp(props: PropsFromRedux) {
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required("Username cannot be empty"),
    password: Yup.string().required("Password cannot be empty")
  })
  
  return (
    <>
      <h3>Login</h3>
      <Formik
        initialValues={{ username: "", password: "", authenticity_token: props.csrf }}
        onSubmit={values => props.loginAction(values)}
        validationSchema={LoginSchema}
      >

        {formik => (
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <ErrorMessage name="username">
                {msg => <div className="alert alert-warning">{msg}</div>}
              </ErrorMessage>
              <ErrorMessage name="password">
                {msg => <div className="alert alert-warning">{msg}</div>}
              </ErrorMessage>
            </div>

            <div className="form-group">
              <label>Username:</label>
              <input type="text" className="form-control"
                name="username" placeholder="Enter username"
                onChange={formik.handleChange} />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input type="password" className="form-control"
                name="password" placeholder="Enter password"
                onChange={formik.handleChange} />
            </div>

            <button type="submit" className="btn btn-dark mr-3">Login</button>

          </form>
        )}

      </Formik>

    </>
  );
}

const Login = connector(LoginComp);
export default Login;
