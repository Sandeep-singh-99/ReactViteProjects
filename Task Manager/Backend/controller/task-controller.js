const home = (req, res) => {
    try {
        res.json("Welcome to Home Page")
    } catch (error) {
        res.json("Internal server error")
    }
}



module.exports = {home}