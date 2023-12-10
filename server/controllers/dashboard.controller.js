import {Orders} from "../database.js";


var start = new Date();
start.setHours(0,0,0,0)
var end = new Date();
end.setHours(23,59,59,999)

const getOrdersToday = async (req, res) => {
    try {    
      const ordersToday = await Orders.find({createdAt: {$gte: start, $lt:end}});
      console.log(ordersToday);
      res.json(ordersToday);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };

  const getCustomersToday = async (req, res) => {
    try {
      
      const customersToday = await Customers.find({created_on:{$gte: start, $lt:end}});
      res.json(customersToday);
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };
  
  export { getOrdersToday, getCustomersToday };
  