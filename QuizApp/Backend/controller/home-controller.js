const home = async (req, res) => {
    try {
        res.json('Welcome to Home Page')
    } catch (error) {
        res.json(error)
    }
}

module.exports = {home}