const modelUsuario = require("../models/modelUsuario");

module.exports.cadastro_usuario = function (app, request, response) {

    response.render('usuario/cadastro_usuario', { erros: {}, usuario: {} });

}
module.exports.cadastrar = function (app, request, response) {

    const dados = request.body;

    request.assert('nome', 'Você deve preencher o campo Nome').notEmpty();
    request.assert('email', 'Você deve preencher o campo Email').notEmpty();
    request.assert('senha', 'Você deve preencher o campo Senha').notEmpty();//len(20, 500);
    request.assert('senha', 'Sua senha deve ter ao menos 6 caracteres').len(6)

    const erros = request.validationErrors();

    if (erros) {
        response.render('usuario/cadastro_usuario', { erros: erros, usuario: dados });
        return;
    }

    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.getUsuarioEmail(dados.email, function (error, result) {
        if (result.length > 0) {
            let erros = [{ msg: 'Este e-mail já está sendo usado' }];
            response.render('usuario/cadastro_usuario', { erros: erros, usuario: dados });
        }
        else {
            modelUsuario.cadastrar(dados, function (error, result) {
                response.redirect('/usuario/login');
            });
        }
    });


}
module.exports.usuario_login = function (app, request, response) {
    response.render('usuario/login', { erros: {}, usuario: {} })
}

module.exports.validar = function (app, request, response) {
    const dados = request.body;

    request.assert('email', 'Você deve preencher o campo E-mail').notEmpty();
    request.assert('senha', 'Você deve preencher o campo Senha').notEmpty();

    const erros = request.validationErrors();

    if (erros) {
        response.render('usuario/login', { erros: erros, usuario: dados });
        return;
    }
    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.getUsuario(dados, function (error, result) {
        if (result.length <= 0) {
            let erros = [{ msg: 'Usuário não encontrado' }]
            response.render('usuario/login', { erros: erros, usuario: dados })
        }
        else {
            request.session.id_tipo_usuario = result[0].id_tipo_usuario;
            request.session.id_usuario = result[0].id;
            response.redirect('/')
        }
    })
}
module.exports.sair = function (app, request, response) {
    request.session.destroy(function (error) {
        response.redirect('/usuario/login');
    })
}
module.exports.listar = function (app, request, response) {

    const conexao = app.config.conexao;

    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.listar_usuarios(function (error, result) {
        response.render('usuario/listar_usuarios', { usuarios: result });
    });
}
module.exports.editar = function (app, request, response) {
    const idUsuario = request.params.idUsuario;


    const conexao = app.config.conexao;

    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.getUsuario(idUsuario, function (error, result) {
        response.render('usuario/login', { usuario: result });

    });
}
module.exports.abrirAlterar = function (app, request, response) {
    if (request.session.id_tipo_usuario != 1 && request.session.id_tipo_usuario != 2) {
        response.redirect('/usuario/login')
        return;
    }
    const idUsuario = request.session.id_usuario
    const conexao = app.config.conexao
    modelUsuario.get(idUsuario, function (error, usuario) {
        response.render('usuario/alterarDados', { usuario: usuario, erros: {} })
    })


}
module.exports.listaProdutos = function (app, request, response) {
    const conexao = app.config.conexao;
    const modelUsuario = new app.app.models.modelUsuario(conexao);

    modelUsuario.listaProdutos(function (error, result) {
        response.render('usuario/listaProdutos', { produtos: result });
    });

}
module.exports.adicionar = function (app, request, response) {





}
