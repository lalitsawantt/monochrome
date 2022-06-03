const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("node:fs");
const category = require("../models/category");

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

exports.getProduct = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
}

exports.photo = (req, res, next) => {
  if(req.product.photo.data){
    res.set("Content-type",req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
}

exports.updateProduct = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, file) => {
    if(err){
      res.status(400).json({
        error:"Unable to save the file"
      })
    }
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
    let product = req.product;
    // extends the product, overwrites any conflicting values with the second object, i.e. fields
    product = _.extend(product, fields);
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
          error:"Could not update the product in db"
        })
      }
      return res.status(200).json(product);
    })
  })
}

exports.deleteProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if(err){
      return res.status(400).json({
        err:"Failed product deletion"
      })
    }
    if(!deletedProduct){
      return res.status(404).json({
        err:"product not found"
      })
    }
    return res.status(200).json(deletedProduct);
  })
}

exports.getAllProducts = (req, res) => {
  let limit = parseInt(req?.query?.limit) ?? 5;
  let sortBy = req.query?.sortBy ?? "_id";
  Product.find()
  .select("-photo")
  .populate("category")
  .sort([[sortBy, "asc"]])
  .limit()
  .exec((err, products) => {
    if(err){
      return res.status(400).json({
        err:"Could not fetch products"
      })
    }
    if(!products){
      return res.status(404).json({
        err:"No products found"
      })
    }
    return res.status(200).json(products);
  })
}

exports.updateStock = (req, res, next) => {
  let operations = req.body.order.products.map((prod) => {
    return {
      updateOne : {
        filter:{_id:prod._id},
        update:{$inc:{stock: -prod.count, sold: +prod.count}}
      }
    }
  })

  Product.bulkWrite(operations, {}, (err, products) => {
    if(err){
      return res.status(400).json({
        err:"Could not update products"
      })
    }
    if(!products){
      return res.status(404).json({
        err:"No products to update"
      })
    }
    res.status(200).json(products);
    next();
  })
}

exports.getAllCategories = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if(err){
      res.status(400).json({
        err:"Could not fetch all categories"
      })
    }
    if(!category){
      res.status(400).json({
        err:"No categories present"
      })
    }
    return res.status(200).json(category);
  })
}