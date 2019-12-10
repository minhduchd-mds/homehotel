$(document).ready(function () {
    var Login  = "https://api.mlab.com/api/1/databases/matrimony/collections/account?apiKey=GySvt0pxEYMX3O8Qu9hsQCLZv5r95Jig";
    var List = "../../json/post.json";
    var Toplist = "../../json/toplist.json";
    // // ========== Login SC ==========

   $('#btnlogin').on('click',function (e) {
       e.preventDefault();
       var isValidEmail = true;
       var isValidPassword = true;
       var email = $('#emailaddress').val();
       var password = $('#password').val();

       if(email.length == 0){
           isValidEmail = false;
           $('.error-msgs').text('Nhap email');
       }else {
           isValidEmail = true;
           $('.error-msgs').remove();
       }
       if(password.length == 0){
           isValidPassword = false;
           $('.error-msg').text('Nhap password');
       }else {
           isValidPassword = true;
           $('.error-msg').remove();
       }
       // if($('#checkbox-sigsnin').is(':checked')){
       //     var md5 = $.md5(email,password,true);
       //     $.cookie('id',md5);
       //     return false;
       // }else {
       //     return true;
       // }
       if(isValidEmail && isValidPassword) {
           var meberdata = {
               'email': email,
               'password': password
           };

           if(meberdata){
               $.ajax({
                   url: Login,
                   type: 'GET',
                   // data: JSON.stringify(Dashboards),
                   contentType: 'application/json; charset=utf-8',
                   success: function (response) {

                       $.each(response, function (id, data) {

                           if(email == data.eamil && password == data.password){
                               window.location.href = 'index.html';
                               localStorage.setItem('secretToken', data._id.$oid);
                               localStorage.setItem('fullname', data.fullname);
                           }else {
                               var error ='';
                               error +='<p class="text-muted mb-4">Nhập lại email hoặc password đã sai .</p>'
                           }
                           $('#error').html(error);
                       });
                   },
                   error: function (response, message) {
                       alert('Có lỗi xảy ra. ' + message);
                   }
               });
           }
       }else {

       }
   });
    // //========== SIGN UP =========
    $('#signup').click(function (e) {
        e.preventDefault();
        var customer  = {
            'fullname': $('#fullname').val(),
            'email': $('#emailaddress').val(),
            'password': $('#passwordsign').val(),
            'images' : 'data',
            'description' : 'description',
            'decentralization' : 'decentralization',
            'date' : 'date',
            'satatus' : '1'
        };
        $.ajax({
            url: Login,
            type: 'POST',
            data: JSON.stringify(customer),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                window.location.href = 'login.html';
            },
            error: function (response, message) {
            }
        });
    });
    // //============= Logout ========

    $('#logout').on('click', function (e) {
        e.preventDefault();
        $('#logout').remove();
        localStorage.removeItem('secretToken');
        localStorage.removeItem('fullname');
        localStorage.removeItem('ism');
        localStorage.removeItem('month');
        localStorage.removeItem('halfYear');
        localStorage.removeItem('year');
        window.location.href = "login.html";
    });

    var secretToken = localStorage.getItem('secretToken');
    if(secretToken){
        blog();
        search();
        datatime();
    }else {
        localStorage.removeItem('secretToken');
        localStorage.removeItem('fullname');
        localStorage.removeItem('ism');
        localStorage.removeItem('month');
        localStorage.removeItem('halfYear');
        localStorage.removeItem('year');
        // window.location.href = "login.html";
    }

    // Search
   function search() {
       $('#submitsearch').on("click", function () {
           var search = $('#searchapi').val();
           $.ajax({
               url: List,
               type: 'GET',
               contentType: 'application/json; charset=utf-8',
               async: false,
               dataType: 'Json',
               success: function (data, status, jqXHR) {
                   // console.log(data)
                   // alert(data)
                   for(var i = 0 ; i <data.length ; i++){

                       var email = data[i].email;
                       var age = data[i].age;
                       var country = data[i].country;
                       var city = data[i].city;
                       var list = '';
                       var k = 50;
                       list +=' '+ email +  age + ' ';


                       // console.log(list)

                   }
                   // $('#ListDecember').html(list);
               }
           });
       });
       $("#searchapi").keypress(function(){

           var country = $("input[name=searchapi]").val();
           var url = "http://demo4522112.mockable.io/menber";
           var customer = {

               "email": email,
               "country": country

           };
           $.ajax({
               url: url,
               type: 'GET',
               contentType: "application/json; charset=utf-8",
               async: false,
               data: JSON.stringify(customer),
               success: function(data) {

                   // for(var i=0;i<data.length;i++){
                   //     var email = data[i].email;
                   //     var age = data[i].age;
                   //     var country = data[i].country;
                   //     var city = data[i].city;
                   //     var list = '';
                   //     var k = 50;
                   //
                   //
                   //         list +='<p>'+ country+  email + '</p> ';
                   //
                   //     alert(list)
                   //     console.log(list)
                   // }
                   // $("#output").html(list);
               }
           });
       });
   }

    function datatime() {
        $.ajax({
            url: Toplist,
            type: 'GET',
            dataType: "json",
            // data: Dashboards,
            contentType: "application/json; charset=utf-8",
            success: function (re) {
                var toplist = '';
                for (var i = 0; i < re.length; i++) {

                    var username = re[i].username;
                    var id = re[i].id;
                    var money = re[i].money;
                    var createAt = re[i].createAt;
                    var qyt = re[i].qyt;
                    var total = qyt * money;
                    var newDate = new Date();
                    var moneys =  new Intl.NumberFormat('Vn-De', { style: 'currency', currency: 'VND' }).format(money);
                    var totals =  new Intl.NumberFormat('Vn-De', { style: 'currency', currency: 'VND' }).format(total);


                    // noinspection JSAnnotator
                    var day_to_limit = ((newDate.toLocaleDateString())+ (newDate.getMonth())); // tinh sai
                    if (id <= 5) {
                        toplist += '<tr>\n' +
                            '                                                    <td>\n' +
                            '                                                        <h5 class="font-14 mb-1 font-weight-normal">'+username+'</h5>\n' +
                            '                                                        <span class="text-muted font-13">'+createAt+'</span>\n' +
                            '                                                    </td>\n' +
                            '                                                    <td>\n' +
                            '                                                        <h5 class="font-14 mb-1 font-weight-normal">'+moneys+'</h5>\n' +
                            '                                                        <span class="text-muted font-13">1 Tháng</span>\n' +
                            '                                                    </td>\n' +
                            '                                                    <td>\n' +
                            '                                                        <h5 class="font-14 mb-1 font-weight-normal">'+qyt+'</h5>\n' +
                            '                                                        <span class="text-muted font-13">Số lượng</span>\n' +
                            '                                                    </td>\n' +
                            '                                                    <td>\n' +
                            '                                                        <h5 class="font-14 mb-1 font-weight-normal">'+totals+'</h5>\n' +
                            '                                                        <span class="text-muted font-13">Tổng</span>\n' +
                            '                                                    </td>\n' +
                            '                                                    <td>\n' +
                            '                                                        <h5 class="font-14 mb-1 font-weight-normal">'+day_to_limit+'</h5>\n' +
                            '                                                        <span class="text-muted font-13">Ngày hết hạn </span>\n' +
                            '                                                    </td>\n' +
                            '                                                </tr>';
                    }
                }
                $('#toplist').html(toplist);
            },
            error: function () {

            }
        });
    }

});
