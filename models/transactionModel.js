const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Transaction=sequelize.define('transaction',{
        amount:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        paymentMethod:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        userId:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD');
            }
        },
        
    },
    )

    return Transaction

}