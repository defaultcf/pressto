$(() => {
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


    $("#iine").on("click", () => {
        let user_id = $('#user_id').html();
        let tirac_id = $('#tirac_id').html();
        console.log("user_id: " + user_id);
        console.log("tirac_id: " + tirac_id);
        var data = new FormData();
        data.append('user_id', user_id);
        data.append('tirac_id', tirac_id);
        $.ajax({
            url: '/media/iine',
            type: 'post',
            enctype: 'multipart/form-data',
            data: data,
            cache: false,
            processData: false,
            contentType: false
        }).done((res) => {
            console.log(res);
        });
    });
});
