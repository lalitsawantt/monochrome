const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("node:fs");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
  .populate("category")
  .exec((err, prod) => {
    if(err){
      res.status(400).json({
        error:"Something went wrong while getting the product"
      })
    }
    if(!prod){
      res.status(400).json({
        error:"Product not found"
      })
    }
    req.product = prod;
    next();
  })
}

exports.createProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if(err){
      res.status(400).json({
        error:"Unable to save the file"
      })
    }
    // TODO: restrictions on field
    // destructuring the fields
    const { name, description, price, category, stock, sold, photo, dimension } = fields;

    if(
      !name ||
      !description ||
      !price ||
      !category ||
      !stock || 
      !sold ||
      !file ||
      !dimension
    ){
      let errorFields = [
        {name:!!name},
        {description:!!description},
        {file:!!file},
        {price:!!price},
        {category:!!category},
        {stock:!!stock},
        {sold:!!sold},
        {dimension:!!dimension}
      ]
      return res.status(400).json({
        error:"Please include all fields",
        missing:errorFields.filter((item) => !item[Object.keys(item)[0]]).map((item) => Object.keys(item))
      })
    }
    let product = new Product(fields);
    if(file.photo){
      if(file.photo.size > (5 * 1024 * 1024)){
        return res.status(400).json({
          error:"File size too big, must be under 5 mb"
        })
      }
      
    }
    // save the product
    product.photo.data = fs.readFileSync(file.photo.filepath);
    product.photo.contentType = file.photo.mimetype;
    product.save((err, product) => {
      if(err){
        return res.status(400).json({
          error:"Could not save the product in db"
        })
      }
      return res.status(200).json(product);
    })
  })
}