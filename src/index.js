/**
 * Punto de entrada - Composición de la aplicación
 */
const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require('bcryptjs');

const ReservaRepositoryInMemory = require('./infrastructure/adapters/ReservaRepositoryInMemory');
const UsuarioRepositoryInMemory = require('./infrastructure/adapters/UsuarioRepositoryInMemory');
const ReservaService = require('./application/services/ReservaService');
const AuthService = require('./application/services/AuthService');
const createReservasRouter = require('./infrastructure/http/routes/reservasRoutes');
const createAuthRouter = require('./infrastructure/http/routes/authRoutes');
const requireAuth = require('./infrastructure/http/middleware/requireAuth');

// Composición
const reservaRepository = new ReservaRepositoryInMemory();
const usuarioRepository = new UsuarioRepositoryInMemory();
const reservaService = new ReservaService(reservaRepository);
const authService = new AuthService(usuarioRepository);

const app = express();
app.use(express.json());
app.use(session({
  secret: 'reservas-medicas-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

// Rutas públicas
app.use('/api/auth', createAuthRouter(authService));

// Proteger dashboard: redirigir a login si no hay sesión (antes de static)
app.get('/', (req, res, next) => {
  if (!req.session?.usuario) return res.redirect('/login.html');
  next();
});
app.get('/index.html', (req, res, next) => {
  if (!req.session?.usuario) return res.redirect('/login.html');
  next();
});

app.use(express.static(path.join(__dirname, '../public')));

// API protegida
app.use('/api/reservas', requireAuth, createReservasRouter(reservaService));

// API info (para clientes que consulten /api)
app.get('/api', (req, res) => {
  res.json({
    nombre: 'Sistema de Reservas Médicas',
    arquitectura: 'Hexagonal (Ports and Adapters)',
    endpoints: {
      'POST /api/reservas': 'Crear reserva',
      'GET /api/reservas': 'Listar reservas (?estado=CONFIRMADA|CANCELADA para filtrar)',
      'GET /api/reservas/:id': 'Obtener reserva',
      'DELETE /api/reservas/:id': 'Cancelar reserva'
    }
  });
});

const PORT = process.env.PORT || 3000;

async function iniciar() {
  const Usuario = require('./domain/entities/Usuario');
  const hash = await bcrypt.hash('admin123', 10);
  await usuarioRepository.guardar(new Usuario({
    id: 'u1',
    email: 'admin@test.com',
    nombre: 'Administrador',
    passwordHash: hash
  }));
  app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
    console.log('Usuario demo: admin@test.com / admin123');
  });
}

iniciar();
