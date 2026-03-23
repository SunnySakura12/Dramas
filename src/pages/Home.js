import React, { useState } from 'react';

const Home = () => {
  const [language, setLanguage] = useState('en');

  const categories = {
    en: {
      korean: 'Korean',
      taiwanese: 'Taiwanese',
      thai: 'Thai',
      chinese: 'Chinese',
      japanese: 'Japanese',
      indian: 'Indian'
    },
    es: {
      korean: 'Coreano',
      taiwanese: 'Taiwanés',
      thai: 'Tailandés',
      chinese: 'Chino',
      japanese: 'Japonés',
      indian: 'Indio'
    }
  };

  const switchLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <div>
      <h1>{language === 'en' ? 'Video Categories' : 'Categorías de Video'}</h1>
      <div>
        <button onClick={() => switchLanguage('en')}>English</button>
        <button onClick={() => switchLanguage('es')}>Spanish</button>
      </div>
      <ul>
        {Object.keys(categories[language]).map((key) => (
          <li key={key}>{categories[language][key]}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
