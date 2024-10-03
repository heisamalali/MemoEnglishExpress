var express = require('express');
var router = express.Router();
const { connect,executeQuery } = require('../services/db.js')
/* GET home page. */
router.get('/', async function(req, res, next) {
  var categoriesRes = await executeQuery('[dbo].[GetMemoCategories]');
  console.log(categoriesRes);
  res.render('index', { title: 'Express',categories : categoriesRes.recordset });
});

router.post('/NewWord', async function(req, res, next) {
   
  const values = [
    req.body.word,
    req.body.description,
    req.body.EnMeaning,
    req.body.FaMeaning,
    '',
    req.body.category]
  console.log(values);  
 const paramNames = ['Word','Description','ItemMeaningEn','ItemMeaningFa','ItemSynonymEn','CategoryId']
  await executeQuery('[dbo].[AddMemoItem]',values,paramNames)
  res.redirect('/');
});

module.exports = router;
