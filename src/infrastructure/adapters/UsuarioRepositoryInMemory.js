/**
 * Adaptador: Usuarios en memoria
 */
const UsuarioRepository = require('../../domain/ports/UsuarioRepository');
const Usuario = require('../../domain/entities/Usuario');

class UsuarioRepositoryInMemory extends UsuarioRepository {
  constructor() {
    super();
    this.usuarios = new Map();
  }

  async buscarPorEmail(email) {
    const normalizado = email?.toLowerCase().trim();
    for (const u of this.usuarios.values()) {
      if (u.email.toLowerCase() === normalizado) return new Usuario(u);
    }
    return null;
  }

  async guardar(usuario) {
    const datos = { ...usuario };
    this.usuarios.set(usuario.id, datos);
    return new Usuario(datos);
  }

  async listarTodos() {
    return Array.from(this.usuarios.values()).map(d => new Usuario(d));
  }
}

module.exports = UsuarioRepositoryInMemory;
