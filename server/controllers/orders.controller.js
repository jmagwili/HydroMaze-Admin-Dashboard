import {Orders} from "../database.js";

const getAllOrders = async (req, res) => {
  try {
    
    const orders = await Orders.find({});
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const searchOrder = async (req, res) => {
  try {
    let query = {};
    if (req.body.name) query.username = await req.body.name;
    if (req.body.status) query.status = await req.body.status;

    const orders = await Orders.find(query);

    console.log("Successfullt fetched searched orders");

    res.json(orders);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};


export { getAllOrders, searchOrder };
