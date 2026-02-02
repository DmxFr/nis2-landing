export default function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Audit de Conformité NIS2</h1>
      <p className="text-slate-600 mb-8 max-w-xl text-center">
        Répondez à ces questions pour obtenir votre score de conformité immédiatement.
      </p>

      {/* Intégration du formulaire Tally */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '800px' }}>
        <iframe 
          src="https://tally.so/r/KY1BvM?transparentBackground=1" 
          width="100%" 
          height="100%" 
          title="Audit NIS2"
        ></iframe>
      </div>
    </div>
  );
}