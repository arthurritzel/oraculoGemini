import knowledge from '../data/knowledge.js';

class KnowledgeService {
  getContextForQuestion(question) {
    const questionLower = question.toLowerCase();
    const relevantTopics = [];
    let contextData = '';

    // Mapear palavras-chave para tópicos
    const topicMapping = {
      'habilidade': ['skills', 'experience'],
      'experiência': ['experience', 'projects'],
      'projeto': ['projects', 'skills'],
      'educação': ['education'],
      'formação': ['education'],
      'contato': ['contact'],
      'pessoal': ['personal'],
      'trabalho': ['experience', 'projects'],
      'tecnologia': ['skills', 'projects'],
      'linguagem': ['skills'],
      'framework': ['skills']
    };

    // Identificar tópicos relevantes
    for (const [keyword, topics] of Object.entries(topicMapping)) {
      if (questionLower.includes(keyword)) {
        relevantTopics.push(...topics);
      }
    }

    // Se não encontrou tópicos específicos, incluir todos
    if (relevantTopics.length === 0) {
      relevantTopics.push(...Object.keys(knowledge));
    }

    // Remover duplicatas
    const uniqueTopics = [...new Set(relevantTopics)];

    // Construir contexto
    uniqueTopics.forEach(topic => {
      if (knowledge[topic]) {
        contextData += `\n## ${topic.toUpperCase()}\n${knowledge[topic]}\n`;
      }
    });

    return {
      topics: uniqueTopics,
      data: contextData
    };
  }

  getAvailableTopics() {
    return Object.keys(knowledge).map(topic => ({
      topic,
      description: this.getTopicDescription(topic)
    }));
  }

  getTopicDescription(topic) {
    const descriptions = {
      personal: 'Informações pessoais básicas',
      skills: 'Habilidades técnicas e competências',
      experience: 'Experiência profissional',
      education: 'Formação acadêmica',
      projects: 'Projetos desenvolvidos',
      contact: 'Informações de contato'
    };
    
    return descriptions[topic] || 'Informações gerais';
  }
}

export default new KnowledgeService();