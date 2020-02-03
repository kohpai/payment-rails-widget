require("dotenv").config();

const crypto = require("crypto");
const url = require("url");

const KEY = process.env.API_KEY;
const SECRET = process.env.API_SECRET;

const recipientEmail = "srikote@cleverse.com";
const recipientReferenceId = "kohpai1190";
const recipientAddress = {
  // Adding addr. fields is optional. Used to easily populate
  firstName: "firstName", // the widget with default values.
  lastName: "lastName",
  governmentId: "governmentId",
  street1: "street1",
  street2: "street2",
  city: "city",
  postalCode: "postalCode",
  region: "AL",
  country: "US"
};

const widgetBaseUrl = new url.URL("https://widget.paymentrails.com");
const querystring = new url.URLSearchParams({
  ts: Math.floor(new Date().getTime() / 1000),
  key: KEY,
  email: recipientEmail,
  refid: recipientReferenceId,
  hideEmail: "false", // optional parameter: if 'true', hides the email field
  roEmail: "false", // optional parameter: if 'true', renders the email field as Read Only
  payoutMethods: "bank-transfer,paypal", // optional parameter: filters the possible payout methods shown on the widget
  locale: "th" // optional parameter: ISO 639-1 language code, changes the language of the widget
  /*
  ** Adding address fields is optional, Used to easily populate
  ** the widget with default values.
  **
  'addr.firstName' : recipientAddress.firstName,
  'addr.lastName': recipientAddress.lastName,
  'addr.governmentId': recipientAddress.governmentId,
  'addr.street1': recipientAddress.street1,
  'addr.street2': recipientAddress.street2,
  'addr.city': recipientAddress.city,
  'addr.postalCode': recipientAddress.postalCode,
  'addr.region': recipientAddress.region,
  'addr.country': recipientAddress.country,
  */
}).toString();

const hmac = crypto.createHmac("sha256", SECRET);
hmac.update(querystring);
const signature = hmac.digest("hex");
widgetBaseUrl.search = querystring + "&sign=" + signature;

// you can send the link to your view engine
const widgetLink = widgetBaseUrl.toString();

console.log(widgetLink);
