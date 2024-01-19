import { Orders } from "../database.js";

const today = new Date();
const start = new Date(today.getFullYear(), today.getMonth() - 12);
const end = new Date(today.getFullYear(), today.getMonth());
const getTotalRev = async (req, res) => {
  try {
    const totalRev = await Orders.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$total",
          },
        },
      },
      { $project: { _id: 0, totalRevenue: 1 } },
    ]);

    res.json(totalRev);
  } catch (err) {
    res.json(err);
  }
};

const revenuePerMonth = async (req, res) => {
  try {
    const revenuePerMonth = await Orders.aggregate([
      {
        $match: {
          createdAt: { $exists: true, $type: "date" },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
          },
          total: {
            $sum: "$total",
          },
        },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          total: 1,
        },
      },
    ]);
    res.json(revenuePerMonth);
    console.log(revenuePerMonth);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

const containerTypeRevenue = async (req, res) => {
  try {
    const containerTypeSales = await Orders.aggregate([
      {
        $match: {
          slim: {
            $gt: 0,
          },
          round: {
            $gt: 0,
          },
        },
      },
      {
        $project: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $month: "$createdAt",
            },
          },
          totalSlimOrders: {
            $sum: "$slim",
          },
          totalRoundOrders: {
            $sum: "$round",
          },
        },
      },
    ]);
    res.json(containerTypeSales);
  } catch (e) {
    res.json({ error: e });
  }
};

//get daily, weekly, monthly sales
const startDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
const endDay = new Date(today.getFullYear(), today.getMonth(), today.getDate())
const getDailySales = async (req, res) => {
  try {
    console.log("startDay:", startDay);
    console.log("endDay:", endDay);
    const weeklySalesTotal = await Orders.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: {
            $gte: startDay,
            $lte: endDay,
          },
          
        }
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$total",
          },
        }
      },
  
    ]);

    if (weeklySalesTotal.length === 0){
      res.json({
        totalSales : 0
      })
    } else {res.json(weeklySalesTotal);}
    
    console.log(weeklySalesTotal);
  } catch (err) {
    res.json({ error: err });
    console.log(err);
  }
};

export { getTotalRev, revenuePerMonth, containerTypeRevenue, getDailySales};
