import pkg from './lib/scoring.js';
const { calculateNIS2Score } = pkg;

const fakeAnswers = {
  q1: "Oui",      // RSSI nommé
  q2: "Non",      // Pas de PSSI
  q3: "Oui",      // Direction ok
  q4: "Non",      // Pas de formation
  q5: "Non",      // Pas d'analyse risque
  q6: "En partie",// Patchs moyens
  q7: "Non",      // Pas de procédure incident
  q8: "Non",      // Pas de PCA
  q9: "Non"       // Pas de MFA
};

const result = calculateNIS2Score(fakeAnswers);
console.log("Résultat du test :", result);