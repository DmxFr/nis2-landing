// lib/scoring.js

// Définition des règles de scoring pour chaque question
// On attribue des points et on catégorise chaque question
const SCORING_RULES = {
  q1: { category: "Gouvernance", points: { "Oui": 10, "En partie": 5, "Non": 0 } },     // RSSI
  q2: { category: "Gouvernance", points: { "Oui": 10, "En partie": 5, "Non": 0 } },     // PSSI
  q3: { category: "Gouvernance", points: { "Oui": 10, "En partie": 5, "Non": 0 } },     // Direction
  q4: { category: "Formation", points: { "Oui": 10, "En partie": 5, "Non": 0 } },        // Employés
  q5: { category: "Risques", points: { "Oui": 10, "En partie": 5, "Non": 0 } },         // Analyse Risques
  q6: { category: "Sécurité Technique", points: { "Oui": 10, "En partie": 5, "Non": 0 } }, // Patchs
  q7: { category: "Incidents & Continuité", points: { "Oui": 10, "En partie": 5, "Non": 0 } }, // Incident
  q8: { category: "Incidents & Continuité", points: { "Oui": 10, "En partie": 5, "Non": 0 } }, // PCA
  q9: { category: "Sécurité Technique", points: { "Oui": 10, "En partie": 5, "Non": 0 } }, // MFA
};

// Fonction principale qui calcule le score
export function calculateNIS2Score(answers) {
  let totalScore = 0;
  let maxPossibleScore = 0;
  
  // Objet pour stocker les scores par catégorie
  const scoresByCategory = {
    "Gouvernance": { current: 0, max: 0 },
    "Formation": { current: 0, max: 0 },
    "Risques": { current: 0, max: 0 },
    "Sécurité Technique": { current: 0, max: 0 },
    "Incidents & Continuité": { current: 0, max: 0 },
  };

  // On boucle sur chaque réponse reçue
  for (const [key, answer] of Object.entries(answers)) {
    // On vérifie si la question existe dans nos règles
    if (SCORING_RULES[key]) {
      const rule = SCORING_RULES[key];
      const points = rule.points[answer] || 0; // Si réponse bizarre, 0 points
      const maxPoints = 10; // Score max par question

      // Ajout au total
      totalScore += points;
      maxPossibleScore += maxPoints;

      // Ajout à la catégorie
      scoresByCategory[rule.category].current += points;
      scoresByCategory[rule.category].max += maxPoints;
    }
  }

  // Calcul du pourcentage
  const percentage = Math.round((totalScore / maxPossibleScore) * 100);

  // Détermination du statut global
  let status = "";
  if (percentage < 40) status = "NON CONFORME (Critique)";
  else if (percentage < 70) status = "PARTIELLEMENT CONFORME (Action Requise)";
  else status = "CONFORME (Niveau Acceptable)";

  return {
    totalScore,
    maxPossibleScore,
    percentage,
    status,
    details: scoresByCategory
  };
}

