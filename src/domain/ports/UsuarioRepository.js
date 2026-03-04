/**
 * Puerto: Interface para persistencia de usuarios
 */
class UsuarioRepository {
  async buscarPorEmail(email) {
    throw new Error('Método no implementado');
  }
}

module.exports = UsuarioRepository;
