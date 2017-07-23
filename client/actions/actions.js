import axios from "axios";

const endpoints = {
  upload: '/api/extract-vat-numbers'
}


export function changeVat(vat) {
  return function (dispatch) {
    dispatch({
      type: 'CHANGE_VAT', payload: vat
    });
  }
}

export function changeInvoice(data) {
  return function (dispatch) {
    dispatch({
      type: 'CHANGE_INVOICE', payload: data
    });
  }
}

export function uploadSuccess({data}) {
  return {
    type: 'UPLOAD_INVOICE_SUCCESS',
    payload: data,
  };
}

export function uploadFail(error) {
  console.log(error);
  return {
    type: 'UPLOAD_INVOICE_FAIL',
    payload: 'There was a problem processing you file',
  };
}

export function uploadInvoice(vat, invoice) {
  return function (dispatch) {
    dispatch({
      type: 'UPLOAD_INVOICE_START'
    });

    let data = new FormData();
    data.append('invoice', invoice);
    data.append('vat', vat);

    axios.post(endpoints.upload, data)
        .then(response => dispatch(uploadSuccess(response)))
        .catch(error => dispatch(uploadFail(error)));


  }
}