var express = require('express');
var router = express.Router();
const { connect, executeQuery } = require('../services/db.js');
const AddItemRequest = require('../models/addItemRequest.js');
const ApiResponse = require('../models/apiResponse.js');

/* GET home page. */
router.get('/allwords', async function (req, res, next) {
  let apiResponse = new ApiResponse(false,'','','')
  console.log('Request from Get',req);
  var wordsRes = await executeQuery('[dbo].[GetMemoItem]');
  apiResponse.data = wordsRes.recordset
  if(req.query?.error){
    apiResponse.message = req.query?.error
  }
  console.log(apiResponse);
  res.render('word',apiResponse);
});

/* GET home page. */
router.get('/review', async function (req, res, next) {

  let apiResponse = new ApiResponse(false,'','','')
  console.log('Request from Get',req.query);
  var queryParams = {
    Skip : req.query?.skip ?? 0,
    CategoryId : req.query?.categoryId
  }
  var reviewRes = await executeQuery('[dbo].[GetWordForReview]',queryParams);
  var categoriesRes = await executeQuery('[dbo].[GetMemoCategories]');
  apiResponse.data = {
    words : reviewRes.recordset,
    categories : categoriesRes.recordset
  }

  if(req.query?.error){
    apiResponse.message = req.query?.error
  }
  console.log(apiResponse);
  res.render('review',apiResponse);
});

module.exports = router;
