const Todo = require("../models/Todo")

exports.createTodo=async(req,res)=>{
  try{
    const {title,description}=req.body;
    const newTodo=new Todo({title,description});
    await newTodo.save();
    res.status(201).json(newTodo);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
  
}

exports.getTodos = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = 100; 
  const searchQuery = req.query.search || ""; 

  try {
    // Fetch todos 
    const todos = await Todo.find({ title: { $regex: searchQuery, $options: "i" } })
      .sort({ date: -1 }) // Sorting 
      .skip((page - 1) * limit) 
      .limit(limit); 


    const total = await Todo.countDocuments({ title: { $regex: searchQuery, $options: "i" } });

    res.status(200).json({
      data: todos,
      totalPages: Math.ceil(total / limit), // Total
      currentPage: page, 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


//     const page = parseInt(req.query.page) || 1
//     const limit =5

//     try{
//         const todos= await Todo.find()
//         .sort({date:-1})
//         .skip((page-1)*limit)
//         .limit(limit)

//         const total = await Todo.countDocuments();

//         res.status(200).json({
//             data:todos,
//             totalPages:Math.ceil(total/limit),
//             currentpage:page
//         })
//     }
//     catch (err) {
//         res.status(500).json({ error: err.message });
//       }
    

// }

//by idf
exports.getTodo = async (req, res) => {
    try {
      const todo = await Todo.findById(req.params.id);
      res.status(200).json(todo);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };


  exports.updateTodo=async(req,res)=>{
    try{
       const updatedTodo= await Todo.findByIdAndUpdate((req.params.id),
       {...req.body},
       {new:true}
    )
    res.status(200).json(updatedTodo)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
  }

  exports.deleteTodo=async(req,res)=>{
    try{
        const deleteTodo= await Todo.findByIdAndDelete(req.params.id)
        if (!deleteTodo) {
            return res.status(404).json({ message: "Todo not found" });
          }
          res.status(200).json(deleteTodo);
      
    res.status(200).json(deleteTodo)
    }
    catch(err){
        res.status(500).json({ error: err.message });
    }
  }


