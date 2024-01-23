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
          $or: [{ slim: { $gt: 0 } }, { round: { $gt: 0 } }],
        },
      },
      {
        $project: {
          _id: {
            year: {
              $year: "$createdAt",
            },
            month: {
              $dateToString: { format: "%Y-%m", date: "$createdAt" },
            },
          },
          totalSlimOrders: "$slim",
          totalRoundOrders: "$round",
        },
      },
      {
        $group: {
          _id: "$_id",
          totalSlimOrders: {
            $sum: "$totalSlimOrders",
          },
          totalRoundOrders: {
            $sum: "$totalRoundOrders",
          },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          totalSlimOrders: 1,
          totalRoundOrders: 1,
        },
      },
    ]);
    res.json(containerTypeSales);
  } catch (e) {
    res.json({ error: e.message });
    console.log(e);
  }
};

//get daily, weekly, monthly sales

const getTotalSales = async (req, res) => {
  try {
    const startDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7
    );
    const endDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const weeklySalesTotal = await Orders.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: {
            $gte: startDay,
            $lte: endDay,
          },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
      { $project: {_id: 0, total: 1}}
    ]);
    const startMonth = new Date(today.getFullYear(), today.getMonth() - 1);
    const endMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    console.log("start", startMonth);
    console.log("end", endMonth);
    const monthlySalesTotal = await Orders.aggregate([
      {
        $match: {
          status: "delivered",
          createdAt: {
            $gte: startMonth,
            $lte: endMonth,
          },
        },
      },
      {
        $group: {
          _id: null,
          totalSales: {
            $sum: "$total",
          },
        },
      },
      { $project: {_id: 0, total: 1}}
    ]);
    
    const startOfYear = new Date(today.getFullYear() - 1, 0, 1);
    const endOfYear = new Date(today.getFullYear(), 0, 0);
    console.log("start", startOfYear);
    console.log("end", endOfYear);
    const yearlySalesTotal = await Orders.aggregate([
      { $match: { createdAt: { $gte: startOfYear, $lt: endOfYear } } },
      { $group: {
        _id: null,
        total: {
          $sum: "$total",
        },
      }},
      { $project: {_id: 0, total: 1}},
    ]);

    const salesData = { weeklySalesTotal, monthlySalesTotal, yearlySalesTotal };

    // if (salesData.weeklySalesTotal.length === 0) {
    //   salesData.weeklySalesTotal = 0;
    // }

    // if (salesData.monthlySalesTotal.length === 0) {
    //   salesData.monthlySalesTotal = 0;
    // }

    // if (salesData.yearlySalesTotal.length === 0) {
    //   salesData.yearlySalesTotal = 0;
    // }

  res.json(salesData);

  } catch (err) {
    res.json({ error: err });
    console.log(err);
  }
};

export { getTotalRev, revenuePerMonth, containerTypeRevenue, getTotalSales };
