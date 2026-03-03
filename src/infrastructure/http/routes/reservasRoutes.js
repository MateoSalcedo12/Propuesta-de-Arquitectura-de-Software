/**
 * Adaptador de entrada: Rutas HTTP (Express)
 * Traduce peticiones HTTP a llamadas al caso de uso.
 * El dominio no conoce Express ni HTTP.
 */
const express = require('express');
const router = express.Router();

function createReservasRouter(reservaService) {
  router.post('/', async (req, res) => {
    try {
      const reserva = await reservaService.crearReserva(req.body);
      res.status(201).json(reserva);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const reservas = await reservaService.listarReservas();
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const reserva = await reservaService.obtenerReserva(req.params.id);
      res.json(reserva);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const reserva = await reservaService.cancelarReserva(req.params.id);
      res.json(reserva);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

  return router;
}

module.exports = createReservasRouter;
