const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const Preferences=sequelize.define('preferences',{
        
        userId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        startAge:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        endAge:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        startHeight:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        endHeight:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        maritalStatus:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        country:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        profileFor:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        state:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        religion:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        tongue:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        community:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        qualification:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        workingWith:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        workingAs:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        annualIncome:{
            type: DataTypes.STRING,
            allowNull: true,
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
    })

    return Preferences

}