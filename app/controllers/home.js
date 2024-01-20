module.exports.home= function(app, request, response){
        if(request.session.id_tipo_usuario != 1 && request.session.id_tipo_usuario != 2){
                response.redirect('/usuario/login')
                return;
            }
        response.render('../views/home/index');              

}