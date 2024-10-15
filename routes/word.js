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

router.get('/categories', async function (req, res, next) {

  let apiResponse = new ApiResponse(false,'','','')
  var categoriesRes = await executeQuery('[dbo].[GetMemoCategories]');
  apiResponse.data = categoriesRes.recordset
  if(req.query?.error){
    apiResponse.message = req.query?.error
  }
  console.log(apiResponse);
  res.json(apiResponse);
});

router.post('/editword', async function (req, res, next) {

  let apiResponse = new ApiResponse(false,'','','')
  const params = {
    Id : req.body.Id,
    Item : req.body.Item,
    Description : req.body.Description,
    ItemMeaningEn : req.body.ItemMeaningEn,
    ItemMeaningFa : req.body.ItemMeaningFa,
    ItemSynonymEn : req.body.ItemSynonymEn,
    Example : req.body.Example,
    Pronunciation : req.body.Pronunciation,
    CategoryId : req.body.CategoryId,
  }
  await executeQuery('[dbo].[EditMemoItem]',params);
  if(req.query?.error){
    apiResponse.message = req.query?.error
  }
  console.log(apiResponse);
  res.json(apiResponse);
});

module.exports = router;
