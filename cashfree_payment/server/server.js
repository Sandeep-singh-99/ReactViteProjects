// import express from "express";
// import cors from "cors";
// import { Cashfree } from "cashfree-pg";
// import crypto from "crypto";

// import dotenv from "dotenv";
// dotenv.config();

// const port = 5000;

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

// Cashfree.XClientId = process.env.CLIENT_ID;
// Cashfree.XClientSecret = process.env.CLIENT_SECRET;
// Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// function generateOrderId() {
//     const uniqueId = crypto.randomBytes(16).toString('hex')
//     const hash = crypto.createHash('sha256')
//     hash.update(uniqueId)

//     const orderId = hash.digest('hex')

//     return orderId.substr(0,12)
// }

// app.get('/payment', async (req, res) => {

//     try {
        
//         let request = {
//             "order_amount": 1.00,
//             "order_currency": "INR",
//             "order_id": await generateOrderId(),
//             "customer_details": {
//                 "customer_id": "webcodder01",
//                 "customer_phone": "9999999999",
//                 "customer_name": "Web Codder",
//                 "customer_email": "webcodder@example.com"
//             },
//         }

//         Cashfree.PGCreateOrder("2023-08-01",request).then(response => {
//             console.log(response.data);
//             res.json(response.data);

//         }).catch(error => {
//             console.error(error.response.data.message);
//         })


//     } catch (error) {
//         console.log(error);
//     }


// })

// app.post('/verify', async (req, res) => {

//     try {

//         let { orderId } = req.body;
        
//         Cashfree.PGOrderFetchPayments("2023-08-01",orderId).then((response) => {

//             res.json(response.data);
//         }).catch(error => {
//             console.error(error.response.data.message);
//         })


//     } catch (error) {
//         console.log(error);
//     }
// })

// app.listen(port, () => {
//   console.log(`server is running on http://localhost:${port}`);
// });


import express from "express";
import cors from "cors";
import { Cashfree } from "cashfree-pg";
import crypto from "crypto";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err));

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  orderAmount: { type: Number, required: true },
  orderCurrency: { type: String, required: true },
  customerId: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);

const port = 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

// Utility function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function generateOrderId() {
  const uniqueId = crypto.randomBytes(16).toString("hex");
  const hash = crypto.createHash("sha256");
  hash.update(uniqueId);
  return hash.digest("hex").substr(0, 12);
}

app.get("/payment", async (req, res) => {
  try {
    const orderId = generateOrderId();
    const orderData = {
      order_amount: 1.00,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: "webcodder01",
        customer_phone: "9999999999",
        customer_name: "Web Codder",
        customer_email: "webcodder@example.com",
      },
    };

    const newOrder = new Order({
      orderId: orderData.order_id,
      orderAmount: orderData.order_amount,
      orderCurrency: orderData.order_currency,
      customerId: orderData.customer_details.customer_id,
      customerPhone: orderData.customer_details.customer_phone,
      customerName: orderData.customer_details.customer_name,
      customerEmail: orderData.customer_details.customer_email,
    });

    await newOrder.save();
    console.log("Order saved to DB:", newOrder);

    const response = await Cashfree.PGCreateOrder("2023-08-01", orderData);
    console.log("Payment created:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Payment creation error:", error.response?.data || error);
    res.status(500).json({
      error: error.response?.data?.message || "Internal server error",
    });
  }
});

app.post("/verify", async (req, res) => {
  try {
    const { orderId } = req.body;
    if (!orderId) {
      console.log("Missing orderId in request body:", req.body);
      return res.status(400).json({ error: "Order ID is required" });
    }

    console.log("Verifying payment for orderId:", orderId);

    // Retry mechanism to handle Cashfree sync delay
    let response;
    for (let i = 0; i < 3; i++) { // Retry up to 3 times
      response = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
      console.log(`Attempt ${i + 1} - Cashfree response:`, response.data);

      if (response.data && response.data.length > 0) break;
      await delay(2000); // Wait 2 seconds before retrying
    }

    let paymentStatus;
    if (!response.data || response.data.length === 0) {
      console.log("No payment data found after retries for orderId:", orderId);
      paymentStatus = "PENDING";
    } else {
      paymentStatus = response.data[0]?.payment_status || "PENDING";
      console.log("Payment status from Cashfree:", paymentStatus);
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { orderId },
      { paymentStatus },
      { new: true }
    );

    if (!updatedOrder) {
      console.log("Order not found in DB for orderId:", orderId);
      return res.status(404).json({ error: "Order not found" });
    }

    console.log("Updated order in DB:", updatedOrder);
    res.json({
      status: paymentStatus,
      payments: response.data || [],
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Payment verification error:", error.response?.data || error);
    res.status(500).json({
      error: error.response?.data?.message || "Internal server error",
    });
  }
});

app.get("/payments", async (req, res) => {
  try {
    const payments = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10);
    console.log("Fetched payments:", payments);
    res.json(payments);
  } catch (error) {
    console.error("Payment history fetch error:", error);
    res.status(500).json({ error: "Failed to fetch payment history" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});