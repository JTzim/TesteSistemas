const Avaliacao = require('./avaliacao');
const Project = require('./Projects');
const User = require('./Users');
const CriterioAvaliacao = require('./criterioAvaliacao');

// Associação entre Avaliacao e Project
Avaliacao.belongsTo(Project, {
  foreignKey: 'projectId',
  as: 'Project'
});

Project.hasMany(Avaliacao, {
  foreignKey: 'projectId',
  as: 'avaliacoes'
});

// Associação entre Avaliacao e User (criador)
Avaliacao.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'User'
});

User.hasMany(Avaliacao, {
  foreignKey: 'createdBy',
  as: 'avaliacoes'
});

// Associações para CriterioAvaliacao
CriterioAvaliacao.belongsTo(Avaliacao, {
  foreignKey: 'fkAvaliacao',
  as: 'avaliacao'
});

Avaliacao.hasMany(CriterioAvaliacao, {
  foreignKey: 'fkAvaliacao',
  as: 'criterios'
});

CriterioAvaliacao.belongsTo(User, {
  foreignKey: 'avaliador',
  as: 'userAvaliador'
});

User.hasMany(CriterioAvaliacao, {
  foreignKey: 'avaliador',
  as: 'criteriosAvaliacao'
});

module.exports = {
  Avaliacao,
  Project,
  User,
  CriterioAvaliacao
}; 