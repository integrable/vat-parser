import React, {Component} from 'react';
import {connect} from "react-redux"
import {changeVat, changeInvoice, uploadInvoice} from '../actions/actions'
import Error from './error'
import VatNumbers from './vatnumbers';


@connect((store) => {
  return {
    vat: store.pdf.vat,
    invoice: store.pdf.invoice,
    error: store.pdf.error,
    foundVats: store.pdf.foundVats,
    fetching: store.pdf.fetching,
    fetched: store.pdf.fetched,
  };
})
export default class App extends Component {

  handleSubmit(event) {
    event.preventDefault();
    this.props.dispatch(uploadInvoice(this.props.vat, this.props.invoice));
  }

  onVatChange(vat) {
    this.props.dispatch(changeVat(vat))
  }

  onInvoiceSelect(data) {
    this.props.dispatch(changeInvoice(data))
  }

  render() {
    return (
        <div style={{textAlign: 'center'}}>
          <h1>VAT Parser</h1>

          <span style={{visibility: this.props.fetching ? 'visible' : 'hidden'}}>Loading ... </span><br />

          <form ref='uploadForm'
                onSubmit={this.handleSubmit.bind(this)}
                id='uploadForm'
                encType="multipart/form-data">
            <input type="file" name="invoice" onChange={(e) => this.onInvoiceSelect(e.target.files[0])}/>
            <input type="text" placeholder="Your VAT number"
                   onChange={(e) => this.onVatChange(e.target.value)} value={this.props.vat}/>
            <input type='submit' value='Upload File' disabled={!this.props.vat || this.props.invoice == null}/>
          </form>
          <br /><br />

          <Error msg={this.props.error}/>
          <VatNumbers numbers={this.props.foundVats} fetched={this.props.fetched}/>
        </div>
    );
  }
}
