/**
 * Middleware: Requiere sesión activa
 */
function requireAuth(req, res, next) {
  if (req.session?.usuario) {
    return next();
  }
  if (req.xhr || req.headers.accept?.includes('application/json')) {
    return res.status(401).json({ error: 'Debe iniciar sesión para continuar.' });
  }
  res.redirect('/login.html');
}

module.exports = requireAuth;
