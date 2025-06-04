# 🔮 Oráculo Gemini API

Uma API Node.js inteligente que funciona como um oráculo pessoal, integrada ao Google Gemini AI. Fornece respostas contextualizadas sobre uma pessoa específica baseadas em uma base de dados personalizada.

## ✨ Características

- 🤖 **Integração com Google Gemini AI** (modelo gemini-1.5-flash)
- 👤 **Oráculo Personalizado** - Responde perguntas sobre Arthur Ritzel
- 📊 **Base de Dados Contextual** - Utiliza informações específicas para respostas precisas
- 🚀 **Deploy na Vercel** - Hospedagem serverless otimizada
- 🌐 **API RESTful** - Endpoints simples e eficientes
- 📝 **Respostas em Markdown** - Formatação rica com emojis
- 🇧🇷 **Português Brasileiro** - Respostas naturais e conversacionais
- 🛡️ **Middlewares de Segurança** - Helmet, CORS, Rate Limiting
- 📝 **Validação Robusta** - Limite de caracteres e validação de tipos
- 🎯 **Sistema de Tópicos** - Contextualização inteligente por assunto
- 📊 **Formatação Padronizada** - Respostas consistentes da API
- 🏥 **Health Check** - Monitoramento de status do servidor

## 🏗️ Arquitetura

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Cliente   │───▶│ Vercel API  │───▶│ Gemini AI   │
└─────────────┘    └─────────────┘    └─────────────┘
                           │
                           ▼
                   ┌─────────────┐
                   │ Base Dados  │
                   │ Contextual  │
                   └─────────────┘
```

## 🚀 Deploy na Vercel

### Pré-requisitos

- Conta na [Vercel](https://vercel.com)
- Chave de API do [Google Gemini](https://makersuite.google.com/app/apikey)
- Node.js 18+ (para desenvolvimento local)

### Deploy Rápido

1. **Fork ou Clone o repositório:**
```bash
git clone https://github.com/arthurritzel/oraculoGemini.git
cd oraculoGemini
```

2. **Configure na Vercel:**
```bash
npm i -g vercel
vercel
```

3. **Configure as variáveis de ambiente na Vercel:**
   - Acesse o dashboard da Vercel
   - Vá em Settings > Environment Variables
   - Adicione: `GEMINI_API_KEY` com sua chave da API

4. **Deploy automático:**
   - A Vercel fará o deploy automaticamente a cada push na main

### Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Edite o .env com sua GEMINI_API_KEY

# Executar localmente
npm run dev
```

## 📡 Uso da API

### Endpoints Disponíveis

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/oracle` | Informações da API |
| `POST` | `/api/oracle/ask` | Fazer perguntas ao oráculo |
| `GET` | `/api/oracle/topics` | Tópicos disponíveis |
| `GET` | `/api/health` | Health check do servidor |

### 🤖 Fazer Pergunta ao Oráculo

**Endpoint:** `POST /api/oracle/ask`

```javascript
const response = await fetch('/api/oracle/ask', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    question: "Qual é a experiência profissional do Arthur?"
  })
});

const data = await response.json();
console.log(data.data.answer);
```

**Resposta de Sucesso:**
```json
{
  "success": true,
  "data": {
    "question": "Qual é a experiência profissional do Arthur?",
    "answer": "## 💼 Experiência Profissional\n\n**Arthur Ritzel** possui uma sólida trajetória...",
    "timestamp": "2024-06-04T10:30:00Z",
    "contextUsed": ["professional", "skills"]
  }
}
```

### 📋 Ver Tópicos Disponíveis

**Endpoint:** `GET /api/oracle/topics`

```javascript
const response = await fetch('/api/oracle/topics');
const data = await response.json();
console.log(data.data.topics);
```

### ℹ️ Informações da API

**Endpoint:** `GET /api/oracle`

```javascript
const response = await fetch('/api/oracle');
const data = await response.json();
```

### 🏥 Health Check

**Endpoint:** `GET /api/health`

```javascript
const response = await fetch('/api/health');
// Retorna status do servidor e configurações
```

### Exemplo com cURL

```bash
# Fazer uma pergunta
curl -X POST https://seu-projeto.vercel.app/api/oracle/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Quais são as principais habilidades técnicas?"}'

# Ver tópicos
curl https://seu-projeto.vercel.app/api/oracle/topics

# Health check
curl https://seu-projeto.vercel.app/api/health
```

## 🛠️ Estrutura do Projeto

```
oraculoGemini/
├── api/
│   └── oracle.js              # Servidor Express principal
├── src/
│   ├── controllers/
│   │   └── oracleController.js # Controller da API
│   ├── services/
│   │   ├── geminiService.js   # Integração com Gemini AI
│   │   └── knowledgeService.js # Base de conhecimento
│   └── utils/
│   |   └── responseFormatter.js # Formatação de respostas
│   └── data/
│       └── knowledge.js # Base de conhecimento
|
├── .env.example               # Exemplo de variáveis
├── vercel.json                # Configuração da Vercel
├── package.json               # Dependências Node.js
└── README.md                  # Este arquivo
```


## 🧪 Testes e Desenvolvimento

### Executar Localmente

```bash
# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env
# Edite .env com GEMINI_API_KEY

# Modo desenvolvimento  
npm run dev
# ou
npm start

# Servidor rodará em http://localhost:3001
```

### Testar Endpoints

```bash
# Health check
curl http://localhost:3001/api/health

# Informações da API
curl http://localhost:3001/api/oracle

# Fazer pergunta
curl -X POST http://localhost:3001/api/oracle/ask \
  -H "Content-Type: application/json" \
  -d '{"question": "Teste básico de funcionamento"}'

# Ver tópicos disponíveis
curl http://localhost:3001/api/oracle/topics
```

### Scripts Disponíveis

```json
{
  "scripts": {
    "dev": "nodemon --env-file=.env api/oracle.js",
    "start": "node api/oracle.js",
    "test-env": "node -e \"import dotenv from 'dotenv'; dotenv.config(); console.log('GEMINI_API_KEY:', !!process.env.GEMINI_API_KEY);\"",
    "deploy": "vercel --prod"
  },
}
```


## 🔒 Segurança e Validações

### 🛡️ Middlewares Implementados

- **Helmet** - Proteção contra vulnerabilidades web comuns
- **CORS** - Controle de origem cross-domain configurável  
- **Rate Limiting** - 20 requisições por IP a cada 15 minutos
- **Body Parser** - Limite de 10MB para prevenir ataques DoS

### 🔑 Variáveis de Ambiente Seguras

```env
# Obrigatória
GEMINI_API_KEY=sua_chave_do_google_gemini

# Opcionais de segurança  
ALLOWED_ORIGINS=https://meusite.com,https://app.meusite.com
NODE_ENV=production
PORT=3001
```


## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👨‍💻 Autor

**Arthur Ritzel**
- 🐙 GitHub: [@arthurritzel](https://github.com/arthurritzel)
- 💼 LinkedIn: [Arthur Ritzel](https://linkedin.com/in/arthurritzel)
- 🌐 Website: [Portfolio](https://aritzel.dev)


---


⭐ **Se este projeto foi útil, considere dar uma estrela no repositório!**

---

*Desenvolvido usando Node.js, Google Gemini AI e Vercel*
