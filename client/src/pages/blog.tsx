import { useState, useEffect } from "react";
import { Link } from "wouter";

// Types pour les entrées de journal
interface JournalEntry {
  id: number;
  date: string;
  title: string;
  content: string[];
  location: string;
  imageUrl?: string;
  status: "normal" | "urgent" | "classified";
}

export default function Blog() {
  const [selectedEntry, setSelectedEntry] = useState<number | null>(null);
  const [typingIndex, setTypingIndex] = useState(0);
  const [introText, setIntroText] = useState("");
  const [showEntries, setShowEntries] = useState(false);

  // Séquence d'introduction
  const introSequence = 
`RIT-V300 ACCESSING PERSONAL LOGS
LOADING JOURNAL ENTRIES...
DECRYPTING DATA...

SUPPLY CHAIN FIELD NOTES - ADRIEN TRIPON
================================

SÉLECTIONNEZ UNE ENTRÉE POUR CONSULTER:`;

  // Effet de frappe pour le texte d'intro
  useEffect(() => {
    if (typingIndex < introSequence.length) {
      const timer = setTimeout(() => {
        setIntroText(prev => prev + introSequence[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, Math.random() * 30 + 10);
      
      return () => clearTimeout(timer);
    } else {
      // Afficher les entrées une fois l'intro terminée
      const timer = setTimeout(() => {
        setShowEntries(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [typingIndex, introSequence]);

  // Entrées de journal statiques (à remplacer par des données dynamiques)
  const journalEntries: JournalEntry[] = [
    {
      id: 1,
      date: "17 OCT 2025",
      title: "Optimisation de la chaîne d'approvisionnement",
      content: [
        "J'ai finalisé l'audit de la chaîne d'approvisionnement aujourd'hui. Les résultats sont troublants. Nous perdons 23% d'efficacité dans le système de distribution Est. Les causes racines:",
        "",
        "- Obsolescence des systèmes de tracking (tech de 2019)",
        "- Absence d'intégration avec les fournisseurs de niveau 2",
        "- Routines de vérification qualité redondantes",
        "",
        "Solution proposée: Implémentation d'un système unifié avec traçabilité complète. Estimation des coûts à environ 450K EUR, mais ROI prévu en 8 mois. Le directeur financier est hésitant.",
        "",
        "Note personnelle: La résistance au changement est forte ici. Besoin de construire plus d'alliances au niveau opérationnel avant de présenter au comité."
      ],
      location: "Bureau central, Paris",
      status: "normal"
    },
    {
      id: 2,
      date: "28 SEP 2025",
      title: "Incident - Rupture de stock critique",
      content: [
        "URGENT: Rupture de stock massive sur composants XJ-42 détectée ce matin. Ligne de production arrêtée pendant 4h12min. Impact financier estimé: 230K EUR.",
        "",
        "Cause identifiée: Défaillance du système d'alerte préventive. Le fournisseur affirme avoir envoyé une notification il y a trois semaines, jamais reçue par notre système.",
        "",
        "Mesures immédiates:",
        "1. Approvisionnement d'urgence activé via fournisseur alternatif à +15% du tarif standard",
        "2. Réagencement du planning de production pour minimiser l'impact",
        "3. Audit complet du système de communication fournisseur lancé",
        "",
        "Cette défaillance confirme mes recommandations du mois dernier sur la nécessité d'un système intégré de bout en bout. Utiliserai cet incident comme cas d'étude pour le comité exécutif."
      ],
      location: "Site de production Nord",
      status: "urgent"
    },
    {
      id: 3,
      date: "05 AOÛ 2025",
      title: "Analyse prédictive - Projet pilote",
      content: [
        "Le déploiement du modèle prédictif sur l'entrepôt B3 montre des résultats prometteurs après 30 jours:",
        "",
        "- Réduction des stocks dormants: -18%",
        "- Amélioration de la précision des prévisions: +12pts (62% → 74%)",
        "- Temps de réapprovisionnement réduit de 2,3 jours en moyenne",
        "",
        "Les algorithmes s'affinent avec les données entrantes. L'équipe IT a intégré les flux ERP et CRM sans heurts majeurs. Quelques ajustements nécessaires sur la sensibilité aux événements saisonniers.",
        "",
        "Prochaine étape: Présentation des résultats au comité d'innovation le 15/08. Préparer démonstration live avec tableau de bord temps réel.",
        "",
        "Note: Envisager extension à l'entrepôt A1 si validation obtenue."
      ],
      location: "Centre d'innovation, Lyon",
      status: "classified"
    },
    {
      id: 4,
      date: "23 JUI 2025",
      title: "Fournisseurs - Réunion stratégique",
      content: [
        "Réunion avec top 5 fournisseurs stratégiques aujourd'hui. Point principal: transition vers modèle collaboratif et partage de données prévisionnelles.",
        "",
        "Réactions mitigées:",
        "• SupTech et MicroLogic: très favorables, déjà équipés",
        "• ElectroParts: favorable mais préoccupé par l'investissement IT nécessaire",
        "• GlobalComp et RapidParts: réticents, inquiets concernant confidentialité",
        "",
        "Propositions d'accompagnement:",
        "- Partage des coûts d'implémentation technique (60/40)",
        "- Garanties contractuelles sur utilisation des données",
        "- Programme pilote limité de 3 mois avant déploiement complet",
        "",
        "Objectif consensus d'ici fin août pour démarrage en octobre. Phase critique pour la transformation digitale de notre supply chain."
      ],
      location: "Siège social, Paris",
      status: "normal"
    },
    {
      id: 5,
      date: "11 JUI 2025",
      title: "CONFIDENTIEL - Projet Fusion",
      content: [
        "CONFIDENTIEL - ACCÈS RESTREINT",
        "",
        "Première réunion préparatoire fusion/acquisition LogisTech. Implications majeures pour notre chaîne d'approvisionnement:",
        "",
        "• Complémentarité géographique excellente (renforcement axe Est)",
        "• Doublon identifié sur 3 entrepôts régionaux (optimisation potentielle)",
        "• Systèmes IT incompatibles - migration nécessaire",
        "• Opportunité d'économies d'échelle estimée à 3.2M EUR annuels",
        "",
        "Équipe d'intégration à former semaine prochaine. Je dirigerai l'audit complet de leur infrastructure supply chain.",
        "",
        "Points d'attention: culture d'entreprise très différente, synergies surestimées dans rapport initial, résistance probable des équipes terrain.",
        "",
        "Calendrier serré: conclusion prévue T4 2025. Communication interne à préparer avec RH."
      ],
      location: "Salle de conférence sécurisée",
      status: "classified"
    },
  ];

  // Sélectionner une entrée
  const handleSelectEntry = (entryId: number) => {
    setSelectedEntry(entryId === selectedEntry ? null : entryId);
  };

  // Entrée de journal sélectionnée
  const selectedEntryData = journalEntries.find(entry => entry.id === selectedEntry);

  return (
    <div className="terminal-lines p-4">
      <div className="terminal-screen p-6 mb-8 relative overflow-hidden">
        {/* ASCII Art de convoyeur en haut */}
        <div className="terminal-ascii-banner mb-6 overflow-hidden">
          <pre className="text-terminal-green/75 animate-slide-left whitespace-pre overflow-hidden">
{`                    _______            _______            _______
  []___[]___[]___[]|___|__\\__[]___[]__|___|__\\__[]___[]__|___|__\\__[]___[]___[]___[]
   |_|   |_|   |_|   SUPPLY CHAIN LOG   |_|   SYSTEM ACCESS    |_|   |_|   |_|   |_|
 __|_|___|_|___|_|___|___|__|/___|_|___|___|__|/___|_|___|___|__|/___|_|___|_|___|_|__
`}
          </pre>
        </div>

        {/* Texte d'introduction */}
        <pre className="font-terminal whitespace-pre-wrap mb-6 text-terminal-green">
          {introText}
          {typingIndex < introSequence.length && <span className="cursor">&#9608;</span>}
        </pre>
        
        {/* Liste des entrées de journal */}
        {showEntries && (
          <div className="journal-entries mb-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b border-terminal-green/30">
                  <th className="py-2 pr-2 w-10">#</th>
                  <th className="py-2 pr-4">DATE</th>
                  <th className="py-2">TITRE</th>
                  <th className="py-2 w-24 hidden md:table-cell">STATUT</th>
                  <th className="py-2 w-20 text-right">ACCÈS</th>
                </tr>
              </thead>
              <tbody>
                {journalEntries.map((entry, index) => (
                  <tr 
                    key={entry.id}
                    className={`border-b border-terminal-green/10 hover:bg-terminal-green/5 ${selectedEntry === entry.id ? 'bg-terminal-green/10' : ''}`}
                    onClick={() => handleSelectEntry(entry.id)}
                  >
                    <td className="py-3 pr-2 text-terminal-accent">[{index + 1}]</td>
                    <td className="py-3 pr-4 font-mono text-terminal-text/90">{entry.date}</td>
                    <td className="py-3 font-bold truncate max-w-[200px]">{entry.title}</td>
                    <td className="py-3 hidden md:table-cell">
                      <span className={`px-2 py-1 text-xs ${
                        entry.status === 'urgent' 
                          ? 'text-pip-amber border border-pip-amber' 
                          : entry.status === 'classified' 
                            ? 'text-pip-red border border-pip-red' 
                            : 'text-terminal-text/50'
                      }`}>
                        {entry.status === 'urgent' 
                          ? 'URGENT' 
                          : entry.status === 'classified' 
                            ? 'CONFIDENTIEL' 
                            : 'STANDARD'}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <span className={`text-xs ${selectedEntry === entry.id ? 'text-pip-green' : 'text-terminal-text/50'}`}>
                        {selectedEntry === entry.id ? '[ OUVERT ]' : '[ LIRE ]'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Prompt de commande */}
        {showEntries && !selectedEntry && (
          <div className="cli-prompt">
            COMMANDE:
            <span className="cursor ml-2">&#9608;</span>
          </div>
        )}
      </div>
      
      {/* Affichage d'une entrée de journal sélectionnée */}
      {selectedEntryData && (
        <div className="terminal-screen p-6 mb-8">
          <div className="terminal-pip-header flex justify-between items-start mb-6">
            <div>
              <div className="text-xs text-terminal-text/70 mb-1">ENTRÉE JOURNAL #{selectedEntryData.id} | {selectedEntryData.date}</div>
              <h2 className="text-2xl font-terminal text-terminal-green mb-2">{selectedEntryData.title}</h2>
              <div className="text-sm text-terminal-accent">LOC: {selectedEntryData.location}</div>
            </div>
            <div className={`px-3 py-1 border ${
              selectedEntryData.status === 'urgent' 
                ? 'border-pip-amber text-pip-amber' 
                : selectedEntryData.status === 'classified' 
                  ? 'border-pip-red text-pip-red' 
                  : 'border-terminal-green/40 text-terminal-green/80'
            }`}>
              {selectedEntryData.status === 'urgent' 
                ? 'URGENT' 
                : selectedEntryData.status === 'classified' 
                  ? 'CONFIDENTIEL' 
                  : 'STANDARD'}
            </div>
          </div>
          
          {/* Contenu de l'entrée */}
          <div className="journal-content px-4 py-5 border-t border-b border-terminal-green/30 mb-6">
            <div className="pip-journal-entry font-terminal whitespace-pre-line text-terminal-text/90">
              {selectedEntryData.content.map((paragraph, index) => (
                <p key={index} className={`mb-2 ${paragraph === "" ? "mb-4" : ""}`}>{paragraph}</p>
              ))}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              onClick={() => setSelectedEntry(null)}
              className="cli-prompt text-terminal-green hover:text-terminal-accent"
            >
              &lt; RETOUR AUX ENTRÉES
            </button>
            
            <div className="text-xs text-terminal-text/50">
              ENTRÉE RÉF: {selectedEntryData.date.replace(/\s/g, '')}-SCM-{selectedEntryData.id}
            </div>
          </div>
        </div>
      )}
      
      {/* Footer d'information */}
      <div className="terminal-screen p-4 mt-4">
        <div className="text-sm">
          <div className="cli-prompt mb-1">AIDE: UTILISEZ LES NUMÉROS POUR SÉLECTIONNER UNE ENTRÉE</div>
          <div className="cli-prompt mb-1">RETOUR: <Link href="/" className="text-terminal-accent hover:underline">[MAIN]</Link> | CONTACT: <Link href="/contact" className="text-terminal-accent hover:underline">[COM]</Link></div>
        </div>
      </div>
    </div>
  );
}