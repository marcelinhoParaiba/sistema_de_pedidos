const { findSourceMap } = require('module');

function TipoUsuario (conexao){
    this._conexao = conexao;
    this._crypto = require('crypto');
}

TipoUsuario.prototype.getTipos = function (callback){
    this._conexao.query('select * from tipo_usuario', callback)
}

module.exports = function () {
    return TipoUsuario;
}