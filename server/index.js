import { createServer } from 'node:http';

const port = Number(process.env.PORT || 3001);
const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  if (req.method === 'OPTIONS') { res.writeHead(204); return res.end(); }
  if (req.method === 'GET' && req.url === '/api/health') {
    res.writeHead(200); return res.end(JSON.stringify({ status: 'ok', service: 'pontoclaro-api' }));
  }
  if (req.method === 'POST' && req.url === '/api/auth/login') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body || '{}');
        if (!email || !password) { res.writeHead(400); return res.end(JSON.stringify({ error: 'Informe e-mail e senha.' })); }
        // Protótipo: autenticação demonstrativa, substituir por validação segura e persistida.
        res.writeHead(200);
        res.end(JSON.stringify({ token: 'demo-session', user: { name: 'Leonardo Bimmel', email, role: 'admin' } }));
      } catch { res.writeHead(400); res.end(JSON.stringify({ error: 'Requisição inválida.' })); }
    });
    return;
  }
  res.writeHead(404); res.end(JSON.stringify({ error: 'Rota não encontrada.' }));
});
server.listen(port, () => console.log(`PontoClaro API disponível em http://localhost:${port}`));
