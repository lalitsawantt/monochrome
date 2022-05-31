
const Category = require("../models/category");

exports.getCategoryById = (req,res,next,id) => {
  Category.findById(id).exec((err, cate) => {
    if(err){
      res.status(400).json({
        error:"Something went wrong, could not find the requested category"
      })
    }
    if(!cate){
      res.status(404).json({
        error:"Category not found"
      })
    }
    req.category = cate;
    console.log("middle ware category assignment : ", req.category);
  })
  next();
}

exports.createCategory = (req, res) => {
  if(req?.body){
    const category = new Category(req?.body);
    category.save((err, category) => {
      if(err){
        return res.status(400).json({
          error:"Not able to create a category"
        })
      }
      res.json({category});
    })
  }else{
    return res.status(400).json({
      error:"Invalid request for category saving"
    })
  }

}

exports.getCategory = (req, res) => {
  return res.json(req.category);
  // 
}

exports.getAllCategories = (req, res) => {
  // 
  Category.find().exec((err, categories) => {
    if(err){
      return res.status(400).json({
        error:"Cannot get categories"
      })
    }
    if(!categories){
      return res.status(404).json({
        error:"No categories found"
      })
    }
    return res.status(200).json(categories);
  })
}

exports.updateCategory = (req, res) => {

    if(req.category.name !== req.body.name){
      Category.find({"name":req.category.name}).exec((err, cat) => {
        console.log("ERR : ", err , " \n\n\n\n\n CAT  : ", cat);
      })
      Category.findOneAndReplace({"name":req.category.name},{"name":req.body.name}, {new: true}, (err, category) => {
        if(err){
          return res.status(400).json({
            error:"Unable to update the category"
          })
        }
        if(!category){
          return res.status(404).json({
            error:"Category not found"
          })
        }
        return res.status(200).json(category);
      })
    }else{
      console.log("New name same as old name");
      return res.status(400).json({
        error:"New name same as old name, cannot update"
      });
    }
}

exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if(err){
      return res.status(400).json({
        error:`Failed to remove category ${category}`
      })
    }
    if(!updatedCategory){
      return res.status(404).json({
        error:"No category found"
      })
    }
    res.status(200).json({
      message: `${category} deleted successfully`
    })
  })
}