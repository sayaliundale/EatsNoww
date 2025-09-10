const isAdmin = async (req, res, next)=>{
    if(req.user.role !="admin"){
        res.status(400).send("Permission denied!");
    }
    next();
}

module.exports = isAdmin;