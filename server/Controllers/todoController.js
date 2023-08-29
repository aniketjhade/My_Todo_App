const Todo = require("../Modals/Todo");

exports.createTodo = async (req, res) => {

    try {
        const { title, completed, pending } = req.body;

        if (!title || !completed || !pending) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            });
        }

        const titlePresent = await Todo.findOne({ title });
        console.log(titlePresent);
        if (title === titlePresent?.title) {
            return res.status(400).json({
                success: true,
                message: "This Todo is Already Present",
            });
        }

        const todo = await Todo.create({ title, completed, pending });

        return res.status(200).json({
            success: true,
            message: "ToDo Created Successfully",
            data: todo,
        });

    } catch (e) {
        console.log("error while creating todo ", e.message);
        return res.status(500).json({
            success: false,
            message: "error while creating todo ",
            error: e.message,
        })
    }

}

// jabh delete kr diya agar bakhi cheejhe response mein send kr diya sahi rhega na // aage jaa k dekhenge idhar b try kr skte
exports.updateTodo = async (req, res) => {

    try {
        const { title, pending, completed, todoId } = req.body;

        if (!title  || !todoId) {
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            });
        }

        // updatingTodoWithoutChanging 
        const curTodo = await Todo.findById(todoId);
        console.log(curTodo);

        // if (curTodo.title === title && curTodo.pending === pending && curTodo.completed === completed) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "Cant update with same details",
        //     })
        // }

        const todoToBeUpdated = await Todo.findByIdAndUpdate({ _id: todoId }, { title, pending, completed }, { next: true, returnOriginal: false }).exec();

        if (!todoToBeUpdated) {
            return res.status(404).json({
                success: false,
                message: "Unable to find the user to update",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated Successfully",
            data: todoToBeUpdated,
        });
    } catch (e) {
        console.log("error while updating todo ", e.message);
        return res.status(500).json({
            success: false,
            message: "error while updating todo ",
            error: e.message,
        });

    }

}


// jabh delete kr diya agar bakhi cheejhe response mein send kr diya sahi rhega na // aage jaa k dekhenge

exports.deleteTodo = async (req, res) => {

    try {
        const { todoId } = req.body;

        console.log("in server",todoId);
        if (!todoId) {
            return res.status(404).json({
                success: false,
                message: "TodoId is Required",
            });
        }

        await Todo.findByIdAndDelete({ _id: todoId }).exec();

        return res.status(200).json({
            success: true,
            message: "Todo Deleted Successfully",
        });

    } catch (e) {
        console.log("error while deleting todo ", e.message);
        return res.status(500).json({
            success: false,
            message: "error while deleting todo ",
            error: e.message,
        });
    }


}

exports.showAllTodos = async (req, res) => {
    try {

        const Todos = await Todo.find({});
         res.status(200).json({
            success: true,
            message: "All todos fetched Successfully",
                Todos

        });

    } catch (e) {
        console.log("error while Fetching all todos ", e.message);
        return res.status(500).json({
            success: false,
            message: "error while Fetching all todos ",
            error: e.message,
        });
    }
}

exports.showCompleted = async (req, res) => {
    try {

        const showCompleted = await Todo.find({ completed: true });
        console.log(showCompleted);
        return res.status(200).json({
            success: true,
            message: "Completed Todos Fetched Successfully",
            showCompleted,
        });

    } catch (e) {
        console.log("error while Fetching Completed todos ", e.message);
        return res.status(500).json({
            success: false,
            message: "error while Fetching Completed todos ",
            error: e.message,
        });
    }
}

exports.showPending = async (req, res) => {
    try {

        const showPending = await Todo.find({ pending: true });
        console.log(showPending);
        return res.status(200).json({
            success: true,
            message: "Completed Todos Fetched Successfully",
            showPending,
        });

    } catch (e) {
        console.log("error while Fetching Completed todos ", e.message);
        return res.status(500).json({
            success: false,
            message: "error while Fetching Completed todos ",
            error: e.message,
        });
    }
}

exports.pendingToCompleted = async (req, res) => {

    try {
        const { todoId } = req.body;

        if (!todoId) {
            return res.status(404).json({
                success: false,
                message: "TodoId is Required",
            });
        }

        const updatedStatus = await Todo.findByIdAndUpdate({ _id: todoId }, { completed: 'true', pending: 'false' }, { new: true, returnOriginal: false });
        console.log(updatedStatus);
        if (!updatedStatus) {
            return res.status(404).json({
                success: false,
                message: "Unable to find the user to change Status",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated Successfully",
            data: updatedStatus,
        });
    } catch (e) {
        console.log("error while pending to completed status", e.message);
        return res.status(500).json({
            success: false,
            message: "error while pending to completed status ",
            error: e.message,
        });
    }
}


exports.searchByTitle = async (req,res)=>{
        try {
            const {title} = req.body;
            // console.log("id is",);


            if(!title){
                return res.status(403).json({
                    success:false,
                    message:"Problem in fetching",
                });
            }
            const todoItems= await Todo.findOne({title});

            if(!todoItems){
                return res.status(403).json({
                    success:false,
                    message:"Unable to find the data",
                })
            }

            return res.status(200).json({
                success:true,
                message: "Search for titles fetched successfully",
                data:todoItems,
            });


        } catch (e) {
                    console.log(e.message);
                    return res.status(403).json({
                        success:false,
                        message:"Unable to search",
                    })
        }
}   