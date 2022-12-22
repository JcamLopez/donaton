const controller = {};


controller.vista_index = (req, res) => {
    if (req.session.passport) {
        console.log(req.session.passport.user.id)
    }
    res.render('./index')
}


export default controller