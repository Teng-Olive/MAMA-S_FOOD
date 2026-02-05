import orderModel from '../models/orderModels.js';
import userModel from '../models/userModels.js';
import productModel from '../models/productModels.js';

// Placing order using MoMO (Mobile Money)
const placeOrderMoMo = async (req, res) => {
  try {
    const { userId, amount, address } = req.body;

    // Fetch user data
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Retrieve product details for each cart item
    const items = await Promise.all(
      Object.entries(userData.cartData).map(async ([itemId, quantity]) => {
        const product = await productModel.findById(itemId);
        return {
          itemId,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity,
        };
      })
    );

    if (items.length === 0) {
      return res.status(400).json({ success: false, message: 'Cart is empty' });
    }

    // Create order with payment method set to MoMO
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: 'MoMO',
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    // Prepare MoMO payment instructions (replace with real details)
    const momoPhone = process.env.MOMO_PHONE || '+237000000000';
    const paymentInstructions = {
      provider: 'MoMO',
      phone: momoPhone,
      message: `Send ${amount} to ${momoPhone} and include orderId: ${newOrder._id}`,
    };

    // Respond with order and payment instructions
    res.json({ success: true, message: 'Order placed. Please complete payment via MoMO using the provided instructions.', orderId: newOrder._id, paymentInstructions });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify MoMO (to be used once the payment has been confirmed by admin or webhook)
const verifyMoMo = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === 'true') {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { placeOrderMoMo, verifyMoMo };
