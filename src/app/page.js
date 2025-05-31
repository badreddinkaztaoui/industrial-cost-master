"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, TrendingUp, Users, Shield, Zap, Database, Brain, Globe } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDashboardClick = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  const handleLoginClick = () => {
    setLoading(true);
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                IndustrialCostMaster
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLoginClick}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                disabled={loading}
              >
                Se connecter
              </button>
              <button
                onClick={handleDashboardClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
                disabled={loading}
              >
                {loading ? "..." : "Démo"}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Zap className="w-4 h-4 mr-2" />
              Propulsé par l'Intelligence Artificielle
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Maîtrisez vos <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">coûts industriels</span> avec précision
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Plateforme intelligente de contrôle de gestion avec analyses prédictives,
              alertes automatisées et reporting temps réel pour l'industrie automobile.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleDashboardClick}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold text-lg"
                disabled={loading}
              >
                {loading ? "Chargement..." : "Découvrir la plateforme"}
              </button>
              <button
                onClick={handleLoginClick}
                className="bg-white text-gray-700 px-8 py-4 rounded-full border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 font-semibold text-lg"
                disabled={loading}
              >
                Demander une démo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">25%</div>
              <div className="text-gray-600 font-medium">Réduction des dépassements</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-2">70%</div>
              <div className="text-gray-600 font-medium">Temps de reporting économisé</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">40%</div>
              <div className="text-gray-600 font-medium">Amélioration précision</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-indigo-600 mb-2">50%</div>
              <div className="text-gray-600 font-medium">Collaboration renforcée</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Une solution complète et innovante
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez les fonctionnalités qui transforment votre gestion des coûts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Analytics Prédictifs</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Intelligence artificielle pour anticiper les dépassements budgétaires et identifier automatiquement les facteurs de risque.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Machine Learning avancé</li>
                <li>• Alertes précoces automatisées</li>
                <li>• Détection d'anomalies en temps réel</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Dashboard Temps Réel</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Visualisations interactives avec drill-down détaillé et comparaisons budgétaires en temps réel.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• KPIs personnalisables</li>
                <li>• Graphiques dynamiques</li>
                <li>• Prédictions avec intervalles de confiance</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Collaboration Avancée</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Workspaces partagés avec workflow d'approbation automatisé et historique complet des décisions.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Gestion multi-projets</li>
                <li>• Notifications intelligentes</li>
                <li>• Audit trail complet</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Database className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Intégrations ERP</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Connecteurs natifs pour SAP, Oracle, Sage avec synchronisation bidirectionnelle temps réel.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• API ouvertes</li>
                <li>• Import/Export massif Excel</li>
                <li>• Architecture microservices</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Application Mobile</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Approbations en déplacement, scan de factures OCR et notifications push pour alertes critiques.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Mode offline disponible</li>
                <li>• Géolocalisation des dépenses</li>
                <li>• Signature électronique</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Sécurité & Traçabilité</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Blockchain pour la transparence des coûts et smart contracts pour l'automatisation des approbations.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li>• Traçabilité immuable</li>
                <li>• Réduction des fraudes</li>
                <li>• Conformité réglementaire</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Prêt à transformer votre gestion des coûts ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez les entreprises qui ont déjà révolutionné leur contrôle de gestion avec IndustrialCostMaster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDashboardClick}
              className="bg-white text-blue-600 px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-semibold text-lg"
              disabled={loading}
            >
              Essayer gratuitement
            </button>
            <button
              onClick={handleLoginClick}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-200 font-semibold text-lg"
              disabled={loading}
            >
              Planifier une démo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">IndustrialCostMaster</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                Solution innovante de contrôle de gestion pour l'industrie automobile marocaine, développée pour SEWS Maroc.
              </p>
              <div className="text-sm text-gray-500">
                Développé par El Bahi Soukaina - Projet de Fin d'Études 2024
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Fonctionnalités</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Analytics Prédictifs</li>
                <li>Dashboard Temps Réel</li>
                <li>Reporting Automatisé</li>
                <li>Application Mobile</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Technologies</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>React.js & Node.js</li>
                <li>Intelligence Artificielle</li>
                <li>Blockchain</li>
                <li>Architecture Cloud</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2025 IndustrialCostMaster. Tous droits réservés. Projet académique ENCG.
          </div>
        </div>
      </footer>
    </div>
  );
}