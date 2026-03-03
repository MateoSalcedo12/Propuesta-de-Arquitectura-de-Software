/**
 * Punto de entrada - Composición de la aplicación
 * Aquí se ensamblan los adaptadores con el núcleo (inyección de dependencias)
 */
const express = require('express');
const ReservaRepositoryInMemory = require('./infrastructure/adapters/ReservaRepositoryInMemory');
const ReservaService = require('./application/services/ReservaService');
const createReservasRouter = require('./infrastructure/http/routes/reservasRoutes');

// Composición: crear adaptadores e inyectar en el servicio
const reservaRepository = new ReservaRepositoryInMemory();
const reservaService = new ReservaService(reservaRepository);

const path = require('path');

const app = express();
app.use(express.json());

// Interfaz web estática
app.use(express.static(path.join(__dirname, '../public')));

// Montar rutas API
app.use('/api/reservas', createReservasRouter(reservaService));

// API info (para clientes que consulten /api)
app.get('/api', (req, res) => {
  res.json({
    nombre: 'Sistema de Reservas Médicas',
    arquitectura: 'Hexagonal (Ports and Adapters)',
    endpoints: {
      'POST /api/reservas': 'Crear reserva',
      'GET /api/reservas': 'Listar reservas',
      'GET /api/reservas/:id': 'Obtener reserva',
      'DELETE /api/reservas/:id': 'Cancelar reserva'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
