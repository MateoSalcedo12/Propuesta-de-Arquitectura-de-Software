/**
 * Rutas de autenticación
 */
const express = require('express');
const router = express.Router();

function createAuthRouter(authService) {
  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !String(password).trim()) {
        return res.status(400).json({ error: 'El correo electrónico y la contraseña son obligatorios.' });
      }
      const usuario = await authService.login(email.trim(), password);
      if (!usuario) {
        return res.status(401).json({ error: 'Correo electrónico o contraseña incorrectos. Intente de nuevo.' });
      }
      req.session.usuario = usuario.toJSON();
      res.json(req.session.usuario);
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor. Intente más tarde.' });
    }
  });

  router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ ok: true });
  });

  router.get('/me', (req, res) => {
    if (req.session?.usuario) {
      return res.json(req.session.usuario);
    }
    res.status(401).json({ error: 'Debe iniciar sesión para continuar.' });
  });

  return router;
}

module.exports = createAuthRouter;
