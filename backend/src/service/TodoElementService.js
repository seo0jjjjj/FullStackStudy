class TodoElementService{
  constructor(todoElementRepository){
    this.todoElementRepository = todoElementRepository;
  }
  
  /// CREATE
  async Insert(content) {
    return this.todoElementRepository.InsertOne(content);
  }

  /// Read
  async findAll() {
    return this.todoElementRepository.findAll();
  }
  async findById(id){
    return this.todoElementRepository.findOne(id);
  }

  /// Update
  async updateById(id,content){
    return this.todoElementRepository.updateOne(id,content);
  }

  //DELETE
  async deleteById(id){
    return this.todoElementRepository.deleteOne(id);
  }
}

module.exports = TodoElementService;