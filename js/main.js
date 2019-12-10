var main = {};


(function($){
    "use strict";
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
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function() {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                document.getElementById("banner-text").style.top = "0";
            } else {
                document.getElementById("banner-text").style.top = "-75px";
            }
            prevScrollpos = currentScrollPos;
        }
    };
    main.counters = function () {
        // $('.timer').countTo();
    };
    main.rightBar = function (){
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
    main.search =function(){
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

    main.navhover = function(){
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

        $('#header .setting-mobiles-nav  .btn-group a, #header .setting-desktop-nav #navbarSupportedContent .navbar-nav li a').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            var toggle =  $(this).attr('data-tab');
            $('section[aria-labelledby = '+toggle+']').addClass('active').siblings().removeClass('active');
        });
        // language click
        $('.language-dost a').on('click',function () {
            var language =  $(this).attr('data-language-icon');
            $(this).addClass('active').siblings().removeClass('active');
            $('.language-icon .icon-l[data-language-icon = '+language+']').addClass('active').siblings().removeClass('active');
            $('#language h3[data-language-icon = '+language+']').addClass('active').siblings().removeClass('active');
        })
        //
        $('#lettering .lettering-footer .btn-group button').click(function () {
            $(this).addClass('active').siblings().removeClass('active');
            var page =  $(this).attr('data-page');
            $('#lettering div[id = '+page+']').addClass('active').siblings().removeClass('active');
        });
    };
    main.sliderC = function () {
        $('iframe.size-238').css('width','238px !important');

    };
    var auidoArray = [];
    var nameArray = [];
    main.audio = function(){


        var audio = $('.hiragnana').find('.audio').find('audio').attr('data-audio');

        $('.audio-play-auto').each(function () {
            auidoArray.push($(this).attr('data-audio'));
            nameArray.push($(this).attr('id'));
        });

        $('.hiragnana li a').click(function () {

            var active = $(this).attr('data-name');
            var audio = $('.hiragnana').find('.audio').find('audio').attr('data-audio');

            var play = $(this).attr('data-play');
            // lay ra danh sanh  audio
            for(var i in auidoArray){
                var sector = auidoArray[i];
                (function(sec){
                    if(active === sec){
                        $('a[data-name = '+active+']').addClass('play');
                        $('audio[data-audio = '+sec+']').addClass('play-auto'+sec).siblings().removeClass("play-auto" +sec);
                        $('.play-auto'+sec).get(0).play();
                    }
                }(sector))
            }
        });


    };

    main.game = function(){
        $("#vocabulary-game-message").keypress(function (e) {
            if (e.keyCode == 13) {
                var text = $('#vocabulary-game-message').val();
                sessionStorage.setItem("textm",text);
                // $('#vocabulary-game').html('<div class="float-left">'+text+' :</div> ');
                if(text.length === 0){
                    window.location.href = 'index.html';
                }else {

                }

                $('#vocabulary-game-message').val("");
            }
        });
        $.ajax({
            url: "./json/test/testn1.json",
            type: 'GET',
            contentType: "json",
            success: function (data) {
                var conten ='';
                $.each(data.hiragana, function (c, index) {
                    // if(text == index){
                    //   conten +='<div class="float-left">'+index+'</div>';
                    // }
                });
                sessionStorage.clear();
                $('.vocabulary-game-content').html(conten);
            }
        });
        // var texts = sessionStorage.getItem("textm");

    };

    main.chat = function(){

        var email = localStorage.getItem('email');
        // chat message
        var myDataRef = new Firebase("https://matrimony-chat.firebaseio.com/");
        var count = 0;
        // click
        $('.sent-message-btn').click(function (e) {
            var text = $("#messageInput").val();
            var isValidtext = true;
            if(text.length === 0){
                isValidtext = false;
                $('#messageInput').css("border",'1px solid #fe244b');
                // window.location.href = 'login.html';
            }else{

                if(email !== null || email === 'undefined'){
                    isValidtext = true;
                    var imgchat =  sessionStorage.getItem('img-chat');

                    var userm =  {
                        id:1,
                        name: email,
                        image: imgchat,
                        text: text,
                        status: "1"
                    };
                    myDataRef.push(userm);
                }else {
                    window.location.href = 'login.html';
                }
            }
            $("#messageInput").val("");
        });
        // enter
        $("#messageInput").keypress(function (e){
            if(e.keyCode == 13){ //Enter
                var text = $("#messageInput").val();
                var isValidtext = true;
                if(text.length === 0){
                    isValidtext = false;
                    $('#messageInput').css("border",'1px solid #fe244b');
                }else{
                    if(email !== null || email === 'undefined'){
                        isValidtext = true;
                        var imgchat =  sessionStorage.getItem('img-chat');
                        var userm =  {
                            id:1,
                            name: email,
                            image: imgchat,
                            text: text,
                            status: "1"
                        };
                        myDataRef.push(userm);
                    }else {
                        window.location.href = 'login.html';
                    }
                }
                $("#messageInput").val("");
                sessionStorage.removeItem('img-chat');
            }
            count++;
        });
        //  array icon click
        $('.show-icon').hide();
        $('#icon-show-chat').click(function () {
            $('.show-icon').toggle();
        });
        var emojis = ["😀","😁","😂","😃","😄","😅","😆","😉","😊","😋","😎","😍","😘","😗","😙","😚","☺️","🙂","🤗","😇","🤓","🤔","😐","😑","😶","🙄","😏","😣","😥","😮","🤐","😯","😪","😫","😴","😌","😛","😜","😝","😒","😓","😔","😕","🙃","🤑","😲","😷","🤒","🤕","☹️","🙁","😖","😞","😟","😤","😢","😭","😦","😧","😨","😩","😬","😰","😱","😳","😵","😡","😠","😈","👿","👹","👺","💀","☠️","👻","👽","👾","🤖","💩","😺","😸","😹","😻","😼","😽","🙀","😿","😾","🙈","🙉","🙊","👦"];
        var html ='';
        for(var k = 0; k < emojis.length; k++){
            html+="<span class='click' data-icon='"+emojis[k]+"'>"+emojis[k]+"</span>";
            $('.show-icon').html(html);
            $('.click').click(function (e) {
                var icon = $(this).data('icon');
                $('#messageInput').val(function () {
                    return this.value + icon;
                });
                e.preventDefault();
            });
        }
        // img
        $('#file-img').on('change', function (e) {
            var files = e.target;
            var reader = new FileReader();
            reader.onload = function () {
                var dataURL = reader.result;
                var imglist = '';

                imglist +='<img src=" '+dataURL +' " class="img-fluid"><span class="close-all"></span>';
                $('.show-images').html(imglist);
                sessionStorage.setItem('img-chat', dataURL);
            };
            reader.readAsDataURL(files.files[0]);
            if (!files.type.match('images.*')) {
                var data = {
                    message: 'You can only share images',
                    timeout: 2000
                };
                return;
            }
        });
        // remover img file
        $('body').on('click','.close-all',function () {
            var control = $("#file-img");
            control.replaceWith( control.val('').clone( true ) );
            $('.show-images').find('img').remove();
            $('.show-images').find('.close-all').remove();
            sessionStorage.removeItem('img-chat');
        });
        myDataRef.on('child_added', function (snapshot){
            var message = snapshot.val();
            viewchat(message.name, message.text, message.image, message.time, message.id);
        });
        function viewchat(name, text,image,time,id) {
            var items ='';
            var names = name.slice(0,9);

            if(image !== 'undefined'){
                $('.images').hide();
            }else {
                $('.images').show();
            }
            items +='<div class="chat float-left">\n' +
                ' <div class="titles">'+names+'</div>' +
                ' <div class="message">'+text+'</div>' +
                ' <div class="images"><img src="'+image+'" class="img-fluid  shadow-lg" alt=""></div>' +
                '</div>';
            $('<div/>').prepend(items).appendTo($(".chat-content"));
            $('.chat-content')[0].scrollTop = $('.chat-content')[0].scrollHeight;
        }


    };
    var playList = [];
    main.ajaxHome = function(){
        $.ajax({
            url: "./json/audio/audio.json",
            type: 'GET',
            contentType: "json",
            success: function (data) {
                var card ="";
                $.each(data.dependencies, function (c, index) {
                    var idpage = index.id;
                    card +=' <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3">\n' +
                        '                        <a id="page"  href="javascript:void(0);" data-idpage="'+index.id+'">' +
                        '<div     class="card bg-dark text-white mb-3">\n' +
                        '                            <img src="'+index.images+'" class="card-img" alt="...">\n' +
                        '                            <div class="card-img-overlay">\n' +
                        '                                <h5 class="card-title">'+index.title+'</h5>\n' +
                        '                            </div>\n' +
                        '                        </div>\n'+
                        '<i class="fa fa-play"></i>'+
                        '</a>' +
                        '                    </div>';
                });
                $('#product').html(card);

            }
        });
        // click id to page

        $('body').on('click','#page',function (e) {
            // $('#banner-text').addClass('active').siblings();
            $('.back-url').on('click',function () {
                $('#product').show();
                $('#product-m').hide();

                $('#banner-text').removeClass('active');
            });

            //
            // $('.play-list').each(function () {
            //     var ac = $(this).attr('data-play-id');
            //     playList.push(ac);
            // });

            // click  page play  product id
            $('body').on('click', '.play-width > a', function () {
                var ac = $(this).attr('data-play-id');
                playList.push(ac);

                for(var i in playList){
                    var sector = playList[i];
                    (function(sec){
                        if(ac == sec){
                            $('a[data-play-id = '+ac+']').addClass('play-a');
                            $('audio[data-contron = '+sec+']').addClass('play'+sec).siblings().removeClass("play" +sec);
                            $('.play'+sec).get(0).play();
                        }
                    }(sector));
                }


            });
            var id = $(this).attr('data-idpage');
            localStorage.setItem('id_page',id);

            e.preventDefault();
            window.location.href="page-id.html";
        });



        $.ajax({
            url: "./json/audio/audio.json",
            type: 'GET',
            contentType: "json",
            success: function (data) {
                var card ="", list ="";
                var  ids = localStorage.getItem('id_page');
                $.each(data.dependencies, function (c, index) {
                    var idpage = index.id;
                    var url = index.url;

                    if(idpage == ids){
                        card +=' <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">\n' +
                            '<div class="card card-body">\n' +
                            '                        <div class="d-inline-block">\n' +
                            '                            <img src="'+index.images+'" alt="" class="img-fluid mb-3">\n' +
                            '                            <h5 class="card-title text-dark">'+index.text+'</h5>\n' +
                            '                            <audio   controls  class="audio-play-auto">\n' +
                            '                                <source src="'+index.mp3+'" >\n' +
                            '                            </audio>\n' +
                            '                        </div>\n' +
                            '<h4 class="mt-3 mb-3 text-dark">Hộp thoại </h4>'+
                            ' <div class="mb-3 mt-3">\n' +
                            '                    <ul class="nav" id="dialog-box">\n' +
                            '                        \n' +
                            '                    </ul>\n' +
                            '                </div>'+
                            '                    </div>'+
                            '      </div>';
                        for (var i in url){

                            list += '<li class="nav-item-user">'+url[i].user+'</li>\n' +
                                '                <li class="nav-item">'+url[i].text+'</li>\n' +
                                '                <li class="nav-item">'+url[i].textVn+'</li>\n' +
                                '                <li class="play-width"><a href="javascript:void(0);" data-play-id="'+url[i].id +'"><i class="fa fa-play-circle-o"></i></a><div class="audio d-none">\n' +
                                '                                        <audio  controls data-contron="'+url[i].id+'"  class="play-list">\n' +
                                '                                            <source src="'+url[i].url+'" type="audio/ogg">\n' +
                                '                                        </audio>\n' +
                                '                                    </div></li>';

                        }
                    }
                });
                // su dung tren mot page
                // $('#product').hide();
                // $('#product-m').html(card).show();
                $('#product-m').append(card);
                $('#dialog-box').html(list);

            }
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

    $(document).ready(function () {
        new WOW().init();
        // main.counters();
        main.goToTop();
        main.rightBar();
        main.search();
        main.sliderC();
        main.navhover();
        main.action();
        main.audio();
        main.game();
        main.chat();
        main.ajaxHome();
        main.user();
    });
})(jQuery);