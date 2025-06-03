import geminiService from '../services/geminiService.js';
import knowledgeService from '../services/knowledgeService.js';
import { formatResponse, formatError } from '../utils/responseFormatter.js';

const oracleController = {
  async getInfo(req, res) {
    try {
      const info = {
        name: 'Portfolio Oracle API',
        version: '1.0.0',
        description: 'API que funciona como oráculo sobre informações pessoais',
        endpoints: {
          ask: 'POST /api/oracle/ask - Fazer perguntas',
          topics: 'GET /api/oracle/topics - Ver tópicos disponíveis'
        },
        usage: {
          askExample: {
            method: 'POST',
            url: '/api/oracle/ask',
            body: {
              question: 'Quais são suas habilidades técnicas?'
            }
          }
        }
      };
      
      res.json(formatResponse(info));
    } catch (error) {
      res.status(500).json(formatError(error.message));
    }
  },

  async askQuestion(req, res) {
    try {
      const { question } = req.body;
      
      if (!question || typeof question !== 'string') {
        return res.status(400).json(
          formatError('Pergunta é obrigatória e deve ser uma string')
        );
      }

      if (question.length > 500) {
        return res.status(400).json(
          formatError('Pergunta muito longa. Máximo 500 caracteres.')
        );
      }

      const context = knowledgeService.getContextForQuestion(question);
      const answer = await geminiService.generateResponse(question, context);
      console.log('Resposta gerada:', answer);
      res.json(formatResponse({
        question,
        answer,
        timestamp: new Date().toISOString(),
        contextUsed: context.topics
      }));
      
    } catch (error) {
      console.error('Erro ao processar pergunta:', error);
      res.status(500).json(formatError('Erro ao processar sua pergunta'));
    }
  },

  async getTopics(req, res) {
    try {
      const topics = knowledgeService.getAvailableTopics();
      res.json(formatResponse({ topics }));
    } catch (error) {
      res.status(500).json(formatError(error.message));
    }
  }
};

export default oracleController;