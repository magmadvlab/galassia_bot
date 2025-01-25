import React, { useState } from 'react';
import Chatbot from './chatbot/Chatbot'; // Importa la logica del chatbot

// Importa tutte le FAQ
import activitiesAndAttractionsFAQ_IT from './faq/it/activities_and_attractions_faq_it';
import diningFAQ_IT from './faq/it/dining_it';
import emergencyFAQ_IT from './faq/it/emergency_it';
import checkinFAQ_IT from './faq/it/checkin_it';
import checkoutFAQ_IT from './faq/it/checkout_it';
import petsFAQ_IT from './faq/it/pets_it';
import skiFAQ_IT from './faq/it/ski_it';
import techServicesFAQ_IT from './faq/it/tech_services_it';
import transportFAQ_IT from './faq/it/transport_it';
import wellnessFAQ_IT from './faq/it/wellness_it';

// Unisci tutte le FAQ in un unico oggetto
const allFAQs_IT = {
  activitiesAndAttractions: activitiesAndAttractionsFAQ_IT,
  dining: diningFAQ_IT,
  emergency: emergencyFAQ_IT,
  checkin: checkinFAQ_IT,
  checkout: checkoutFAQ_IT,
  pets: petsFAQ_IT,
  ski: skiFAQ_IT,
  techServices: techServicesFAQ_IT,
  transport: transportFAQ_IT,
  wellness: wellnessFAQ_IT,
};

// Inizializza il chatbot con tutte le FAQ
const chatbot = new Chatbot(allFAQs_IT);

function App() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSend = () => {
    if (userInput.trim() === '') return;

    // Ottieni la risposta dal chatbot
    const { response, followUp } = chatbot.getResponse(userInput);

    // Aggiorna la cronologia della chat
    setChatHistory((prev) => [
      ...prev,
      { user: true, text: userInput },
      { user: false, text: response },
    ]);

    // Pulisci l'input utente
    setUserInput('');
  };

  return (
    <div className="App">
      <div className="chat-window">
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={msg.user ? 'chat-message user' : 'chat-message bot'}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Fai una domanda..."
          />
          <button onClick={handleSend}>Invia</button>
        </div>
      </div>
    </div>
  );
}

export default App;
