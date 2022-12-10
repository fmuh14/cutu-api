import Xendit = require("xendit-node")
import 'dotenv/config'

const x = new Xendit({
  secretKey: process.env.XENDIT_SECRETKEY,
});

const { Invoice } = x;
const invoiceSpecificOptions = {};
export const invoice = new Invoice(invoiceSpecificOptions);

