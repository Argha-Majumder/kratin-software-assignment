module.exports.home = async (req, res) => {
    try {
        return res.render('home', {
            title: 'Geriatric Medical Services'
        });
    } catch (err) {
        console.error(err);
    }
}