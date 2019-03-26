import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { login } from '../../services/auth';
import PropTypes from 'prop-types';

export const withSession = Component => {
  class WithSession extends PureComponent {
    static propTypes = {
      token: PropTypes.func
    }
    componentDidMount() {
      if(!this.props.token) {
        login();
      }
    }

    render() {
      if(!this.props.token) return <h1>LOADING</h1>;
      return <Component {...this.props} />;
    }
  }

  const mapStateToProps = state => ({
    token: state.auth.token
  });

  return connect(
    mapStateToProps
  )(WithSession);
};
