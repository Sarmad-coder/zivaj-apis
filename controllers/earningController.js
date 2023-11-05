const db = require('../models');
const dbConfig = require('../config/dbConfig.js');
const { Op,Sequelize } = require('sequelize');


// create main model
const Earning = db.earning;
// const User = db.user;

// main work




// 1.create product
const addearning = async (req, res) => {

    try {
        let info = {
            earning: req.body.earning,
        }


        const earning = await Earning.create(info)
        res.status(200).json({
            status: 'ok',
            data: earning,
        })



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getearning = async (req, res) => {

    try {
        let earnings = await Earning.findAll({})
        res.status(200).json({
            status: 'ok',
            data: earnings
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}




// 2.get today earnings
const getTodayearning = async (req, res) => {

    try {
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

        const earnings = await Earning.sum('earning', {
            where: {
                createdAt: {
                    [Op.between]: [startOfToday, endOfToday]
                }
            }
        });
        res.status(200).json({
            status: 'ok',
            data: earnings
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}





// 2.get weekly earnings
const getWeeklyearning = async (req, res) => {

    try {
        const today = new Date();
        const startOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
        const endOfWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()) + 1);

        const earnings = await Earning.sum('earning', {
            where: {
                createdAt: {
                    [Op.between]: [startOfWeek, endOfWeek]
                }
            }
        });
        res.status(200).json({
            status: 'ok',
            data: earnings
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}






// 2.get monthly earnings
const getMonthlyearning = async (req, res) => {

    try {
        const today = new Date();
        const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
        const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        const earnings = await Earning.sum('earning', {
            where: {
                createdAt: {
                    [Op.between]: [startOfMonth, endOfMonth]
                }
            }
        });
        res.status(200).json({
            status: 'ok',
            data: earnings
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



const getMonthlyEarnings = async (req, res) => {
    try {
      // Fetch earnings grouped by month
      const monthlyEarnings = await Earning.findAll({
        attributes: [
          [Sequelize.literal("DATE_TRUNC('month', \"createdAt\")"), 'month'],
          [Sequelize.fn('sum', Sequelize.col('earning')), 'totalEarnings'],
        ],
        group: [Sequelize.literal("DATE_TRUNC('month', \"createdAt\")")],
        order: Sequelize.literal('month ASC'),
      });
  
      // Map the results to a format with month name and total earnings
      const monthlyData = monthlyEarnings.map(item => ({
        month: item.getDataValue('month').toLocaleString('default', { month: 'long' }),
        totalEarnings: parseFloat(item.getDataValue('totalEarnings')).toFixed(2),
      }));
  
      res.json(monthlyData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message});
    }
  };






// 2.get Yearly earnings
const getYearlyearning = async (req, res) => {

    try {
        const today = new Date();
        const startOfYear = new Date(today.getFullYear(), 0, 1);
        const endOfYear = new Date(today.getFullYear(), 11, 31);

        const earnings = await Earning.sum('earning', {
            where: {
                createdAt: {
                    [Op.between]: [startOfYear, endOfYear]
                }
            }
        });
        res.status(200).json({
            status: 'ok',
            data: earnings
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}







// 3.get product by id
const getearningById = async (req, res) => {


    try {
        let id = req.params.id

        let earning = await Earning.findOne({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: earning
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 4.update product

const updateearning = async (req, res) => {

    try {
        let id = req.params.id


        let getearning = await Earning.findOne({
            where: { id: id }
        })

        const earning = await Earning.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: earning
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deleteearning = async (req, res) => {

    try {
        let id = req.params.id

        const earning = await Earning.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: earning
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addearning,
    getearning,
    getearningById,
    updateearning,
    deleteearning,
    getTodayearning,
    getWeeklyearning,
    getMonthlyearning,
    getYearlyearning,
    getMonthlyEarnings
}

