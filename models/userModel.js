const moment = require("moment/moment");

module.exports=(sequelize,DataTypes)=>{
    const User=sequelize.define('user',{
        selfie:{
            type: DataTypes.STRING, // or DataTypes.STRING
            allowNull: true,
        },
        image1:{
            type: DataTypes.STRING, // or DataTypes.STRING
            allowNull: true,
        },
        image2:{
            type: DataTypes.STRING, // or DataTypes.STRING
            allowNull: true,
        },
        image3:{
            type: DataTypes.STRING, // or DataTypes.STRING
            allowNull: true,
        },
        image4:{
            type: DataTypes.STRING, // or DataTypes.STRING
            allowNull: true,
        },
        image5:{
            type: DataTypes.STRING, // or DataTypes.STRING
            allowNull: true,
        },
        image6:{
            type: DataTypes.STRING, // or DataTypes.STRING
            allowNull: true,
        },
        image7:{
            type: DataTypes.STRING, // or DataTypes.STRING
            allowNull: true,
        },
        profileFor:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        phoneNumber:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        password:{
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
        subCommunity:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        fatherStatus:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        with:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        as:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        motherStatus:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        natureOfBusiness:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        brothers:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        sisters:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        familyAffluences:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        country:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        state:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        city:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        residency:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        zipCode:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        grewUp:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        qualification:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        college:{
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
        employerName:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        diet:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        about:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        height:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        maritalStatus:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        numberOfUser:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        message:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        calls:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        duration:{
            type: DataTypes.STRING,
            allowNull: true,
        },
        premium:{
            type: DataTypes.BOOLEAN,
            allowNull: true,
        },
        packageId:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        packageDate:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        useAppDate:{
            type: DataTypes.DATE,
            allowNull: true,
        },
        dob: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        
        myFollow: {
            type: DataTypes.STRING, // or DataTypes.STRING
            defaultValue: '[]',
            get() {
              const value = this.getDataValue('myFollow');
              return value ? JSON.parse(value) : [];
            },
            set(value) {
              this.setDataValue('myFollow', JSON.stringify(value));
            }
        },
        otherFollow: {
            type: DataTypes.STRING, // or DataTypes.STRING
            defaultValue: '[]',
            get() {
              const value = this.getDataValue('otherFollow');
              return value ? JSON.parse(value) : [];
            },
            set(value) {
              this.setDataValue('otherFollow', JSON.stringify(value));
            }
        },
        status:{
            type: DataTypes.BOOLEAN,
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

    return User

}