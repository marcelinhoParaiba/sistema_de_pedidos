module.exports.admin= function(app, request, response){
    if(request.session.id_tipo_usuario != 2){cadastroNoticia
        response.redirect('/usuario/login')
        return;
    }
    response.render('../views/admin/cadastroNoticia', {erros: {}, noticia: {}});

}

module.exports.listar_usuarios = function(app, request, response){
    if(request.session.id_tipo_usuario != 2){
        response.redirect('/usuario/login')
        return;
    }
    
    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.listar_usuarios(function (error, result){
        response.render('usuario/listar_usuarios', {usuarios: result})
    })
}

module.exports.excluir = function(app, request, response){
    const idUsuario = request.params.idUsuario;

    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.excluir(idUsuario, function(error, result){
        response.redirect('/lista_usuarios')
    })
}

module.exports.tela_edicao = function (app, request, response){
    const idUsuario = request.params.idUsuario;

    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    const modelTipoUsuario = new app.app.models.modelTipoUsuario(conexao);

    modelUsuario.getUsuarioById(idUsuario, function(error, usuario){
        modelTipoUsuario.getTipos(function(error, tipos){

            response.render('usuario/editar_usuario', {usuario: usuario, tipos: tipos, erros: {}})
        })
    })
}
module.exports.salvarProduto = function (app, request, response){
    const idUsuario = request.body;
    const conexao = app.config.conexao;
    const modelUsuario =new app.app.models.modelAdmin(conexao);

    modelUsuario.salvar(dados,  function(error, result) {
        response.redirect('admin/listaProdutos',{erros:{},produtos});

    })
}

module.exports.salvar = function (app, request, response){
    const idUsuario = request.params.idUsuario;
    const dados = request.body;
        
    const conexao = app.config.conexao;
    
    const modelUsuario =new app.app.models.modelUsuario(conexao);

    modelUsuario.salvar(dados, idUsuario, function(error, result) {
        response.redirect('/lista_usuarios');

    });
}
