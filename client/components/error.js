import React from 'react';

class Error extends React.Component {

  render() {
    if (this.props.msg) {
      return <div>Error: {this.props.msg}</div>;
    }
    return false;
  }

}

Error.propTypes = {
  msg: React.PropTypes.string
}


export default Error;