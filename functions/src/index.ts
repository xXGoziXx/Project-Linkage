/* eslint-disable @typescript-eslint/no-explicit-any */
import * as functions from "firebase-functions";
import {Base64} from "js-base64";
import * as nodemailer from "nodemailer";
import fetch from "node-fetch";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
/**
 * Here we're using Gmail to send
 */
const user = functions.config().email.user;
const pass = functions.config().email.pass;
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass,
  },
});
/**
 * @param  {string} email
 * @param  {any} order
 * @return {string}
 */
function sendMail(
  {
    email,
    name,
    id,
    country,
  }: {
    email: string;
    name: string;
    id: string;
    country: string;
  },
  order: any,
): string {
  const shipping = order.purchase_units[0].amount.breakdown.shipping.value;
  const subtotal = order.purchase_units[0].amount.breakdown.item_total.value;
  const items = order.purchase_units[0].items;
  const address = order.payer.address;
  const styles = `
  @import url("https://fonts.googleapis.com/css2?family=Assistant:wght@400;700&family=Teko:wght@400;600;700&display=swap");
p {
  margin-bottom: 0;
  margin-top: 0.5em;
}

.table-container {
  border-bottom: 2px solid white;
}

.rwd-table {
  margin: 1em 0;
  min-width: 300px;
  box-shadow: 0 0 12px #999;
  border: 2px solid white;
}
.rwd-table th {
  display: none;
}
.rwd-table td {
  display: block;
}
.rwd-table td:first-child {
  padding-top: 0.5em;
}
.rwd-table td:last-child {
  padding-bottom: 0.5em;
}
.rwd-table td:before {
  content: attr(data-th) ": ";
  font-weight: bold;
  width: 6.5em;
  display: inline-block;
}
@media (min-width: 480px) {
  .rwd-table td:before {
    display: none;
  }
}
.rwd-table th,
.rwd-table td {
  text-align: left;
}
@media (min-width: 480px) {
  .rwd-table th,
.rwd-table td {
    display: table-cell;
    padding: 0.25em 0.5em;
  }
  .rwd-table th:first-child,
.rwd-table td:first-child {
    padding-left: 0;
  }
  .rwd-table th:last-child,
.rwd-table td:last-child {
    padding-right: 0;
  }
}

body {
  padding: 0 2em;
  font-family: "Assistant", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: white;
  background: #0a0a0a;
}
.background {
  height: 100%;
  width: 100%;
  padding: 2em;
  font-family: "Assistant", sans-serif;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  color: white;
  background: #0a0a0a;
}
h1 {
  font-weight: bold;
  letter-spacing: -1px;
  color: white;
}

.rwd-table {
  background: #0a0a0a;
  color: white;
  overflow: hidden;
}
.rwd-table th,
.rwd-table td {
  margin: 0.5em 1em;
}
@media (min-width: 480px) {
  .rwd-table th,
.rwd-table td {
    padding: 1em !important;
  }
}
.rwd-table th,
.rwd-table td:before {
  color: white;
}
  `;
  const itemHTML = items
    .map((item: any) => {
      return `<tr>
    <td data-th="Product Name">${item.name}</td>
    <td data-th="Quantity">${item.quantity}</td>
    <td data-th="Price">€${item.unit_amount.value}</td>
    </tr>`;
    })
    .join("");
  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible"
          content="IE=edge">
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">
    <title>New Order | Project Linkage</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/modernizr/2.8.3/modernizr.min.js"
            type="text/javascript"></script>
    <link rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">
    <style type="text/css">
    ${styles}
    </style>
  </head>
  <body>
    <!-- partial:index.partial.html -->
    <div class="background">
      <h1>Hey Project Linkage!</h1>
      <h3>New order in! Here are the order details:</h3>
      <h3>Contact Details:</h3>
      <p><b>Name: </b> ${name}</p>
      <p><b>Email: </b> ${email}</p>
      <h3>Shipping Address:</h3>
      <p>${address.address_line_1}</p>
      <p>${address.admin_area_2}</p>
      <p>${address.admin_area_1}</p>
      <p>${address.postal_code}</p>
      <p>${country}</p>
      <table class="rwd-table">
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
        ${itemHTML}
      </table>
      <p><b>Subtotal: +€${subtotal}</b></p>
      <p><b>Delivery Cost: +€${shipping}</b></p>
      <hr>
      <p><b>Total: €${parseFloat(
        String(Number(subtotal) + Number(shipping)),
      ).toFixed(2)}</b></p>
    </div>
  </body>
</html>`;
  const mailOptions: any = {
    priority: "high",
    // Something like: Jane Doe <janedoe@gmail.com>
    from: `${name} <${email}>`,
    to: user,
    subject: `Order #${id}`, // email subject
    html: html, // email content in HTML
  };
  let response = "";
  // returning result
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      response = error.toString();
    } else {
      response = "Sent!";
    }
    console.log("Response:", response);
    return response;
  });
  return response;
}
export const createOrder = functions.firestore
  .document("orders/{userId}")

  .onCreate(async (snap: any) => {
    const data = snap.data() as {
      id: string;
      name: string;
      email: string;
      country: string;
    };
    console.log("Order Document: ", data);
    const id = snap.id;
    console.log("Order ID: ", id);
    const client = functions.config().paypal_live.client_id;
    const secret = functions.config().paypal_live.client_secret;
    // const client = functions.config().paypal.client_id;
    // const secret = functions.config().paypal.client_secret;
    const basicAuthString = client + ":" + secret;
    const accessToken = Base64.encode(basicAuthString);
    console.log("Access Token: ", accessToken);
    try {
      const order = await (
        await fetch(
          "https://api-m.paypal.com/v2/checkout/orders/" + id,
          // "https://api-m.sandbox.paypal.com/v2/checkout/orders/" + id,
          {
            headers: {
              "Authorization": `Basic ${accessToken}`,
              "Content-Type": "application/json",
            },
          },
        )
      ).json();
      // console.log("Order retrieved: ", order);
      snap.ref.set(order, {merge: true}); // Update the order document
      return sendMail(data, order);
    } catch (error) {
      console.error(error);
      return error;
    }
  });
