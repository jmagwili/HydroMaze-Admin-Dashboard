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
  try{
    const orders = await Orders.find({
      username: req.body.name,
      status: req.body.status
    })

    res.json(orders)
  }catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

export { getAllOrders, searchOrder };
