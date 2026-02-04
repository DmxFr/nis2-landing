export async function generateReportPDF(result, companyName = "Non renseignée") {
  try {
    // IMPORT DYNAMIQUE : On charge jsPDF SEULEMENT quand c'est nécessaire
    const { jsPDF } = await import('jspdf');
    
    const doc = new jsPDF();
    
    // --- EN-TÊTE ---
    doc.setFontSize(22);
    doc.setTextColor(40, 40, 40);
    doc.text("Rapport de Conformité NIS2", 105, 20, null, null, "center");
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Généré par NIS2Check le ${new Date().toLocaleDateString('fr-FR')}`, 105, 30, null, null, "center");
    
    // Ligne de séparation
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 35, 190, 35);

    // --- RÉSUMÉ GLOBAL ---
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text("1. Résumé Global", 20, 50);

    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`Entreprise : ${companyName}`, 20, 60);
    
    doc.setTextColor(0);
    doc.text(`Score de conformité : ${result.percentage}% / 100`, 20, 70);
    
    // Couleur du statut
    if (result.status.includes("NON CONFORME")) doc.setTextColor(200, 0, 0);
    else if (result.status.includes("PARTIELLEMENT")) doc.setTextColor(200, 100, 0);
    else doc.setTextColor(0, 150, 0);
    
    doc.text(`Statut : ${result.status}`, 20, 80);

    // Reset couleur
    doc.setTextColor(0, 0, 0);

    // --- DÉTAILS PAR CATÉGORIE ---
    let yPosition = 100;
    
    doc.setFontSize(16);
    doc.text("2. Détail par Catégorie", 20, yPosition);
    yPosition += 15;

    doc.setFontSize(12);
    
    Object.entries(result.details).forEach(([category, scores]) => {
      // Si on arrive en bas de page, on en crée une nouvelle
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.text(`${category} (${scores.current}/${scores.max} pts)`, 20, yPosition);
      
      // Barre de progression (en texte simple pour le PDF)
      doc.setFont("helvetica", "normal");
      yPosition += 7;
      doc.text(`Niveau : ${Math.round((scores.current / scores.max) * 100)}%`, 30, yPosition);
      
      yPosition += 10;
    });

    // --- PIED DE PAGE ---
    const pageCount = doc.internal.getNumberOfPages();
    for(let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page ${i} / ${pageCount} - Document confidentiel - Conseil : Ce rapport est une assistance à la conformité et ne remplace pas un avis juridique.`,
        105, 
        290, 
        null, 
        null, 
        "center"
      );
    }

    // Sauvegarde
    doc.save(`rapport-nis2-${new Date().getTime()}.pdf`);
    
    console.log("PDF généré !"); // Vérification
    
  } catch (error) {
    console.error("Erreur PDF:", error);
    alert("Erreur lors de la génération : " + error.message);
  }
}