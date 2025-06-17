const Sequelize = require('sequelize');
const sequelize = new Sequelize('TesteSistema','root','9212C4636v',{
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log("Conectado com sucesso!")
}).catch((erro)=>{
    console.log("Falha ao se conectar: "+ erro);
})

module.exports ={
    Sequelize: Sequelize,
    sequelize: sequelize
}