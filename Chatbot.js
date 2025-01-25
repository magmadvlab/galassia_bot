// Importa le FAQ (puoi modificare i percorsi in base alla tua struttura)
import activitiesAndAttractionsFAQ_IT from '../faq/it/activities_and_attractions_faq_it';

// Classe principale del chatbot
class Chatbot {
  constructor(faq) {
    this.faq = faq;
  }

  // Metodo per processare l'input utente e trovare una risposta
  getResponse(userInput) {
    const input = userInput.toLowerCase().trim();

    // Cerca nelle FAQ
    for (const category in this.faq) {
      const { questions } = this.faq[category];
      for (const question in questions) {
        const { answer, tags } = questions[question];

        // Controlla se l'input corrisponde ai tag o alla domanda
        if (
          tags.some((tag) => input.includes(tag.toLowerCase())) ||
          input.includes(question.toLowerCase())
        ) {
          return { response: answer, followUp: questions[question].followUp || [] };
        }
      }
    }

    // Risposta fallback se non trova nulla
    return {
      response: 'Mi dispiace, non ho trovato una risposta. Contatta la reception per maggiori dettagli.',
      followUp: [],
    };
  }
}

export default Chatbot;
