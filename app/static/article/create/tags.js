$(() => {
    $('.chips').material_chip();
    $('.chips').on('chip.add', function(e, chip){
        console.log(tagsData());
    });
    $('.chips').on('chip.delete', function(e, chip){
        console.log(tagsData());
    });
    $('.chips').on('chip.select', function(e, chip){
        console.log(tagsData());
    });
});


function tagsData() {
    let data = $('.chips').material_chip('data');
    let strTags = "";
    for(var i in data) {
        strTags += data[i].tag + ",";
    }
    $("input[name='tags']").val(strTags);
    return data;
}
