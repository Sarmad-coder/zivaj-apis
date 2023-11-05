const db = require('../models');
const dbConfig = require('../config/dbConfig.js');
const { Op } = require('sequelize');


// create main model
const Preferences = db.preferences;
const User = db.user;
const Reel = db.reel;
const Follow = db.follow;


// main work




// 1.create product
const addpreferences = async (req, res) => {

    try {



        let info = {
            userId: req.body.userId,
            startAge: req.body.startAge,
            endAge: req.body.endAge,
            startHeight: req.body.startHeight,
            endHeight: req.body.endHeight,
            maritalStatus: req.body.maritalStatus,
            country: req.body.country,
            state: req.body.state,
            religion: req.body.religion,
            tongue: req.body.tongue,
            community: req.body.community,
            gender: req.body.gender,
            qualification: req.body.qualification,
            workingWith: req.body.workingWith,
            workingAs: req.body.workingAs,
            annualIncome: req.body.annualIncome,
            profileFor: req.body.profileFor,
        }



        const preferences = await Preferences.create(info)
        res.status(200).json({
            status: 'ok',
            data: preferences,
        })


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}



// 2.get all products

const getpreferencesById = async (req, res) => {

    try {

        let id = req.params.id

        let preferencess = await Preferences.findOne({
            where: { userId: id }
        })
        res.status(200).json({
            status: 'ok',
            data: preferencess
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getpreferences = async (req, res) => {



    try {
        let prefid = req.params.prefid
        let useid = req.params.useid

        var total = 0
        var count = 0


        let mypreferences = await Preferences.findOne({
            where: { userId: prefid }
        })
        let userpreferences = await User.findOne({
            where: { id: useid }
        })
        console.log('===================>>>>>>>>alll profile')

        if (mypreferences) {

            if (userpreferences) {

                const maritalStatus = mypreferences.maritalStatus
                const country = mypreferences.country
                const state = mypreferences.state
                const religion = mypreferences.religion
                const tongue = mypreferences.tongue
                const community = mypreferences.community
                const qualification = mypreferences.qualification
                const gender = mypreferences.gender
                const workingWith = mypreferences.workingWith
                const workingAs = mypreferences.workingAs
                const startAge = mypreferences.startAge
                const startHeight = mypreferences.startHeight
                const annualIncome = mypreferences.annualIncome
                const endAge = mypreferences.endAge
                const endHeight = mypreferences.endHeight
                const profileFor = mypreferences.profileFor

                console.log('alll profile')

                const allCol = [startAge, startHeight, maritalStatus, country, state, religion, tongue, community, gender, qualification, workingWith, workingAs, annualIncome, profileFor]



                console.log(allCol, 'alll profile')

                for (let i = 0; i < allCol.length; i++) {
                    if (allCol[i] !== null) {
                        total += 1
                    }
                }



                if (userpreferences.maritalStatus !== null && userpreferences.maritalStatus !== 'null') {

                    if (maritalStatus === userpreferences.maritalStatus) {
                        count += 1
                        console.log("marital status")
                    }
                }


                if (userpreferences.country !== null && userpreferences.country !== 'null') {
                    if (country === userpreferences.country) {
                        count += 1
                        console.log("country")

                    }
                }


                if (userpreferences.state !== null && userpreferences.state !== 'null') {
                    if (state === userpreferences.state) {
                        count += 1
                        console.log("state")
                    }
                }



                if (userpreferences.religion !== null && userpreferences.religion !== 'null') {
                    if (religion === userpreferences.religion) {
                        count += 1
                        console.log("religion")
                    }
                }


                if (userpreferences.tongue !== null && userpreferences.tongue !== 'null') {
                    if (tongue === userpreferences.tongue) {
                        count += 1
                        console.log("tongue")
                    }
                }



                if (userpreferences.community !== null && userpreferences.community !== 'null') {
                    if (community === userpreferences.community) {
                        count += 1
                        console.log("community")
                    }
                }



                if (userpreferences.qualification !== null && userpreferences.qualification !== 'null') {
                    if (qualification === userpreferences.qualification) {
                        count += 1
                        console.log("qualification")
                    }
                }



                if (userpreferences.workingWith !== null && userpreferences.workingWith !== 'null') {
                    if (workingWith === userpreferences.workingWith) {
                        count += 1
                        console.log("working with")
                    }
                }


                if (userpreferences.workingAs !== null && userpreferences.workingAs !== 'null') {
                    if (workingAs === userpreferences.workingAs) {
                        count += 1
                        console.log("working as")
                    }
                }



                if (userpreferences.annualIncome !== null && userpreferences.annualIncome !== 'null') {
                    if (annualIncome === userpreferences.annualIncome) {
                        count += 1
                        console.log("annual income")
                    }
                }

                if (userpreferences.profileFor !== null && userpreferences.profileFor !== 'null') {
                    if (profileFor === userpreferences.profileFor) {
                        count += 1
                        console.log("profile for")
                    }
                }




                let userage = await User.findOne({
                    where: {
                        id: useid, dob: {
                            [Op.between]: [startAge, endAge]
                        }
                    }
                })



                let userheight = await User.findOne({
                    where: {
                        id: useid, dob: {
                            [Op.between]: [startHeight, endHeight]
                        }
                    }
                })



                if (userage) {
                    count += 1;
                    console.log("user age")
                }


                if (userheight) {
                    count += 1;
                    console.log("user height")
                }





                res.status(200).json({
                    status: 'ok',
                    data: `You match ${count}/${total} of her preferences.`
                })

            }


        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}


// 3.get product by id
const getAllpreferences = async (req, res) => {




    try {

        let id = req.params.id



        const alldata = []

        let myPreferences = await Preferences.findOne({
            where: { userId: id }
        })
        let userPreferences = await User.findAll({
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
            where:{
                id: { [Op.not]: id }
            }
        })



        if (myPreferences) {


            if (userPreferences) {

                for (let mUser = 0; mUser < userPreferences.length; mUser++) {

                    var total = 0
                    var count = 0

                    const maritalStatus = myPreferences.maritalStatus
                    const country = myPreferences.country
                    const state = myPreferences.state
                    const religion = myPreferences.religion
                    const tongue = myPreferences.tongue
                    const community = myPreferences.community
                    const qualification = myPreferences.qualification
                    const gender = myPreferences.gender
                    const workingWith = myPreferences.workingWith
                    const workingAs = myPreferences.workingAs
                    const startAge = myPreferences.startAge
                    const startHeight = myPreferences.startHeight
                    const annualIncome = myPreferences.annualIncome
                    const endAge = myPreferences.endAge
                    const endHeight = myPreferences.endHeight
                    const profileFor = myPreferences.profileFor

                    const allCol = [startAge, startHeight, maritalStatus, country, state, religion, tongue, community, gender, qualification, workingWith, workingAs, annualIncome, profileFor]

                    for (let i = 0; i < allCol.length; i++) {
                        if (allCol[i] !== null) {
                            total += 1
                        }
                    }




                    if (userPreferences[mUser].maritalStatus !== null && userPreferences[mUser].maritalStatus !== 'null') {
                        if (maritalStatus === userPreferences[mUser].maritalStatus) {
                            count += 1
                        }
                    }



                    if (userPreferences[mUser].country !== null && userPreferences[mUser].country !== 'null') {
                        if (country === userPreferences[mUser].country) {
                            count += 1
                        }
                    }



                    if (userPreferences[mUser].state !== null && userPreferences[mUser].state !== 'null') {
                        if (state === userPreferences[mUser].state) {
                            count += 1
                        }
                    }



                    if (userPreferences[mUser].religion !== null && userPreferences[mUser].religion !== 'null') {
                        if (religion === userPreferences[mUser].religion) {
                            count += 1
                        }
                    }



                    if (userPreferences[mUser].tongue !== null && userPreferences[mUser].tongue !== 'null') {
                        if (tongue === userPreferences[mUser].tongue) {
                            count += 1
                        }
                    }



                    if (userPreferences[mUser].community !== null && userPreferences[mUser].community !== 'null') {
                        if (community === userPreferences[mUser].community) {
                            count += 1
                        }
                    }



                    if (userPreferences[mUser].qualification !== null && userPreferences[mUser].qualification !== 'null') {
                        if (qualification === userPreferences[mUser].qualification) {
                            count += 1
                        }
                    }



                    if (userPreferences[mUser].workingWith !== null && userPreferences[mUser].workingWith !== 'null') {
                        if (workingWith === userPreferences[mUser].workingWith) {
                            count += 1
                        }
                    }


                    if (userPreferences[mUser].workingAs !== null && userPreferences[mUser].workingAs !== 'null') {
                        if (workingAs === userPreferences[mUser].workingAs) {
                            count += 1
                        }
                    }



                    if (userPreferences[mUser].annualIncome !== null && userPreferences[mUser].annualIncome !== 'null') {
                        if (annualIncome === userPreferences[mUser].annualIncome) {
                            count += 1
                        }
                    }



                    if (userPreferences[mUser].profileFor !== null && userPreferences[mUser].profileFor !== 'null') {
                        if (profileFor === userPreferences[mUser].profileFor) {
                            count += 1
                        }
                    }




                    let userage = await User.findOne({
                        where: {
                            id: userPreferences[mUser].id, dob: {
                                [Op.between]: [startAge, endAge]
                            }
                        }
                    })



                    let userheight = await User.findOne({
                        where: {
                            id: userPreferences[mUser].id, dob: {
                                [Op.between]: [startHeight, endHeight]
                            }
                        }
                    })



                    if (userage) {
                        count += 1;
                    }


                    if (userheight) {
                        count += 1;
                    }

                    console.log()


                    if (parseInt(total) / 2 <= parseInt(count)) {
                        alldata.push({ data: userPreferences[mUser], message: `You match ${count}/${total} of her preferences.` })
                    }



                }

                if (parseInt(parseInt(total) / 2) >= parseInt(count)) {
                    return res.status(200).json({
                        status: 'ok',
                        data: alldata
                    })
                }
                else {
                    return res.status(200).json({
                        status: 'fail',
                        message: `You match ${count}/${total} of her preferences.`,
                        data:[]
                    })
                }
            }

        }
        else{
            res.status(200).json({
                status: 'fail',
                message:'Nothing matched.',
                data:[]
            })
        }
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }

}





// 4.update product

const updatepreferences = async (req, res) => {

    try {
        let id = req.params.id


        let getpreferences = await Preferences.findOne({
            where: { userId: id }
        })


        if (!getpreferences) {
            let info = {
                userId: req.body.userId,
                startAge: req.body.startAge,
                endAge: req.body.endAge,
                startHeight: req.body.startHeight,
                endHeight: req.body.endHeight,
                maritalStatus: req.body.maritalStatus,
                country: req.body.country,
                state: req.body.state,
                religion: req.body.religion,
                tongue: req.body.tongue,
                community: req.body.community,
                gender: req.body.gender,
                qualification: req.body.qualification,
                workingWith: req.body.workingWith,
                workingAs: req.body.workingAs,
                annualIncome: req.body.annualIncome,
            }



            const preferences = await Preferences.create(info)
            res.status(200).json({
                status: 'ok',
                data: preferences,
            })
        }
        else {

            const preferences = await Preferences.update({ ...req.body }, {
                where: { userId: id }
            }
            )
            res.status(200).json({
                status: 'ok',
                data: preferences
            })
        }


    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }



}


// 5.delete product

const deletepreferences = async (req, res) => {

    try {
        let id = req.params.id

        const preferences = await Preferences.destroy({
            where: { id: id }
        })
        res.status(200).json({
            status: 'ok',
            data: preferences
        })
    } catch (err) {
        res.status(500).json({
            error: err.message
        })
    }


}







module.exports = {
    addpreferences,
    getpreferences,
    getpreferencesById,
    updatepreferences,
    deletepreferences,
    getAllpreferences,
}

