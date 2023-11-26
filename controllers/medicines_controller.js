const Medicine = require('../models/medicine');

module.exports.view = async (req, res) => {
    try {
        let medicineLists = await Medicine.find({})
                            .sort('-createdAt');
        return res.render('medicine_view', {
            title: "Your Medicine Reminder",
            medicineLists: medicineLists
        })
    } catch (err) {
        console.log('Error in viewing the lists');
        return res.redirect('back');
    }
}

module.exports.create = async (req, res) => {
    try {
        let today = getToday();
        if (req.body.date < today) {
            // alert
            return res.status(400).json({message: "Invalid date"});
        } else if (today == req.body.date) {
            let timeToday = getTime();
            if (req.body.time < timeToday) {
                // alert
                return res.status(400).json({message: "Invalid time"});
            }
        }
        //console.log(req.body);
        let medicine = await Medicine.findOne({title: req.body.medicine_name, user: req.user._id});
        if (!medicine) {
            let newMedicine = await Medicine.create({
                title: req.body.medicine_name,
                user: req.user._id,
                dates: {date: req.body.date, time: req.body.time}
            });
        } else {
            let dates = medicine.dates;
            let flag = true;
            for (let date of dates) {
                if (date.date==req.body.date && date.time==req.body.time) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                dates.push({date: req.body.date, time: req.body.time});
                medicine.dates = dates;
                await medicine.save();
            }
        }
        return res.redirect('back');
    } catch (err) {
        console.log("Error in adding medicine",err);
        return;
    }
}

module.exports.delete = async (req, res) => {
    try {
        const title = req.query.title;
        const date = req.query.date;
        const time = req.query.time;
        let medicine = await Medicine.findOne({title: title});
        let dateList = medicine.dates;
        if (dateList.length != 1) {
            let index = dateList.findIndex(item => item.date==date && item.time==time);
            if (index != -1) {
                dateList.splice(index,1);
            }
            medicine.dates = dateList;
            await medicine.save();
        } else {
            await Medicine.deleteOne(medicine._id);
        }
        return res.redirect('back');
    } catch (err) {
        console.log('Error in deleting data',err);
        return;
    }
}

function getToday() {
    let date = new Date();
    return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}

function getTime() {
    let date = new Date();
    let hours = 0;
    let minutes = 0;
    if (date.getHours()<10) {
        hours = '0'+date.getHours();
    }
    if (date.getMinutes()<10) {
        minutes = '0'+date.getMinutes();
    }
    return hours+":"+minutes;
}