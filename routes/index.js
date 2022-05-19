var express = require('express');
var router = express.Router();
var contactModel = require('../model/contact.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Xem */
router.get('/xem', function(req, res, next) {
  contactModel.find({}, function(err,dulieu) {
    res.render('xem', { title: 'Xem dữ liệu',data:dulieu });
    console.log(dulieu);
  })
});

/* Xoa */
router.get('/xoa/:idcanxoa', function(req, res, next) {
  var id2 = req.params.idcanxoa;
  contactModel.findByIdAndRemove(id2).exec();
  res.redirect('/xem');
});

/* Sua du lieu lấy về dữ liệu cần sửa */
router.get('/sua/:idcanxoa', function(req, res, next) {
  var id2 = req.params.idcanxoa;
  contactModel.find({_id:id2},function(err,dulieu) {
    res.render('sua',{title:"Sửa dữ liệu", data:dulieu})
  })
});


/* Sua du lieu dạng POST ng dùng submit thì ta lưu vào CSDL */
router.post('/sua/:idcanxoa', function(req, res, next) {
  var id2 = req.params.idcanxoa;
  contactModel.findById(id2,function(err,dulieu) {
    if(err) return handleError(err);
    dulieu.ten = req.body.ten;
    dulieu.tuoi = req.body.tuoi;
    dulieu.save();
    res.redirect('/xem');
  }) 
});

/* Thêm dữ liệu */
router.get('/them', function(req, res, next) {
  res.render('them',{title:"Thêm dữ liệu"});
});
/* Thêm dữ liệu post*/
router.post('/them', function(req, res, next) {
  var phantu = {
    'ten': req.body.ten,
    'tuoi': req.body.tuoi
  }
  var dulieu = new contactModel(phantu);
  dulieu.save();
  res.redirect('xem');
});


module.exports = router;



