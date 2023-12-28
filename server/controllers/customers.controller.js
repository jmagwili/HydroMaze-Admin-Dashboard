import {Customers, Orders} from "../database.js";


const getAllCustomers = async (req, res) => {
  try {    
    const customers = await Customers.find({});
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

const getSingleCustomer = async (req, res) => {
  try{
    const customer = await Customers.find({username: req.params.username})
    res.json(customer)
  }catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

const getCustomerRecentOrders = async (req, res) => {
  try{
    const orders = await Orders.aggregate([
      {
        $match:{
          username: req.params.username
        }
      },
      {
        $sort:{
          createdAt: -1
        }
      },
      {
        $limit: 5
      }
    ])
    res.json(orders)
  }catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
}

export { 
  getAllCustomers, 
  getSingleCustomer,
  getCustomerRecentOrders,
};
