import { Orders } from "../database.js";

const getTotalRev = async (req,res) => {
    try {
    const totalRev = await Orders.aggregate([
        { $group: {
            _id: null,
            totalRevenue: {
              $sum: "$total",
            },
          } },
        {$project: {id: 0, totalRevenue:1}}
      ]);

    res.json(totalRev);
    } catch (err) {res.json(err);}
}

export {getTotalRev}