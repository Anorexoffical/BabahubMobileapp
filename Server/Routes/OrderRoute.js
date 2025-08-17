const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const Order = require("../Models/OrderModel.js");



// PayFast Payment Integration
const generateSignature = (data, passPhrase = "") => {
  const getString = Object.keys(data)
    .filter(key => data[key])
    .map(key => `${key}=${encodeURIComponent(data[key].trim()).replace(/%20/g, "+")}`)
    .join("&") + (passPhrase ? `&passphrase=${encodeURIComponent(passPhrase.trim()).replace(/%20/g, "+")}` : "");
  return crypto.createHash("md5").update(getString).digest("hex");
};

router.post("/payfast/initiate-payment", async (req, res) => {
  try {
    const { name, email, phone, address, items, subtotal, tax, total, } = req.body;
    const orderID = `${Date.now()}-${crypto.randomBytes(2).toString("hex")}`;

    //for sandbox test
    const merchant_id = "10036171";
    const merchant_key = "731ry9o3bmz2d";
    const return_url = "https://11b70a81954f.ngrok-free.app/payment/payfast/success";
    const cancel_url = "https://11b70a81954f.ngrok-free.app/payment/payfast/cancel";
    const notify_url = "https://11b70a81954f.ngrok-free.app/payment/payfast/notifyurl";
    // const notify_url = "https://3a31-103-137-24-132.ngrok-free.app/payfast/notifyurl";

    //https://11b70a81954f.ngrok-free.app 
    console.log(items);
    
    const paymentData = {
      merchant_id, merchant_key, return_url, cancel_url, notify_url,
      name_first: name, email_address: email,
      m_payment_id: orderID, amount: total, item_name: `OID-${orderID}`,
      
      custom_str1: JSON.stringify(items.map(({ id, image, ...rest }) => rest)),
      custom_str2: JSON.stringify({ address }),
      custom_str3: phone, 
    };
    console.log(paymentData);
    paymentData.signature = generateSignature(paymentData);
    //for sandbox testing  	https://sandbox.payfast.co.za/eng/process 
    res.json({ paymentUrl: `https://sandbox.payfast.co.za/eng/process?${Object.keys(paymentData).map(key => `${key}=${encodeURIComponent(paymentData[key])}`).join("&")}` });
    // res.json({ paymentUrl: `https://www.payfast.co.za/eng/process?${Object.keys(paymentData).map(key => `${key}=${encodeURIComponent(paymentData[key])}`).join("&")}` });

  } catch (err) {
    res.status(500).json({ error: "Error initiating payment" });
  }
});

//fetch order data
router.get("/get", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: "Error fetching orders" });
  }
});

//update the deliverystatus
router.put("/orderstatusupdate/:id/deliver", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { deliveryStatus: "Delivered" },
      { new: true }
    );
    res.status(200).json(updatedOrder);
    console.log("updated status")
  } catch (err) {
    res.status(500).json({ error: "Failed to update delivery status" });
  }
});

module.exports = router;
