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