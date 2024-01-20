module.exports = function (app){
    app.get('/produto/adicionar/:idProduto', function (request, response) {
        app.app.controllers.produto.adicionar(app, request, response)
    })

}