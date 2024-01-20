module.exports = function (app){


    app.get('/usuarios/editar/:idUsuario', function (request, response){
        app.app.controllers.admin.tela_edicao(app, request, response)
    })

    app.get('/usuarios/excluir/:idUsuario', function (request, response){
        app.app.controllers.admin.excluir(app, request, response)
    })
    
    app.get('/usuarios/editar/:idProduto', function (request, response){
        app.app.controllers.admin.listaProdutos(app, request, response)
    })

    app.post('/usuarios/salvar/:idUsuario', function (request, response){
        app.app.controllers.admin.salvar(app, request, response)
    })
    app.post('/usuarios/salvar/:idUsuario', function (request, response){
        app.app.controllers.admin.salvar(app, request, response)
    })



}