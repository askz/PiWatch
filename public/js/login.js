$(document).ready(function(){


    $('.log-btn').click(function(){
        var login       = $('input#login').val();
        var password    = $('input#password').val();

        console.log(login, password);
        var posting = $.post('login', {login:login, password:password});

        posting.done(function(data){
           console.log(data);
        });

        $('.log-status').addClass('wrong-entry');
        $('.alert').fadeIn(500);
        setTimeout( "$('.alert').fadeOut(1500);",3000 );
    });
    $('.form-control').keypress(function(){
        $('.log-status').removeClass('wrong-entry');
    });
});