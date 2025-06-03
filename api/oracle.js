import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// IMPORTANTE: Carregar dotenv ANTES de importar outros módulos
dotenv.config();

// Verificar se as variáveis estão carregadas
console.log('🔍 Verificando variáveis de ambiente...');
console.log('GEMINI_API_KEY configurada:', !!process.env.GEMINI_API_KEY);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Importar controladores DEPOIS do dotenv
import oracleController from '../src/controllers/oracleController.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware de segurança
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: {
    error: 'Muitas requisições. Tente novamente em 15 minutos.',
    retryAfter: '15 minutes'
  }
});

app.use('/api/oracle', limiter);
app.use(express.json({ limit: '10mb' }));

// Rotas
app.get('/api/oracle', oracleController.getInfo);
app.post('/api/oracle/ask', oracleController.askQuestion);
app.get('/api/oracle/topics', oracleController.getTopics);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      hasGeminiKey: !!process.env.GEMINI_API_KEY
    }
  });
});

// // Middleware de erro
// app.use((err, req, res, next) => {
//   console.error('❌ Erro:', err.stack);
//   res.status(500).json({
//     error: 'Algo deu errado no servidor',
//     message: process.env.NODE_ENV === 'development' ? err.message : 'Erro interno'
//   });
// });

// // 404 handler
// app.use('*', (req, res) => {
//   res.status(404).json({
//     error: 'Endpoint não encontrado',
//     availableEndpoints: [
//       'GET /api/oracle',
//       'POST /api/oracle/ask',
//       'GET /api/oracle/topics',
//       'GET /api/health'
//     ]
//   });
// });

// Para desenvolvimento local
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📋 Health check: http://localhost:${PORT}/api/health`);
  });
}

export default app;