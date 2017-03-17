$(function(){
console.log("hello world");

/**
 * CSRF
 */
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
//end of CSRF

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
  $('#savearea').val(str);

  console.log($('#savearea').val());
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
  var data = new FormData();
  data.append('file_source', $("input[name='file_source']").prop('files')[0]);
  data.append('id', next_img_id);
  data.append('name', file.name);

  $.ajax({
      url: "/media/post",
      type: 'post',
      enctype: 'multipart/form-data',
      data: data,
      cache: false,
      processData: false,
      contentType: false
  }).done((res) => {
      var response = JSON.parse(res);
      //var response = {"id":next_img_id-1,"name":file.name,"url":"http://localhost/presstoorg/cm2-logo-panel_joel_wo_lang.png"};
      var change_before = "\\[loading_img" + (next_img_id-1) + "\\]\\.\\.\\.";
      var currentUrl = window.location.protocol + '//' + window.location.hostname;
      var change_after  = "![" + response.name + "](" + currentUrl + response.url + ")";
      var str = $('#writearea').val();
      var regExp = new RegExp(change_before) ;
      var result = str.replace( regExp , change_after ) ;
      $('#writearea').val(result);
      console.log(change_before+","+change_after);
      console.log(result);
      change_view();
  });



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
  var data = new FormData();
  data.append('file_source', $("input[name='file_music']").prop('files')[0]);
  data.append('id', next_img_id);
  data.append('name', file.name);

  $.ajax({
      url: "/media/post",
      type: 'post',
      enctype: 'multipart/form-data',
      data: data,
      cache: false,
      processData: false,
      contentType: false
  }).done((res) => {
      var response = JSON.parse(res);
      //var response = {"id":next_img_id-1,"name":file.name,"url":"http://localhost/presstoorg/bgm_maoudamashii_orchestra26.mp3"};
      var change_before = "\\[loading_msc" + (next_img_id-1) + "\]...";
      var currentUrl = window.location.protocol + '//' + window.location.hostname;
      var change_after  = "%[" + response.name + "](" + currentUrl + response.url + ")";
      var str = $('#writearea').val();
      var regExp = new RegExp(change_before) ;
      var result = str.replace( regExp , change_after ) ;
      $('#writearea').val(result);
      change_view();
  });




  $(this).val('');

});


//---------------------音声ここまで-------------------------

$('#press').click(function(){
  var w_str = $('#writearea').val();
  var v_str = $('#viewarea').html();
  console.log(w_str);
  console.log(v_str);
});

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

$('.chips input').attr('placeholder',"タグをEnter区切りで入力");

});
