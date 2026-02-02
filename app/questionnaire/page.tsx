export default function QuestionnairePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Audit de Conformité NIS2</h1>
      <p className="text-slate-600 mb-8 max-w-xl text-center">
        Répondez à ces questions pour obtenir votre score de conformité immédiatement.
      </p>

      {/* 
         TODO : Remplace ce div par l'iframe de ton formulaire Tally 
         que tu as créé sur tally.so
      */}
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg overflow-hidden flex items-center justify-center border-2 border-dashed border-slate-300" style={{ height: '800px' }}>
        <p className="text-slate-400">Le formulaire sera intégré ici (Via Tally)</p>
      </div>
    </div>
  );
}