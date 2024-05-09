class TodoElementController{
  constructor(todoElementService){
    this.todoElementService = todoElementService;
  }

  async getTodos(req,res){
    let result = await this.todoElementService.findAll();
    res.status(200).json(result);
  } 

}

module.exports = TodoElementController;