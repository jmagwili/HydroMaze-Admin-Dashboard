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

const getContainerTypeData = async (req, res) => {

  try { 
  const containerData = await Orders.aggregate([
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
  res.json(containerData);
} catch (e) {
  res.json({ error: e});
}
  

};

export { getTotalRev, revenuePerMonth };
