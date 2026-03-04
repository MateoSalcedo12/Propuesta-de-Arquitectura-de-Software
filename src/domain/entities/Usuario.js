/**
 * Entidad de dominio: Usuario
 * Representa un usuario del sistema para autenticación.
 */
class Usuario {
  constructor({ id, email, nombre, passwordHash }) {
    this.id = id;
    this.email = email;
    this.nombre = nombre;
    this.passwordHash = passwordHash;
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      nombre: this.nombre
    };
  }
}

module.exports = Usuario;
