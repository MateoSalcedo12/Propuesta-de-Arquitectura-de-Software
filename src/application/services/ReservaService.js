/**
 * Caso de uso: ReservaService
 * Orquesta la lógica de negocio utilizando los puertos.
 * No conoce detalles de implementación (HTTP, base de datos, etc.)
 */
const Reserva = require('../../domain/entities/Reserva');
const crypto = require('crypto');

class ReservaService {
  constructor(reservaRepository) {
    this.reservaRepository = reservaRepository;
  }

  async crearReserva(datos) {
    const id = crypto.randomUUID ? crypto.randomUUID() : `res-${Date.now()}`;
    const reserva = new Reserva({ id, ...datos });

    if (!reserva.esValida()) {
      throw new Error('Datos incompletos: pacienteId, pacienteNombre, medicoId, fecha y hora son obligatorios');
    }

    await this.reservaRepository.guardar(reserva);
    return reserva;
  }

  async obtenerReserva(id) {
    const reserva = await this.reservaRepository.buscarPorId(id);
    if (!reserva) {
      throw new Error(`Reserva no encontrada: ${id}`);
    }
    return reserva;
  }

  async listarReservas(estado = null) {
    const reservas = await this.reservaRepository.listarTodas();
    if (estado) {
      return reservas.filter(r => r.estado === estado);
    }
    return reservas;
  }

  async cancelarReserva(id) {
    const reserva = await this.obtenerReserva(id);
    reserva.cancelar();
    await this.reservaRepository.actualizar(reserva);
    return reserva;
  }
}

module.exports = ReservaService;
