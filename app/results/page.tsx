"use client";
import { useEffect, useState } from 'react';
import { calculateNIS2Score } from '../../lib/scoring';

// Type pour le résultat
type ScoreResult = {
  totalScore: number;
  maxPossibleScore: number;
  percentage: number;
  status: string;
  details: Record<string, { current: number; max: number }>;
};

export default function ResultsPage() {
  // États typés correctement
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // On emballe la logique dans une fonction interne pour satisfaire React
    const processResults = () => {
      const storedData = sessionStorage.getItem('nis2_answers');

      if (storedData) {
        try {
          const decodedAnswers = JSON.parse(storedData);
          setResult(calculateNIS2Score(decodedAnswers));
        } catch {
          // On retire le 'e' inutilisé
          setError("Erreur de lecture des données.");
        }
      } else {
        setError("Aucune réponse trouvée. Veuillez passer par le questionnaire.");
      }
    };

    processResults();
  }, []);
  
  if (!result && !error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-600">
        <p>Calcul en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="bg-white p-8 rounded-xl shadow-lg border border-red-200">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oups...</h1>
          <p className="text-slate-700">{error}</p>
          <p className="mt-4 text-sm text-slate-500">
            <a href="/questionnaire" className="underline text-blue-600">Retourner au questionnaire</a>
          </p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    if (status.includes("NON CONFORME")) return "text-red-600 bg-red-100";
    if (status.includes("PARTIELLEMENT")) return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Score Principal */}
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Résultat de votre Audit NIS2</h1>
          
          <div className={`inline-block px-6 py-2 rounded-full font-bold text-lg mb-6 ${getStatusColor(result!.status)}`}>
            {result!.status}
          </div>

          <div className="relative w-48 h-48 mx-auto mb-6">
            <div className="w-full h-full rounded-full flex items-center justify-center border-8 border-slate-100">
              <span className="text-5xl font-extrabold text-slate-900">{result!.percentage}%</span>
            </div>
          </div>

          <p className="text-slate-600">
            Score : <strong>{result!.totalScore}</strong> / {result!.maxPossibleScore}.
          </p>
        </div>

        {/* Détails par catégorie */}
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(result!.details).map(([category, scores]) => (
            <div key={category} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h3 className="font-bold text-lg text-slate-800 mb-2">{category}</h3>
              
              <div className="w-full bg-slate-100 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(scores.current / scores.max) * 100}%` }}
                ></div>
              </div>
              
              <div className="flex justify-between text-sm text-slate-500">
                <span>{scores.current} / {scores.max} pts</span>
                <span>{Math.round((scores.current / scores.max) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bouton PDF */}
        <div className="mt-8 text-center">
          <button 
            onClick={() => window.print()}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition"
          >
            🖨️ Télécharger le rapport PDF (Impression)
          </button>
          <p className="mt-2 text-xs text-slate-400">Astuce : Dans la fenêtre qui s'ouvre, choisis "Enregistrer au format PDF".</p>
        </div>

      </div>
    </div>
  );
}