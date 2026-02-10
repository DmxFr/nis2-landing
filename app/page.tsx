"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navigation simple */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="font-bold text-xl text-blue-600">NIS2Check</div>
            <div className="hidden md:flex space-x-8 text-sm font-medium">
              <a href="#pourquoi" className="hover:text-blue-600">Pourquoi la NIS2 ?</a>
              <a href="#comment" className="hover:text-blue-600">Comment ça marche</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Section Hero (Le Pitch) */}
      <main>
        <section className="pt-20 pb-16 sm:pt-32 sm:pb-24 text-center px-4">
        <h1 className="text-4xl ...">
         La conformité <span className="text-blue-600">NIS2 V3 - TEST</span>,<br />
         simple et accessible.
        </h1>
          <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
            La nouvelle directive européenne de cybersécurité devient obligatoire. 
            Évaluez votre niveau de conformité en 10 minutes, sans jargon juridique.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/questionnaire" className="px-8 py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition text-lg">
              Lancer l'audit gratuit
            </Link>
            <Link href="#pourquoi" className="px-8 py-4 bg-white text-slate-700 font-semibold rounded-lg shadow hover:bg-slate-50 border border-slate-200 transition text-lg">
              En savoir plus
            </Link>
          </div>
          <p className="mt-4 text-sm text-slate-500">Pas de carte bancaire requise • Résultat immédiat</p>
        </section>

        {/* Section "Pourquoi" (La Peur et l'Espoir) */}
        <section id="pourquoi" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900">Pourquoi vous inquiéter maintenant ?</h2>
              <p className="mt-4 text-slate-600">La NIS2 ne concerne pas que les géants. Elle touche des milliers de PME françaises.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Carte 1 */}
              <div className="p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center text-red-600 mb-4 font-bold text-xl">⚠️</div>
                <h3 className="text-xl font-bold mb-2">Obligation Légale</h3>
                <p className="text-slate-600">La transposition en France est en cours. Les entreprises de secteurs critiques (santé, transport, énergie) devront se mettre en conformité sous peine de sanctions.</p>
              </div>

              {/* Carte 2 */}
              <div className="p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-4 font-bold text-xl">📜</div>
                <h3 className="text-xl font-bold mb-2">Sanctions Lourdes</h3>
                <p className="text-slate-600">Les amendes peuvent atteindre 2% du chiffre d'affaires mondial. Ne pas savoir que vous êtes concerné n'est pas une défense.</p>
              </div>

              {/* Carte 3 */}
              <div className="p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-4 font-bold text-xl">🛡️</div>
                <h3 className="text-xl font-bold mb-2">Gain de Confiance</h3>
                <p className="text-slate-600">Être conforme rassure vos clients et vos partenaires. C'est un gage de sérieux dans un marché de plus en plus exigeant.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section "Comment ça marche" */}
        <section id="comment" className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl mb-4">1️⃣</div>
                <h3 className="text-lg font-bold mb-2">Répondez au questionnaire</h3>
                <p className="text-slate-600">Environ 9 questions simples sur votre organisation et vos pratiques.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">2️⃣</div>
                <h3 className="text-lg font-bold mb-2">Obtenez votre Score</h3>
                <p className="text-slate-600">Notre algorithme calcule votre niveau de conformité selon les exigences NIS2.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">3️⃣</div>
                <h3 className="text-lg font-bold mb-2">Téléchargez votre Plan</h3>
                <p className="text-slate-600">Recevez une checklist priorisée des actions à mener pour vous mettre en conformité.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="py-16 bg-slate-900 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Prêt à évaluer votre exposition ?</h2>
          <p className="mb-8 text-slate-300">Ne laissez pas la conformité devenir une urgence.</p>
          <Link href="/questionnaire" className="inline-block px-8 py-3 bg-blue-600 font-bold rounded-lg hover:bg-blue-700 transition">
            Démarrer l'évaluation
          </Link>
        </section>
      </main>

      <footer className="bg-white py-8 border-t border-slate-200 text-center text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} NIS2Check. Tous droits réservés.</p>
        <p className="mt-2">Ce service fournit une assistance à la conformité et ne constitue pas un avis juridique.</p>
      </footer>
    </div>
  );
}