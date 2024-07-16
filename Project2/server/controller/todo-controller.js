const ToDo = require("../model/todoModel")
const History = require("../model/historyModel")



const addContent = async (req, res) => {
    try {
        const {content, date} = req.body

        const todo = await ToDo.create({content, date})
        
        if (content) {
            await History.create({ historys: todo._id });
        }

        res.json({
            msg: "Successfully",
            token: await todo.generateToken(),
            userId: todo._id.toString()
        })
    } catch (error) {
        console.error('Error adding content:', error);
        res.status(500).json("Internal server error")
    }
}

const getContent = async (req, res) => {
    try {
        const todos = await ToDo.find({})
        // const historyEntry = await History.find({historys: todos._id})

        // res.status(200).json(historyEntry)
        res.status(200).json(todos)
    } catch (error) {
        res.status(500).json(error)
    }
}

const deleteContent = async (req, res) => {
    try {
        const {id} = req.params;
        const deleteToDo = await ToDo.findByIdAndDelete(id)
        if (!deleteToDo) {
            return res.status(404).json({ msg: 'Content not found' });
        }
        res.status(200).json({ msg: 'Content deleted successfully' });
    } catch (error) {
        res.status(500).json(error)
    }
}

const getHistory = async (req, res) => {
    try {
      
        const history = await History.find().populate('historys', 'content').exec()

        if (history.length === 0) {
            return res.status(404).json({ msg: 'No history found' });
        }

        const processedHistory = history.map(item => ({
            ...item._doc,
            historys: item.historys ? item.historys : { content: "No content available" }
        }));

        
        res.status(200).json(processedHistory)
    } catch (error) {
        console.error('Error fetching history:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
}


module.exports = {addContent, getHistory, getContent, deleteContent}