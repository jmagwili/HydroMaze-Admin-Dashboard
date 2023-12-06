import {Order} from "../database.js";



const getAllOrders = async (req, res) => {
  try {
    
    const orders = await Order.find({});
    console.log(orders);
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export { getAllOrders };
