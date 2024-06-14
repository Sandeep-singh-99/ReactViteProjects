const home = async (req, res) => {
    try {
        res.json("Welcome to the home page")
    } catch (error) {
        res.json("Internal server error")
    }
}

const getnote = async (req, res) => {
    try {
        res.json('Get Note')
    } catch (error) {
        res.json("Internal server error")
    }
}

const addnote = (req, res) => {
    try {
        res.json("add note")
    } catch (error) {
        res.json("Internal server error")
    }
}

const updatenote = (req, res) => {
    try {
        res.json("update note")
    } catch (error) {
        res.json("Internal server error")
    }
}

const deletenote = (req, res) => {
    try {
        res.json("delete note")
    } catch (error) {
        res.json("Internal server error")
    }
}

module.exports = {home, getnote, addnote, updatenote, deletenote}