var express = require('express');
var router = express.Router();
const { connect,executeQuery } = require('../services/db.js');
const AddItemRequest = require('../models/addItemRequest.js');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var categoriesRes = await executeQuery('[dbo].[GetMemoCategories]');
  console.log(categoriesRes);
  res.render('index', { title: 'Express',categories : categoriesRes.recordset });
});

/* Add new word */
router.post('/NewWord', async function(req, res, next) {
 try {
  const addItemRequest = new AddItemRequest(
    req.body.word,
    req.body.description,
    req.body.EnMeaning,
    req.body.FaMeaning,
    '',
    req.body.category
 )
  console.log('addItemRequest',addItemRequest)
  await executeQuery('[dbo].[AddMemoItem]',addItemRequest)
  res.redirect('/');
 } catch (error) {
  res.redirect('/');
 } 
 
});

module.exports = router;
