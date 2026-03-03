/**
 * Puerto (puerto de salida): Interface para persistencia de reservas
 * El dominio define QUÉ necesita, no CÓMO se implementa.
 * Permite cambiar la base de datos sin afectar al núcleo.
 */
class ReservaRepository {
  async guardar(reserva) {
    throw new Error('Método no implementado - debe ser implementado por un adaptador');
  }

  async buscarPorId(id) {
    throw new Error('Método no implementado - debe ser implementado por un adaptador');
  }

  async listarTodas() {
    throw new Error('Método no implementado - debe ser implementado por un adaptador');
  }

  async actualizar(reserva) {
    throw new Error('Método no implementado - debe ser implementado por un adaptador');
  }
}

module.exports = ReservaRepository;
