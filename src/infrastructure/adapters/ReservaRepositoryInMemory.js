/**
 * Adaptador: Implementación en memoria del puerto ReservaRepository
 * Para la prueba de concepto no requiere base de datos.
 * Fácilmente reemplazable por ReservaRepositoryMySQL, etc.
 */
const ReservaRepository = require('../../domain/ports/ReservaRepository');

class ReservaRepositoryInMemory extends ReservaRepository {
  constructor() {
    super();
    this.reservas = new Map();
  }

  async guardar(reserva) {
    this.reservas.set(reserva.id, { ...reserva });
    return reserva;
  }

  async buscarPorId(id) {
    const datos = this.reservas.get(id);
    if (!datos) return null;
    const Reserva = require('../../domain/entities/Reserva');
    return new Reserva(datos);
  }

  async listarTodas() {
    const Reserva = require('../../domain/entities/Reserva');
    return Array.from(this.reservas.values()).map(d => new Reserva(d));
  }

  async actualizar(reserva) {
    this.reservas.set(reserva.id, { ...reserva });
    return reserva;
  }
}

module.exports = ReservaRepositoryInMemory;
