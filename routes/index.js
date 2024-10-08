var express = require('express');
var router = express.Router();
const { connect, executeQuery } = require('../services/db.js');
const AddItemRequest = require('../models/addItemRequest.js');
const ApiResponse = require('../models/apiResponse.js');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let apiResponse = new ApiResponse(false,'','','')
  console.log('Request from Get',req);
  var categoriesRes = await executeQuery('[dbo].[GetMemoCategories]');
  apiResponse.data = categoriesRes.recordset
  if(req.query?.error){
    apiResponse.message = req.query?.error
  }
  console.log(apiResponse);
  res.render('index', apiResponse);
});

/* Add new word */
router.post('/NewWord', async function (req, res, next) {
  const addItemRequest = new AddItemRequest(
    req.body.word,
    req.body.description,
    req.body.enMeaning,
    req.body.faMeaning,
    req.body.synonymEn,
    req.body.example,
    req.body.category,
  )
  try {
    console.log('addItemRequest', addItemRequest)
    var addMemoItemRes = await executeQuery('[dbo].[AddMemoItem]', addItemRequest)
    console.log('addMemoItemResponse',addMemoItemRes)
    
    res.redirect('/');
  } catch (error) {
    res.redirect(`/?error=${error.originalError?.info?.message ?? "error in save"}`);
  }

});

module.exports = router;
