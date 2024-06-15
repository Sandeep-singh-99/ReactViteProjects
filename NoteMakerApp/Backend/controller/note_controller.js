const NoteModel = require("../Models/note_models")

const home = async (req, res) => {
    try {
        res.json("Welcome to the home page")
    } catch (error) {
        res.json("Internal server error")
    }
}

const getnote = async (req, res) => {
    try {
        const notes = await NoteModel.find()
        res.json(notes)
    } catch (error) {
        res.status(500).json("Internal server error")
    }
}

const addnote = async (req, res) => {
    try {
        const note = await NoteModel.create({
            title: req.body.title,
            content: req.body.content
        })
        res.json(note)
    } catch (error) {
        res.json("Internal server error")
    }
}

const updatenote = async (req, res) => {
    const {title, content} = req.body;
    const noteId = req.params.id;

    try {
        const updateNote = await NoteModel.findByIdAndUpdate(noteId,
            {title, content}, {new: true} 
        )
        res.json(updateNote)
    } catch (error) {
        res.json("Internal server error")
    }
}

const deletenote = async (req, res) => {
    const noteId = req.params.id;
    try {
        await NoteModel.findByIdAndDelete(noteId)
        res.json("delete note")
    } catch (error) {
        res.json("Internal server error")
    }
}

module.exports = {home, getnote, addnote, updatenote, deletenote}