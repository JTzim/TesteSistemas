const express = require('express');
const cors = require('cors');
const port = 3000;

const app = express();
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'DELETE','PUT'], 
    allowedHeaders: ['Content-Type'], 
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//Importação das rotas User
const loginUsuario = require('./routes/loginUsuario');
const mockUsers = require('./routes/read/mockUsers');
const createUser = require('./routes/create/createUser');
const editUser = require('./routes/update/editUser');
//Importação das rotas Project
const createProject = require('./routes/create/createProject');
const editProject = require('./routes/update/editProject');
const deleteProject = require('./routes/delete/deleteProject');
const mockProjects = require('./routes/read/mockProjects');
//Importação das rotas TestCase
const mockTestCases =  require('./routes/read/mockTestCases');
const createTestCase = require('./routes/create/createTestCase');
const editTestCase = require('./routes/update/editTestCase');
const deleteTestCase = require('./routes/delete/deleteTestcase');
const countTest  = require('./routes/countTests');
const countCategory  = require('./routes/countCategory');
//Importação das rotas TestPlan
const mockTestPlans = require('./routes/read/mockTestPlans');
const createTestPlan = require('./routes/create/createTestPlan');
const editTestPlan = require('./routes/update/editTestPlan');
const deleteTestPlan = require('./routes/delete/deleteTestplan');
//Importação das rotas RecentActivity
const mockRecentActivity = require('./routes/read/mockRecentActivity');
//Importação das rotas Avaliacao
const createAvaliacao = require('./routes/create/createAvaliacao');
const mockAvaliacao = require('./routes/read/mockAvaliacao');
const deleteAvaliacao = require('./routes/delete/deleteAvaliacao');

//Importação das rotas CriterioAvaliacao
const createCriterioAvaliacao = require('./routes/create/createCriterioAvaliacao');
const mockCriterioAvaliacao = require('./routes/read/mockCriterioAvaliacao');
const editCriterioAvaliacao = require('./routes/update/editCriterioAvaliacao');
const deleteCriterioAvaliacao = require('./routes/delete/deleteCriterioAvaliacao');

//Rota de Login de Usuários
app.use('/', loginUsuario);

//Rota para Mostrar usuários
app.use('/', mockUsers);

//Rota para Cadastrar usuário
app.use('/', createUser);

//Rota para Editar usuário
app.use('/', editUser);

//Rota para Mostrar projetos
app.use('/', mockProjects);

//Rota para Cadastrar projetos
app.use('/', createProject);

//Rota para Editar projetos
app.use('/', editProject);

//Rota para Deletar projetos
app.use('/', deleteProject);

//Rota para Mostrar casos de teste
app.use('/', mockTestCases);

//Rota para Criar casos de teste
app.use('/', createTestCase);

//Rota para Editar casos de teste
app.use('/', editTestCase)

//Rota para Deletar casos de teste
app.use('/', deleteTestCase); 

//Rota para Mostrar Planos de Teste
app.use('/', mockTestPlans);

//Rota para Criar Planos de Teste
app.use('/', createTestPlan);

//Rota para Editar Planos de Teste
app.use('/', editTestPlan);

//Rota para Deletar Planos de Teste
app.use('/', deleteTestPlan);

//Rota para Mostrar Casos de Teste  no gráfico
app.use('/', countTest);

//Rota para Mostrar as categorias  no gráfico
app.use('/', countCategory);

//Rota para Mostrar atividades recentes
app.use('/', mockRecentActivity);

//Rota para Criar Avaliações
app.use('/createAvaliacao', createAvaliacao);

//Rota para Deletar Avaliações
app.use('/', deleteAvaliacao);

//Rota para Mostrar Avaliações
app.use('/', mockAvaliacao);

//Rota para Criar Critérios de Avaliação
app.use('/', createCriterioAvaliacao);

//Rota para Mostrar Critérios de Avaliação
app.use('/', mockCriterioAvaliacao);

//Rota para Editar Critérios de Avaliação
app.use('/', editCriterioAvaliacao);

//Rota para Deletar Critérios de Avaliação
app.use('/', deleteCriterioAvaliacao);

app.listen(port, ()=>{
    console.log(`Servidor rodando http://localhost:${port}`)
})