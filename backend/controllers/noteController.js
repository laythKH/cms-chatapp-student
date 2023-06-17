

const getAllNote = async (req, res) => {
   res.send('getAllNote')
}

const createNote = async (req, res) => {
   res.send('createNote')
}
const updateNote = async (req, res) => {
   res.send('Update Note')
}
const deleteNote = async (req, res) => {
   res.send('delete Note')
}

export { createNote, updateNote, deleteNote, getAllNote }