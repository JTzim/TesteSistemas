const Avaliacao = require('./avaliacao');
const Project = require('./Projects');
const User = require('./Users');

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

module.exports = {
  Avaliacao,
  Project,
  User
}; 