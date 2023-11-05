const db = require('../models');
const { hashSync, genSaltSync } = require('bcrypt')
const dbConfig = require('../config/dbConfig.js');
const { sendMail } = require('../otp/OTPVerification');
const { sign } = require('jsonwebtoken');
const { dateToDays } = require('../dateDays/DateDays');
const { Op } = require('sequelize');

// create main model
const Package = db.package;
const User = db.user;
const Transaction = db.transaction;
const Earning = db.earning;
const Reel = db.reel;
const Follow = db.follow;
const StripeKey = db.stripeKey;

// main work


const Stripe = require('stripe')
// const User = db.user;

// main work





// 1.create product
const addUsers = async (req, res) => {

    try {


        const salt = genSaltSync(10)
        const gotp = `${Math.floor(1000 + Math.random() * 9000)}`

        console.log(req.files)
        

        let info = {
            selfie: req.files[0]===undefined?null:dbConfig.mainUrl+req.files[0].filename,
            image1: req.files[1]===undefined?null:dbConfig.mainUrl+req.files[1].filename,
            image2: req.files[2]===undefined?null:dbConfig.mainUrl+req.files[2].filename,
            image3: req.files[3]===undefined?null:dbConfig.mainUrl+req.files[3].filename,
            image4: req.files[4]===undefined?null:dbConfig.mainUrl+req.files[4].filename,
            image5: req.files[5]===undefined?null:dbConfig.mainUrl+req.files[5].filename,
            image6: req.files[6]===undefined?null:dbConfig.mainUrl+req.files[6].filename,
            image7: req.files[7]===undefined?null:dbConfig.mainUrl+req.files[7].filename,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            religion: req.body.religion,
            community: req.body.community,
            country: req.body.country,
            dob: req.body.dob,
            profileFor: req.body.profileFor,
            gender: req.body.gender,
            status: false,
        }


        console.log(info)




        const gphone = await User.findOne({
            where: {
                phoneNumber: info.phoneNumber
            }
        })
        const gmil = await User.findOne({
            where: {
                email: info.email
            }
        })
        if (gphone) {
            res.status(200).json({
                status: 'fail',
                message: 'Phone Number Already exists',
            })
        }
        else if (gmil) {
            res.status(200).json({
                status: 'fail',
                message: 'Email already exists',
            })
        } else {


            const myuser = await User.create(info)
            return res.status(200).json({
                status: 'ok',
                data: myuser,
            })




        }




    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products
const getUsers = async (req, res) => {

    try {

        let id = (req.params.id)

        console.log(id)

        let checkuser = await User.findOne({
            where: { id: id }
        })

        if (checkuser.gender === 'male') {

            let users = await User.findAll({
                include: [
                    {
                        model: Reel,
                        as: 'reel'
                    },
                    {
                        model: Follow,
                        as: 'followTo'
                    },
                ],
                where: { gender: 'female', status: true,
             }
            })

            const data=[]
            
            users.map(i=>{
                if(!i?.myFollow.includes((parseInt(id)))){
                  return data.push(i);
                }
              }
              )


            res.status(200).json({
                status: 'ok',
                data: data
            })
        }
        else {
            let users = await User.findAll({
                include: [
                    {
                        model: Reel,
                        as: 'reel'
                    },
                    {
                        model: Follow,
                        as: 'followTo'
                    },
                ],
                where: { gender: 'male', status: true }
            })

            const data=[]
            
            users.map(i=>{
                if(!i?.myFollow.includes((parseInt(id)))){
                  return data.push(i);
                }
              }
              )


            res.status(200).json({
                status: 'ok',
                data: data
            })
        }

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 2.get all products
const allUsers = async (req, res) => {

    try {


        let users = await User.findAll({
            // include: [
            //     {
            //         model: Like,
            //         as: 'like',
            //         include: [
            //     {
            //         model: Product,
            //         as: 'product'
            //     },


            // ],
            //     },


            // ],
        })
        res.status(200).json({
            status: 'ok',
            data: users
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}





const NoUseappByUsers = async (req, res) => {

    try {

        const twentyDaysAgo = new Date();
        twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 14);

        const users = await User.findAll({
            where: {
                useAppDate: {
                    [Op.lt]: twentyDaysAgo
                }
            }
        });
        res.status(200).json({
            status: 'ok',
            data: users
        })

    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}








// 3.get product by id
const getUserById = async (req, res) => {


    try {
        let id = req.params.id

        let user = await User.findOne({
            where: { id: id }
        })



        let mypackage = await Package.findOne({
            where: { id: user?.packageId }
        })



        var referenceDate = new Date();
        var inputDate = new Date(user?.packageDate);
        var timeDiff = referenceDate.getTime() - inputDate.getTime();
        var days = Math.floor(timeDiff / (1000 * 3600 * 24));



        if (mypackage) {
            if (parseInt(days) <= parseInt(mypackage?.duration)) {

                console.log(user?.numberOfUser)

                if (parseInt(user?.numberOfUser) < 0) {

                    return res.status(200).json({
                        status: 'fail',
                        message: 'You cannot see more users data.'
                    })
                }
                else {


                    const numberOfUser = parseInt(user?.numberOfUser) - 1

                    console.log('========== users')

                    let userss = await User.update({ ...req.body, numberOfUser }, {
                        where: { id: id }
                    })

                    res.status(200).json({
                        status: 'ok',
                        data: userss
                    })


                }

            }

            else {

                const packageId = null
                const packageDate = null
                const premium = false

                let user = await User.update({ ...req.body, packageId, premium, packageDate }, {
                    where: { id: id }
                })

                res.status(200).json({
                    status: 'fail',
                    message: 'Your package has been expired.'
                })
            }


        }
        else {

            res.status(200).json({
                status: 'fail',
                message: 'You did not buy any package.'
            })

        }




    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}





// 3.get product by id
const getSingUserById = async (req, res) => {


    try {
        let id = req.params.id

        var count=0

        let user = await User.findOne({
            include: [
                {
                    model: Reel,
                    as: 'reel'
                },
            ],
            where: { id: id }
        })



        if (user?.image1 !== null || user?.image1 === 'null') {
                count += 1
        }

        if (user?.firstName !== null || user?.firstName === 'null') {
                count += 1
        }
        if (user?.lastName!== null || user?.lastName === 'null') {
                count += 1
        }
        if (user?.email!== null || user?.email === 'null') {
                count += 1
        }
        if (user?.phoneNumber!== null || user?.phoneNumber === 'null') {
                count += 1
        }
        if (user?.religion!== null || user?.religion === 'null') {
                count += 1
        }
        if (user?.community!== null || user?.community === 'null') {
                count += 1
        }
        if (user?.country!== null || user?.country === 'null') {
                count += 1
        }
        if (user?.dob!== null || user?.dob === 'null') {
                count += 1
        }
        if (user?.profileFor!== null || user?.profileFor === 'null') {
                count += 1
        }
        if (user?.gender!== null || user?.gender === 'null') {
                count += 1
        }
        if (user?.about!== null || user?.about === 'null') {
                count += 1
        }
        if (user?.tongue!== null || user?.tongue === 'null') {
                count += 1
        }
        if (user?.subCommunity!== null || user?.subCommunity === 'null') {
                count += 1
        }
        if (user?.fatherStatus!== null || user?.fatherStatus === 'null') {
                count += 1
        }
        if (user?.with!== null || user?.with === 'null') {
                count += 1
        }
        if (user?.as!== null || user?.as === 'null') {
                count += 1
        }
        if (user?.motherStatus!== null || user?.motherStatus === 'null') {
                count += 1
        }
        if (user?.natureOfBusiness!== null || user?.natureOfBusiness === 'null') {
                count += 1
        }
        if (user?.brothers!== null || user?.brothers === 'null') {
                count += 1
        }
        if (user?.sisters!== null || user?.sisters === 'null') {
                count += 1
        }
        if (user?.familyAffluences!== null || user?.familyAffluences === 'null') {
                count += 1
        }
        if (user?.state!== null || user?.state === 'null') {
                count += 1
        }
        if (user?.city!== null || user?.city === 'null') {
                count += 1
        }
        if (user?.residency!== null || user?.residency === 'null') {
                count += 1
        }
        if (user?.zipCode!== null || user?.zipCode === 'null') {
                count += 1
        }
        if (user?.grewUp!== null || user?.grewUp === 'null') {
                count += 1
        }
        if (user?.qualification!== null || user?.qualification === 'null') {
                count += 1
        }
        if (user?.college!== null || user?.college === 'null') {
                count += 1
        }
        if (user?.workingWith!== null || user?.workingWith === 'null') {
                count += 1
        }
        if (user?.workingAs!== null || user?.workingAs === 'null') {
                count += 1
        }
        if (user?.annualIncome!== null || user?.annualIncome === 'null') {
                count += 1
        }
        if (user?.employerName!== null || user?.employerName === 'null') {
                count += 1
        }
        if (user?.diet!== null || user?.diet === 'null') {
                count += 1
        }
        if (user?.height!== null || user?.height === 'null') {
                count += 1
        }
        if (user?.maritalStatus!== null || user?.maritalStatus === 'null') {
                count += 1
        }




        const percent=parseInt((parseInt(count)/parseInt(29))*100)
        

        




        res.status(200).json({
            status: 'ok',
            data: user,
            count: percent
        })



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}





// 3.get product by id
const getPackage = async (req, res) => {


    try {
        let id = req.params.id

        const packageId = req.body.packageId
        const packageDate = new Date()
        const premium = true


        let mypackage = await Package.findOne({
            where: { id: packageId }
        })


        const numberOfUser = mypackage?.numberOfUser
        const message = mypackage?.message
        const duration = mypackage?.duration
        const calls = mypackage?.calls

        let allearnings = await Earning.findAll({})



        const price = parseInt(mypackage?.price) - parseInt((parseInt(mypackage?.price) * parseInt(mypackage?.discount)) / 100)



        const earning = allearnings.reduce((total, currentValue) => total = parseInt(total) + parseInt(currentValue.earning), 0) + parseInt(price)

        



        let stripee = await StripeKey.findOne({
            where:{id:1}
        })

        


        // const stripe = new Stripe('sk_test_51NmXVzCKgJrKUnRYxpabCAkohifegLHgkwhWfmUclK41k9V2RI1xf4zTdjdukh97X1O4Ebl7gRivs4CWwRA90Zgy00QPPW1awu')
        const stripe = new Stripe(stripee?.secretKey)


        console.log(price);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: price,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
              },
          });


          let transaction = await Transaction.create({ amount: price,userId:id,paymentMethod:'stripe' })
        let earnings = await Earning.create({ earning: price })


        let user = await User.update({ ...req.body, packageId, premium, numberOfUser, message, duration, packageDate, calls }, {
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: user,
            client_secret: paymentIntent.client_secret
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}






// 4.update product

const updateUser = async (req, res) => {

    try {
        let id = req.params.id
        console.log('abc')

        let getUser = await User.findOne({
            where: { id: id }
        })


        console.log(req.files)



        if(req.files){

        const selfie =  req.files.selfie === undefined ? getUser.dataValues.selfie : dbConfig.mainUrl + req.files.selfie[0].filename
        const image1 =  req.files.image1 === undefined ? getUser.dataValues.image1 : dbConfig.mainUrl + req.files.image1[0].filename
        const image2 =  req.files.image2 === undefined ? getUser.dataValues.image2 : dbConfig.mainUrl + req.files.image2[0].filename
        const image3 =  req.files.image3 === undefined ? getUser.dataValues.image3 : dbConfig.mainUrl + req.files.image3[0].filename
        const image4 =  req.files.image4 === undefined ? getUser.dataValues.image4 : dbConfig.mainUrl + req.files.image4[0].filename
        const image5 =  req.files.image5 === undefined ? getUser.dataValues.image5 : dbConfig.mainUrl + req.files.image5[0].filename
        const image6 =  req.files.image6 === undefined ? getUser.dataValues.image6 : dbConfig.mainUrl + req.files.image6[0].filename
        const image7 =  req.files.image7 === undefined ? getUser.dataValues.image7 : dbConfig.mainUrl + req.files.image7[0].filename

        const user = await User.update({ ...req.body, selfie,image1,image2,image3,image4,image5,image6,image7 }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: user
        })

    }
    else{
        const user = await User.update({ ...req.body }, {
            where: { id: id }
        }
        )
        res.status(200).json({
            status: 'ok',
            data: user
        })

    }

        
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}





const toggleUser = async (req, res) => {

    try {
        let id = req.params.id


        let getUser = await User.findOne({
            where: { id: id }
        })


        if (getUser?.status === true) {
            const user = await User.update({ status: false }, {
                where: { id: id }
            })
            res.status(200).json({
                status: 'ok',
                data: user
            })
        }
        else {
            const user = await User.update({ status: true }, {
                where: { id: id }
            })
            res.status(200).json({
                status: 'ok',
                data: user
            })
        }


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}





const NotuseappUser = async (req, res) => {

    try {
        let id = req.params.id


        const useAppDate = new Date()


        const user = await User.update({ useAppDate: useAppDate }, {
            where: { id: id }
        })

        res.status(200).json({
            status: 'ok',
            data: user
        })



    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}





// 5.delete product

const deleteUser = async (req, res) => {

    try {
        let id = req.params.id

        const user = await User.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: user
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addUsers,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getPackage,
    allUsers,
    toggleUser,
    NotuseappUser,
    NoUseappByUsers,
    getSingUserById,
}

