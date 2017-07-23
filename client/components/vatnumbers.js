import React from 'react';

class VatNumbers extends React.Component {

  render() {
    const {numbers} = this.props;
    if (numbers && numbers.length > 0) {
      return <div>VAT Numbers:
          {numbers.map((v,i) => <span key={i} style={{margin: '5px'}}>{v}</span>)}
      </div>;
    }
    return this.props.fetched ? <div>No VAT numbers found</div>: false;
  }

}

Error.propTypes = {
  numbers: React.PropTypes.array,
  fetched: React.PropTypes.bool
}


export default VatNumbers;