/**
 * Caso de uso: Autenticación
 */
const Usuario = require('../../domain/entities/Usuario');
const bcrypt = require('bcryptjs');

class AuthService {
  constructor(usuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  async login(email, password) {
    const usuario = await this.usuarioRepository.buscarPorEmail(email);
    if (!usuario) return null;
    const coincide = await bcrypt.compare(password, usuario.passwordHash);
    return coincide ? usuario : null;
  }
}

module.exports = AuthService;
