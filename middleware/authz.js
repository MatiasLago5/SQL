

module.exports.requireRole = function requireRole(role) {
  return (req, res, next) => {
    // Accept both custom headers for convenience in dev
    const headerRole = req.header('Authorization-Role') || req.header('X-Role');
    const currentRole = (req.user && req.user.role) || headerRole || 'user';

    if (currentRole !== role) {
      return res.status(403).json({ error: 'Forbidden: insufficient role' });
    }
    next();
  };
};

// Solo puede ser modificado por el admin o el mismo usuario que lo creó
module.exports.articleOwnerOrAdmin = function articleOwnerOrAdmin(ArticleModel) {
  return async (req, res, next) => {
    try {
      const headerRole = req.header('Authorization-Role') || req.header('X-Role');
      const headerUserId = req.header('Authorization-User-Id') || req.header('X-User-Id');
      const role = (req.user && req.user.role) || headerRole || 'user';
      const userId = (req.user && req.user.id) || (headerUserId ? parseInt(headerUserId, 10) : undefined);

      if (role === 'admin') return next();

      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized: missing user id' });
      }

      const article = await ArticleModel.findByPk(req.params.id);
      if (!article) return res.status(404).json({ error: 'Article not found' });

      if (article.userId !== userId) {
        return res.status(403).json({ error: 'Forbidden: not owner' });
      }
      return next();
    } catch (err) {
      return res.status(500).json({ error: 'Internal error', details: err.message });
    }
  };
}
