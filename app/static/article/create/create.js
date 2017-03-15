$(function(){
var style = '<link rel="stylesheet" href="http://localhost/pressto/app/article/templates/article/create.css">' + '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.10.0/styles/default.min.css">' + '<link rel="stylesheet" href="http://localhost/pressto/app/article/templates/article/markdown.css"> ';
$('head link:last').after(style);


console.log("hello world");
marked.setOptions({langPrefix:''});
//------------------------------------------------------------------------------

var old = "";
$('#writearea').keyup(function(e){
  var v = $(this).val();
  if(old != v){
    old = v;
    change_view();
  }
});


var change_func = (function() {
  // 間引き間隔
  var interval = 200;
  // 最後に実行した時間
  var lastTime = new Date().getTime() - interval
  return function() {
    // 最後に実行した時間から間引きたい時間経過していたら実行
    if ((lastTime + interval) <= new Date().getTime()) {
      lastTime = new Date().getTime();
    // 処理ここから
    change_view()
    // 処理ここまで
    }
  };
})();

function change_view(){
  var str = $('#writearea').val();

  var mtc = str.match(/%\[([^\]]*)\]\(http:\/\/([^)]*)\)/);
  while(mtc != null){
    var tmp_str = '%\\)%\\(%' + mtc[1] + '\\' + mtc[2].replace(/\//,'\/') + '\\';
    str = str.replace(/%\[([^\]]*)\]\(http:\/\/([^)]*)\)/,tmp_str);
    mtc = str.match(/%\[([^\]]*)\]\(http:\/\/([^)]*)\)/);
  }
  str = marked(str);

  mtc = str.match(/%\)%\(%([^\\]*)\\([^\\]*)\\/);
  while(mtc != null){
    var tmp_str = '<audio src="http://' + mtc[2] + '" controls>' + mtc[1] + "</audio><br>";
    str = str.replace(/%\)%\(%([^\\]*)\\([^\\]*)\\/,tmp_str)
    mtc = str.match(/%\)%\(%([^\\]*)\\([^\\]*)\\/);
  }
  console.log(str);

  $('#viewarea').html(str);
}

var next_img_id = 0;
//写真部分
$('#file_photo').change(function(){
  var file = $(this).prop('files')[0];
  console.log(file);
  var waiting_img = {
    "id":next_img_id,
    "name":file.name,
  }
  insertAtCaret('#writearea',"[loading_img" + next_img_id + "]...");
  next_img_id++;
/* 送ったことにします。
  $.ajax({
      url  : "http://localhost:8000/article/media/post",
      type : "POST",
      data : formdata,
      cache       : false,
      contentType : false,
      processData : false,
      dataType    : "image"
  }).done(function(data, textStatus, jqXHR){
      alert(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
      alert("fail");
  });
*/
  //--------------以下送ってリクエストきた場合---------------
  var response = {"id":next_img_id-1,"name":file.name,"url":"http://localhost/pressto/cm2-logo-panel_joel_wo_lang.png"};
  var change_before = "\\[loading_img" + (next_img_id-1) + "\\]\\.\\.\\.";
  var change_after  = "![" + response.name + "](" + response.url + ")";
  var str = $('#writearea').val();
  var regExp = new RegExp(change_before) ;
  var result = str.replace( regExp , change_after ) ;
  $('#writearea').val(result);
  console.log(change_before+","+change_after);
  console.log(result);
  change_view();
  //---------------ここまで---------------------------------------



  $(this).val('');
});


//------------------------音声部分----------------------------
var next_msc_id = 0;
//音声部分
$('#file_music').change(function(){
  var file = $(this).prop('files')[0];
  console.log(file);
  var waiting_img = {
    "id":next_img_id,
    "name":file.name,
  }
  insertAtCaret('#writearea',"[loading_msc" + next_img_id + "]...");
  next_img_id++;
/* 送ったことにします。
  $.ajax({
      url  : "http://localhost:8000/media/post",
      type : "POST",
      data : formdata,
      cache       : false,
      contentType : false,
      processData : false,
      dataType    : "image"
  }).done(function(data, textStatus, jqXHR){
      alert(data);
  }).fail(function(jqXHR, textStatus, errorThrown){
      alert("fail");
  });
*/
  //--------以下送ってリクエストきた場合---
  var response = {"id":next_img_id-1,"name":file.name,"url":"http://localhost/pressto/bgm_maoudamashii_orchestra26.mp3"};
  var change_before = "\\[loading_msc" + (next_img_id-1) + "\]...";
  var change_after  = "%[" + response.name + "](" + response.url + ")";
  var str = $('#writearea').val();
  var regExp = new RegExp(change_before) ;
  var result = str.replace( regExp , change_after ) ;
  $('#writearea').val(result);
  change_view()
  //---------------ここまで--------------



  $(this).val('');

});


//---------------------音声ここまで-------------------------
function insertAtCaret(target, str) {
  var obj = $(target);
  obj.focus();
  if(navigator.userAgent.match(/MSIE/)) {
    var r = document.selection.createRange();
    r.text = str;
    r.select();
  } else {
    var s = obj.val();
    var p = obj.get(0).selectionStart;
    var np = p + str.length;
    obj.val(s.substr(0, p) + str + s.substr(p));
    obj.get(0).setSelectionRange(np, np);
  }
}



});
