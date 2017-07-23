export default (state = {
  vat: '',
  invoice: null,
  error: null,
  foundVats: null,
  fetching: false,
  fetched: false
}, action) => {
  switch (action.type) {
    case 'CHANGE_VAT' : {
      return Object.assign({}, state, {vat: action.payload});
    }
    case 'CHANGE_INVOICE': {
      return Object.assign({}, state, {invoice: action.payload});
    }
    case 'UPLOAD_INVOICE_START': {
      return Object.assign({}, state, {error: null, foundVats: [], fetching: true, fetched: false});
    }
    case 'UPLOAD_INVOICE_FAIL': {
      return Object.assign({}, state, {error: action.payload, fetching: false});
    }
    case 'UPLOAD_INVOICE_SUCCESS': {
      return Object.assign({}, state, {foundVats: action.payload, fetching: false, fetched: true});
    }

  }
  return state;
}
