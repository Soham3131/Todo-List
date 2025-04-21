const express = require('express');
const router = express.Router();

const {createTodo,getTodos,getTodo,updateTodo,deleteTodo} = require("../controllers/todoController")

router.post('/createTodo', createTodo);
router.get('/getTodos', getTodos);
router.get('/:id/getTodo', getTodo);
router.put('/:id/updateTodo', updateTodo);
router.delete('/:id/deleteTodo',deleteTodo)


module.exports = router;