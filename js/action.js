
var main = {};
(function($){
    "use strict";
    var $window = $(window),
        $document = $(document),
        $counter = $('.counter'),
        $body = $('body');

    $.fn.exists = function () {
        return this.length > 0;
    };
    main.load =function(){
        $('#loading').delay(40).fadeOut('slow');
    };
    main.goToTop = function () {
        var $goToTop = $('#back-to-top');

        $goToTop.on("click", function () {
            $('body,html').animate({scrollTop:0},1000);
            return false;
        });

        window.onscroll = function() {scrollFunction()};

        function scrollFunction() {
            if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100){
                $('#menu').addClass('sticky');
            }else {
                $('#menu').removeClass('sticky');
            }
            if (document.body.scrollTop > 900 || document.documentElement.scrollTop > 900) {

                $('#back-to-top').show();
            } else {
                $('#back-to-top').hide();
            }
        }

    };
    main.counters = function () {
        if ($counter.exists()) {
            $counter.each(function () {
                $('.timer').countTo();
            });
        }

       setTimeout(function () {
           $('#marketing').show(1000);
           $('.closebtn').click(function () {
               $('#marketing').hide();
               // setTimeout(function () {
               //     $('#marketing').show(1000);
               // },30000);
           });
       },20000);
    };
    main.menuBar = function (){
        $('.right-bar').hide();
        $('.more-details').hide();
        $('#setting').on('click',function (e) {
            $('.hoverlay').show();
            $('.right-bar').css({
                'right':'0',
                'display':'block'
            });
            e.preventDefault();
        });
        $('.right-bar-toggle').on('click',function (e) {
            e.preventDefault();
            $('#setting').removeClass('active');
            $('.hoverlay').hide();
            $('.right-bar').css({
                'right':'-270px',
                'display':'none'
            });
        });
        $('#more-details').on('click',function (e) {
            $('.more-details').toggle();
            e.preventDefault();
        });

        $('.title-banner').click(function () {
            // $('#menu').addClass('open');
            $('#menu').toggle(1000);
        });

        $('#dowload-app').click(function () {
            $('#dowload-app-android').toggle();
        });
        $('.close-app').click(function () {
            $('#dowload-app').hide();
        });
        setTimeout(function () {
            $('#dowload-app').show();
        },2000000);
    };
    main.search = function(){
        $('#trigger-overlay').click(function () {
            $('#myOverlay').show();
            $('.closebtn').click(function () {
                $('#myOverlay').hide();
            })
        });
        $('.search-mobile').click(function (e) {

            $('#myOverlay').show();
            $('.closebtn').click(function () {
                $('#myOverlay').hide();
            });
            e.preventDefault();
        })
    };
    main.navHover = function(){
        $(".dropdown").hover(
            function () {
                $('.dropdown-menu', this).stop(true, true).slideDown("fast");
                $(this).toggleClass('open');
            },
            function () {
                $('.dropdown-menu', this).stop(true, true).slideUp("fast");
                $(this).toggleClass('open');
            }
        );

        $( ".dropdown.fade" ).hover(function() {
            $( this ).fadeOut( 100 );
            $( this ).fadeIn( 500 );
        });
    };
    main.action = function(){

        $('#about .photo-360 .photo-content a,#about .photo-360 .img-item .click-icon div').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            var toggle =  $(this).attr('data-click');
            var room =  $(this).attr('data-room');
            $('.img-item[data-id = '+toggle+']').addClass('active').siblings().removeClass('active');
            $('div[data-id = '+room+']').addClass('active').siblings().removeClass('active');
            if(room == toggle){

            }else {
                // $('#about .photo-360 .click-icon div').removeClass('active');
            }
        });
        // language click
        $('.language-dost a').on('click',function () {
            var language =  $(this).attr('data-language-icon');
            $(this).addClass('active').siblings().removeClass('active');
            $('.language-icon .icon-l[data-language-icon = '+language+']').addClass('active').siblings().removeClass('active');
            $('#language h3[data-language-icon = '+language+']').addClass('active').siblings().removeClass('active');
        });
    };
    main.contact = function () {
        $('form.needs-validation').submit(function() {
            var f = $(this).find('.form-group'),
                ferror = false,
                emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

            f.children('input').each(function() { // run all inputs

                var i = $(this); // current input
                var rule = i.attr('data-rule');

                if (rule !== undefined) {
                    var ierror = false; // error flag for current input
                    var pos = rule.indexOf(':', 0);
                    if (pos >= 0) {
                        var exp = rule.substr(pos + 1, rule.length);
                        rule = rule.substr(0, pos);
                    } else {
                        rule = rule.substr(pos + 1, rule.length);
                    }

                    switch (rule) {
                        case 'required':
                            if (i.val() === '') {
                                ferror = ierror = true;
                            }
                            break;

                        case 'minlen':
                            if (i.val().length < parseInt(exp)) {
                                ferror = ierror = true;
                            }
                            break;

                        case 'email':
                            if (!emailExp.test(i.val())) {
                                ferror = ierror = true;
                            }
                            break;

                        case 'checked':
                            if (!i.attr('checked')) {
                                ferror = ierror = true;
                            }
                            break;

                        case 'regexp':
                            exp = new RegExp(exp);
                            if (!exp.test(i.val())) {
                                ferror = ierror = true;
                            }
                            break;
                    }
                    i.next('.validation').html((ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
                }
            });
            f.children('textarea').each(function() { // run all inputs

                var i = $(this); // current input
                var rule = i.attr('data-rule');

                if (rule !== undefined) {
                    var ierror = false; // error flag for current input
                    var pos = rule.indexOf(':', 0);
                    if (pos >= 0) {
                        var exp = rule.substr(pos + 1, rule.length);
                        rule = rule.substr(0, pos);
                    } else {
                        rule = rule.substr(pos + 1, rule.length);
                    }

                    switch (rule) {
                        case 'required':
                            if (i.val() === '') {
                                ferror = ierror = true;
                            }
                            break;

                        case 'minlen':
                            if (i.val().length < parseInt(exp)) {
                                ferror = ierror = true;
                            }
                            break;
                    }
                    i.next('.validation').html((ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '')).show('blind');
                }
            });
            if (ferror) return false;
            else var str = $(this).serialize();
            var action = $(this).attr('action');
            if( ! action ) {
                action = '';
            }
            $.ajax({
                type: "POST",
                url: action,
                data: str,
                success: function(msg) {
                    // alert(msg);
                    if (msg == 'OK') {
                        $("#sendmessage").addClass("show");
                        $("#errormessage").removeClass("show");
                        $('.contactForm').find("input, textarea").val("");
                    } else {
                        $("#sendmessage").removeClass("show");
                        $("#errormessage").addClass("show");
                        $('#errormessage').html(msg);
                    }

                }
            });
            return false;
        });
    };
    main.user = function(){
        var register = "https://tinder-69.appspot.com/api/v1/user/";
        var login = "https://tinder-69.appspot.com/api/v1/login";
        var forgot = "https://api.mlab.com/api/1/databases/matrimony/collections/messages?apiKey=GySvt0pxEYMX3O8Qu9hsQCLZv5r95Jig";
        // // ========== Login SC ==========

        $('#btnlogin').click(function (e) {
            var isValidEmail = true;
            var isValidPassword = true;
            var email = $('#email').val();
            var password = $('#password').val();
            if(email.length === 0){
                isValidEmail = false;
                $('.invalid-feedback-l').text(' Nhập địa chỉ email.');
            }else {
                isValidEmail = true;
                $('.invalid-feedback-l').remove();
            }
            if(password.length === 0){
                isValidPassword = false;
                $('.invalid-feedback-l-p').text('Nhập mật khẩu.');
            }else {
                isValidPassword = true;
                $('.invalid-feedback-l-p').remove();
            }
            if(isValidEmail && isValidPassword) {
                var meberdata = {
                    'email': email,
                    'password': password
                };
                if(meberdata){
                    $.ajax({
                        url: login,
                        type: 'POST',
                        data: JSON.stringify(meberdata),
                        success: function (data) {
                            window.location.href = 'index.html';
                            localStorage.setItem('email', email);
                        },
                        error: function (response, message) {
                            $('#Error-user').html('Email hoặc password sai. Vui lòng nhập lại ',message).css('color', '#c3bebe');
                        }
                    });
                }
            }else {

            }
            e.preventDefault();
        });
        // // ========== Register SC ==========
        $('#signup').click( function (e) {
            // vanidate
            var isValidEmail = true;
            var isValidPassword = true;
            var email = $('#email-registration').val();
            var password = $('#password-registration').val();
            if(email.length === 0){
                isValidEmail = false;
                $('.invalid-feedback').show();
            }else {
                isValidEmail = true;
                $('.invalid-feedback').hide();
            }
            if(password.length === 0){
                isValidPassword = false;
                $('.invalid-feedback').show();
            }else {
                isValidPassword = true;
                $('.invalid-feedback').hide();
            }
            if(isValidEmail && isValidPassword){
                var data = {
                    "email": email,
                    "password": password
                };
                if(data){
                    $.ajax({
                        url: register,
                        type: 'POST',
                        data: JSON.stringify(data),
                        success: function (res) {
                            window.location.href = 'index.html';
                            localStorage.setItem('email', email);
                        },
                        error: function () {
                            alert('Error')
                        }
                    });
                }
            }else {

            }
            e.preventDefault();
        });
        //============== Forgot Password ========

        $('#forgot-password-btn').on('click',function (e) {
            $('#forgot-password').modal('show');
            $('#btnforgetPassword').click(function () {
                var EmailPhone = true;
                var emailPhones = $('#emailPhone').val();
                if(emailPhones.length === 0){
                    EmailPhone  = false;
                    $('.error').text('Nhập email hoặc phone').css('color','#ff0000');
                }else {
                    EmailPhone = true;
                    $('.error').remove();
                }
                if (EmailPhone) {
                    var emailPhone = {

                        "title":"Tìm lại password",
                        "name" : "",
                        "email": emailPhones,
                        "messages":"",
                        "date": (new Date())
                    };
                    if (emailPhone) {
                        $.ajax({
                            url: forgot,
                            type: 'POST',
                            data: JSON.stringify(emailPhone),
                            contentType: 'application/json; charset=utf-8',
                            success: function (data) {
                                window.location.href = 'login.html';
                            },
                            error: function (response, message) {
                                $('#Error-emailPhone').html('Không tìm thấy email', message).css('color', '#c3bebe');
                            }
                        });
                    } else {
                        return false;
                    }
                    e.preventDefault();
                }
            });
        });

        //============== Logout ========
        $('#logout').on('click', function (e) {
            e.preventDefault();
            $('#logout').remove();
            localStorage.removeItem('email');
            window.location.href = "index.html";
        });
        //============== Profile ========
        var id = localStorage.getItem('email');
        if(id == null || id === 'undefined'){
            // $('#footer').hide();
            $('#no-api-internet').show();
            $('.show-profile,.user-details').hide();
        }else {
            $('#no-api-internet').hide();
            $('.show-profile,.user-details').show();
        }
        if(id){

            $.ajax({
                url: 'https://tinder-69.appspot.com/api/v1/user/'+id,
                // contentType: "application/json"
            }).done(function (data){
                $('#editprofiel,#footer').show();
                $('#form-profile').append('<form id="Users" method="get">\n' +
                    '                            <div class="row">\n' +
                    '                                <div class="form-group mx col-md-12">\n' +
                    '                                    <img class="img-avatar img-fluid" alt="">\n' +
                    '                                    <label for="avatar" class="avata-file">Tải lên hình đại diện</label>\n' +
                    '                                    <input type="file" class="form-control mp" accept="image/*" id="avatar" required="">\n' +

                    '                                    <span id="avatar-img"></span>\n' +
                    '                                </div>\n' +
                    '                                <div class="form-group col-md-6">\n' +
                    '                                <label for="fullname">Họ và tên</label>\n' +
                    '                                <h5 class="viewsa" style="display: none;">'+data.username+'</h5>\n' +
                    '                                <input type="text" id="fullname" class="form-control mp" value="'+data.username+'" required="">\n' +
                    '                            </div>\n' +
                    '                                <div class="form-group col-md-6">\n' +
                    '                                <label for="gender">Giới tính </label>\n' +
                    '                                <h5 class="viewsa" style="display: none;">' + data.gender + '</h5>\n' +
                    '                                <select name="" id="gender" class="custom-select" required="">\n' +
                    '                                    <option  value="' + data.gender + '">' + data.gender + '</option>\n' +
                    '                                <option value="Nam">Nam</option>\n' +
                    '                                <option value="Nữ">Nữ</option>\n' +
                    '                            </select>\n' +
                    '                            </div>\n' +
                    '                                <div class="form-group col-md-6">\n' +
                    '                                <label for="birthday">Sinh nhật </label>\n' +
                    '                                <h5 class="viewsa" style="display: none;">'+data.birthday+'</h5>\n' +
                    '                                <input type="text" class="form-control mp" id="birthday" value="'+data.birthday+'" data-toggle="input-mask" data-mask-format="00/00/0000" maxlength="10">\n' +
                    '                            </div>\n' +
                    '                                <div class="form-group col-md-6">\n' +
                    '                                <label for="educationLevel">Trình độ</label>\n' +
                    '                                <h5 class="viewsa" style="display: none;">' + data.educationLevel + '</h5>\n' +
                    '                                <select id="educationLevel" class="custom-select age_from">\n' +
                    '                                    <option  value="' + data.educationLevel + '" class="a">' + data.educationLevel + '</option>' +
                    '                                    <option value="Giáo sư" class="a">Giáo sư</option>\n' +
                    '                                <option value="Tiến sỹ" class="a">Tiến sỹ </option>\n' +
                    '                                <option value="Đại học" class="a">Đại học</option>\n' +
                    '                                <option value="Cao đẳng" class="a">Cao đẳng</option>\n' +
                    '                                <option value="Trung cấp" class="a">Trung cấp</option>\n' +
                    '                                <option value="Học sinh" class="a">Học sinh</option>\n' +
                    '                                <option value="Không học vấn" class="a">Không học vấn</option>\n' +
                    '                            </select>\n' +
                    '                            </div>\n' +
                    '                                <a class="btn btn-outline-primary ml-3  mt-2 animated fadeInRight" id="postprofile" style="display: none;"><span><i class="fa fa-upload"></i>Chỉnh sửa thông tin</span></a>\n' +
                    '                            </div>\n' +
                    '                        </form>');
                $('.profile-title').append(data.username);
                $('#more-details').append(id);
                $('.img-avatar').attr('src',data.avatar);
                sessionStorage.setItem('avatar',data.avatar);
                // check null
                if(data.email ===  'null' || typeof data.username === 'undefined' || $(this).val('')  === 'undefined'){
                    $('.mp,.custom-select,#profile-list-submit').show();
                    $('#postprofile,.viewsa').hide();
                    $('#fullname,#birthday').val('');
                    $('#Users select').val('');
                }else {
                    $('.mp,.custom-select,#profile-list-submit,.avata-file').hide();
                    $('#postprofile,.viewsa').show();
                    $('#postprofile').on('click',function (e) {
                        $('.mp,.custom-select,#profile-list-submit,.avata-file').show();
                        $('#postprofile,.viewsa').hide();
                        e.preventDefault();
                    });
                }
                $('#postprofile').on('click',function (e) {
                    $('.mp,.custom-select,#profile-list-submit').show();
                    $('#postprofile,.viewsa').hide();
                    e.preventDefault();
                });
                $('#editprofiel').on('click',function (e) {
                    var avatar = sessionStorage.getItem('avatar');
                    var fullname = $('#fullname').val();
                    var phone = $('#phone').val();
                    var birthday = $('#birthday').val();
                    var gender = $('#gender option:selected').val();
                    var educationLevel = $('#educationLevel option:selected').val();

                    if($(this).data('avatar') === null){
                        var ids =  $(this).data('avatar');
                    }
                    var user = {
                        "email": id,
                        "username": fullname,
                        "avatar": avatar || ids,
                        "address": "city" +","+ "state" +","+ "county",
                        "phone": phone,
                        "job": "job",
                        "birthday": birthday,
                        "gender": gender,
                        "hobby": "hoppy",
                        "album": "url",
                        "maritalStatus": "maritalStatus",
                        "educationLevel": educationLevel
                    };
                    $.ajax({
                        url: 'https://tinder-69.appspot.com/api/v1/user/',
                        type: 'PUT',
                        data: JSON.stringify(user),
                        // contentType: "application/json",
                        success: function (data) {
                            sessionStorage.removeItem('avatar');
                            window.location.href="index.html";
                        }
                    });
                    e.preventDefault();
                });
                $('#avatar').on('change', function (e) {
                    var files = e.target;
                    var reader = new FileReader();
                    reader.onload = function(){
                        var dataURL = reader.result;
                        var avatars = '';
                        avatars +='<img src=" '+dataURL +' " height="100" width="100">';
                        sessionStorage.setItem('avatar',dataURL);
                        $('#avatar-img').html(avatars);
                    };
                    reader.readAsDataURL(files.files[0]);
                });
            });
        }else {
            localStorage.removeItem('email');
            sessionStorage.removeItem('avatar');
        }
        //============== From - Contacter ========
        $( "#form-contact").submit(function( event ) {
            $("#ajaxloader").show();
            $("#form-contact").hide();
            var name = $('#name').val();
            var email = $('#email').val();
            var text = $('#message').val();

            var messages ={
                "title": 'Theo dõi tin tức ',
                "name": name,
                "email": email,
                "messages":text,
                "date": new Date()

            };
            $.ajax({
                url:'https://api.mlab.com/api/1/databases/matrimony/collections/messages?apiKey=GySvt0pxEYMX3O8Qu9hsQCLZv5r95Jig',
                data:JSON.stringify(messages),
                type:'post',
                contentType: "application/json",
                success:function(response){
                    $("#ajaxloader").hide();
                    $("#form-contact").show();
                    $("#form-contact").find("input, textarea").val("");
                    $("#formmessage").html(response).show().delay(2000).fadeOut('slow');
                }
            });
            event.preventDefault();
        });
    };
    main.showScr = function(){
        $('.venobox').venobox({
            bgcolor: '',
            overlayColor: 'rgba(6, 12, 34, 0.85)',
            closeBackground: '',
            closeColor: '#fff'
        });
    };
    main.sliderLogo = function() {

    };

    $window.on('load', function(){
        main.load();
    });

    $document.ready(function () {
        new WOW().init();
        main.counters();
        main.goToTop();
        main.menuBar();
        main.search();
        main.navHover();
        main.action();
        main.contact();
        main.showScr();
        main.sliderLogo();
        main.user();

    });
})(jQuery);
