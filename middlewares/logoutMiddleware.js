
module.exports = function logoutMiddleware(req, res) {
    const header_authorization = req.headers['authorization'];

    if(typeof header_authorization) {
        res.clearCookie("jwt");
        res.json({logout: 'success'})
        
    }
}
                
