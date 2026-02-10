"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QUESTIONS } from '../../lib/questions';

export default function QuestionnairePage() {
  const router = useRouter();
  
  // État typé correctement
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleSubmit = () => {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < QUESTIONS.length) {
      alert(`Vous avez répondu à ${answeredCount} questions sur ${QUESTIONS.length}. Merci de tout remplir.`);
      return;
    }

    sessionStorage.setItem('nis2_answers', JSON.stringify(answers));
    router.push('/results');
  };

  const progress = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        {/* Titre et Barre de Progression */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Audit de Conformité NIS2</h1>
          <p className="text-slate-600 mb-4">Étape {Object.keys(answers).length} / {QUESTIONS.length}</p>
          
          <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Liste des Questions */}
        <div className="space-y-8 mb-12">
          {QUESTIONS.map((question) => (
            <div key={question.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
              <h2 className="text-lg font-semibold text-slate-800 mb-4">{question.text}</h2>
              
              <div className="grid grid-cols-3 gap-4">
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option;
                  
                  return (
                    <button
                      key={option}
                      onClick={() => handleAnswer(question.id, option)}
                      className={`
                        py-3 px-4 rounded-lg border text-sm font-medium transition-colors
                        ${isSelected 
                          ? 'bg-blue-50 border-blue-600 text-blue-700 ring-2 ring-blue-100' 
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}
                      `}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bouton de Validation */}
        <div className="text-center sticky bottom-8">
          <button 
            onClick={handleSubmit}
            className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
          >
            Obtenir mon score gratuitement
          </button>
        </div>

      </div>
    </div>
  );
}