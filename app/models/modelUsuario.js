const usuario = require('../rotas/usuario');

function Usuario (conexao){
    this._conexao = conexao;
    this._crypto = require('crypto');
}
Usuario.prototype.salvarProduto = function(dados, callback){
    dados.senha = this._crypto.createHash('md5').update(dados.senha).digest('hex');
    this._conexao.query(`update produto set descricao='${dados.descricao}',preco'${dados.preco}'where id_produto=${dados.produto}'`, callback)
}

Usuario.prototype.cadastrar = function(dados, callback){
    dados.senha = this._crypto.createHash('md5').update(dados.senha).digest('hex');
    this._conexao.query(`insert into usuario values (null,'${dados.nome}','${dados.senha}','${dados.email}',1)`, callback)
}

Usuario.prototype.getUsuarioEmail =function (email, callback){
    this._conexao.query(`select * from usuario where email = '${email}'`, callback)
}

Usuario.prototype.getUsuario = function(dados, callback){
    const senha = this._crypto.createHash('md5').update(dados.senha).digest('hex')
    this._conexao.query(`select * from usuario where email = '${dados.email}' and senha = '${senha}'`, callback)
}

Usuario.prototype.getUsuarioById = function(id, callback){
    this._conexao.query(`select * from usuario where id = '${id}'`, callback)
}

Usuario.prototype.listar_usuarios = function(callback){
    this._conexao.query(`select * from usuario`, callback)
}
Usuario.prototype.listaProdutos = function(callback){
    this._conexao.query(`select * from produto`, callback)
}

Usuario.prototype.editar = function(dados, id, callback){
    this._conexao.query(`update usuario set nome = '${dados.nome}', email ='${dados.email}', senha ='${dados.senha}', id_tipo_usuario ='${dados.id_tipo_usuario}'where id = ${id}`, callback)
}

Usuario.prototype.excluir = function(id, callback){
    this._conexao.query(`delete from usuario where id = ${id}`, callback)
}    
Usuario.prototype.salvar = function(dados, id, callback){
    this._conexao.query(`update usuario set nome = '${dados.nome}', email = '${dados.email}', id_tipo_usuario = '${dados.id_tipo_usuario}' where id = ${id}`, callback)
}

module.exports = function(){

    return Usuario;

}