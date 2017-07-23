const express = require('express');
const router = new express.Router();

const parser = require('./api/parser');


router.route('/extract-vat-numbers')
  .post(parser.extractVatNumbers)

module.exports = router;
