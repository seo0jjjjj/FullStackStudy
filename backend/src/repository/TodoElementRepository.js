const { ObjectId } = require("mongodb");

class TodoElementRepository{
  constructor(db){
    this.db = db; 
  }
  
  /// CREATE
  async InsertOne() {
    return this.db.collections.InsertOne();
  }

  /// Read
  async findAll() {
    return this.db.collections.find().toArray();
  }
  async findOne(id){
    return this.db.collections.findOne({_id : new ObjectId(id)});
  }

  /// Update
  async updateOne(id,_content){
    return this.db.collections.updateOne({_id : id}, { $set: {content: _content}});
  }

  //DELETE
  async deleteOne(id){
    return this.db.collections.deleteOne({_id: id})
  }
}

module.exports = TodoElementRepository;