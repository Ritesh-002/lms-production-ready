// import { v2 } from 'cloudinary';
// import Razorpay from 'razorpay';

// import app from './app.js';
// import connectToDB from './configs/dbConn.js';

// // Cloudinary configuration
// v2.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // Razorpay configuration
// export const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_SECRET,
// });

// const PORT = process.env.PORT || 5000;


// app.listen(PORT, async () => {
//   // Connect to DB
//   await connectToDB();
//   console.log(`App is running at http://localhost:${PORT}`);
// });

import { v2 as cloudinary } from 'cloudinary';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
import app from './app.js';
import connectToDB from './configs/dbConn.js';

dotenv.config();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Razorpay configuration
let razorpay;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
  });
} else {
  console.warn('Razorpay keys are not set. Skipping Razorpay initialization.');
}

const PORT = process.env.PORT || 5014;

app.listen(PORT, async () => {
  await connectToDB();
  console.log(`App is running at http://localhost:${PORT}`);
});

// Example endpoint to create an order (conditionally)
app.post('/create-order', async (req, res) => {
  if (!razorpay) {
    return res.status(500).send('Razorpay is not initialized.');
  }

  const { amount, currency, receipt, notes } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount, // amount in the smallest currency unit
      currency,
      receipt,
      notes,
    });
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { razorpay };