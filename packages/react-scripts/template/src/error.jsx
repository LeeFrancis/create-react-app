/* eslint-disable react/no-danger */
import * as React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(info, error) {
    // Display fallback UI
    this.setState({ hasError: true, info, error });
  }

  render() {
    const { team, children } = this.props;
    const { info, error, hasError } = this.state;
    if (hasError) {
      return (
        <div>
          <h1 level="1">Something went wrong.</h1>
          <div>{info.message}</div>
          <div>{JSON.stringify(error).replace(/\\n/g, ' ')}</div>
          <h1 level="4">{team ? `and its ${team} fault!!!` : ''}</h1>
        </div>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  team: PropTypes.string,
};

ErrorBoundary.defaultProps = {
  team: undefined,
};

export default ErrorBoundary;
