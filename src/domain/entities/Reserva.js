/**
 * Entidad de dominio: Reserva
 * Representa una cita médica en el núcleo del sistema.
 * No depende de frameworks ni infraestructura.
 */
class Reserva {
  constructor({ id, pacienteId, pacienteNombre, medicoId, fecha, hora, motivo, estado = 'CONFIRMADA', creadaEn }) {
    this.id = id;
    this.pacienteId = pacienteId;
    this.pacienteNombre = pacienteNombre;
    this.medicoId = medicoId;
    this.fecha = fecha;
    this.hora = hora;
    this.motivo = motivo && motivo.trim() ? motivo.trim() : 'Consulta general';
    this.estado = estado;
    this.creadaEn = creadaEn || new Date().toISOString();
  }

  cancelar() {
    if (this.estado === 'CANCELADA') {
      throw new Error('La reserva ya está cancelada');
    }
    this.estado = 'CANCELADA';
    return this;
  }

  esValida() {
    return this.pacienteId && this.pacienteNombre && this.medicoId && this.fecha && this.hora;
  }
}

module.exports = Reserva;
