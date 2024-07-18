// Exemplo de endpoint de exclusão
app.delete('/api/resource/:id', (req, res) => {
  const resourceId = req.params.id;
  
  // Acesso baseado apenas no ID do recurso, sem verificação de permissão
  deleteResource(resourceId);
  res.status(200).send('Resource deleted');
});



// Middleware para verificar permissões
function checkAdmin(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Forbidden');
  }
  next();
}

// Endpoint de exclusão com verificação de permissões
app.delete('/api/resource/:id', checkAdmin, (req, res) => {
  const resourceId = req.params.id;
  
  // Acesso permitido apenas se o usuário for um administrador
  deleteResource(resourceId);
  res.status(200).send('Resource deleted');
});
