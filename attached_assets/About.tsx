import { useEffect, useState } from 'react';

const About = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('supply-chain');
  const [animateList, setAnimateList] = useState(true);

  useEffect(() => {
    // Animation pour la liste sélectionnée
    setAnimateList(false);
    setTimeout(() => {
      setAnimateList(true);
    }, 100);
  }, [selectedCategory]);

  // Types pour les catégories de compétences
  type SkillCategory = {
    title: string;
    skills: string[];
  };

  type SkillCategories = {
    [key: string]: SkillCategory;
  };

  // Création des compétences à partir du CV
  const skillCategories: SkillCategories = {
    'supply-chain': {
      title: 'SUPPLY CHAIN',
      skills: [
        'S&OP', 'WMS', 'TMS', 'GPAO', 'MRP2', 'DDMRP', 
        'PDP', 'Gestion des stocks', 'Approvisionnements', 
        'Optimisation des flux logistiques'
      ]
    },
    'systemes': {
      title: 'SYSTÈMES INFO',
      skills: [
        'SAP', 'Oracle M3', 'Power BI', 'SQL', 
        'Python (pandas, numpy)', 'Excel VBA', 
        'Power Query', 'Office Suite', 
        'Outils de modélisation et simulation'
      ]
    },
    'methodologies': {
      title: 'MÉTHODOLOGIES',
      skills: [
        'Lean Six Sigma', 'Risk Management', 
        'Gestion des risques', 'Scrum', 'Kanban', 
        'Amélioration continue', 'Audit des processus', 
        'MS Project'
      ]
    },
    'analytiques': {
      title: 'ANALYTIQUES',
      skills: [
        'Analyse de données', 'Data mining', 
        'Statistiques appliquées', 'Modélisation des processus', 
        'Cartographie des flux', 'Optimisation des coûts'
      ]
    },
    'transverses': {
      title: 'TRANSVERSES',
      skills: [
        'Gestion du changement', 'Collaboration interservices', 
        'Prise de décision rapide', 'Adaptabilité', 
        'Communication efficace', 'Leadership', 
        'Management d\'équipe'
      ]
    },
    'langues': {
      title: 'LANGUES',
      skills: [
        'Français (Langue maternelle)', 
        'Anglais (B2+ / TOEIC 850)', 
        'Espagnol (C1 / DELE)'
      ]
    }
  };

  return (
    <section id="about" className="py-12 px-4 relative overflow-hidden bg-terminal-bg min-h-screen scanlines">
      <div className="container mx-auto">
        <div className="robco-header mb-8">
          <h2 className="font-robco text-3xl md:text-4xl text-terminal-header pb-2 uppercase">
            COMPÉTENCES TECHNIQUES
          </h2>
          <div className="w-full border-b border-terminal-green mt-2"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Section de navigation des compétences */}
          <div className="lg:col-span-1">
            <div className="bg-terminal-dark border border-terminal-green p-4 terminal-border">
              <h3 className="font-terminal text-terminal-header text-xl mb-4 uppercase">CATÉGORIES</h3>
              <ul className="space-y-2">
                {Object.entries(skillCategories).map(([key, category]) => (
                  <li 
                    key={key}
                    className={`cursor-pointer font-terminal text-sm terminal-list-item ${selectedCategory === key ? 'text-pip-green' : 'text-terminal-green'}`}
                    onClick={() => setSelectedCategory(key)}
                  >
                    {category.title}
                    {selectedCategory === key && <span className="ml-2 animate-cursor-blink">▓</span>}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 bg-terminal-dark border border-terminal-green p-4">
              <h3 className="font-terminal text-terminal-header text-xl mb-4 uppercase">FORMATION</h3>
              <div className="font-terminal text-terminal-green text-sm">
                <div className="terminal-list-item mb-4">
                  <span className="text-pip-amber">Master Supply Chain</span>
                  <div className="ml-4 mt-1 text-terminal-text opacity-90">
                    <div>PPA, Paris, France</div>
                    <div>2022 - 2024</div>
                  </div>
                </div>
                <div className="terminal-prompt text-xs mt-4 opacity-80">
                  {'> Spécialisation : Optimisation des processus logistiques & Supply Chain Management'}
                </div>
                <div className="terminal-prompt text-xs mt-2 opacity-80">
                  {'> Mémoire : Vers une renaissance industrielle - Enjeux et solutions pour l\'industrie française'}
                </div>
              </div>
            </div>
          </div>

          {/* Section d'affichage des compétences */}
          <div className="lg:col-span-2 bg-terminal-dark border border-terminal-green p-6 terminal-flicker">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="font-robco text-2xl text-pip-green uppercase">
                {skillCategories[selectedCategory].title}
              </h3>
              <div className="font-terminal text-xs text-terminal-green">
                <span className="mr-2">STATUS:</span>
                <span className="text-pip-green">ACTIF</span>
              </div>
            </div>

            <div className="border-b border-terminal-green/30 mb-4"></div>
            
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 transition-opacity duration-300 ${animateList ? 'opacity-100' : 'opacity-0'}`}>
              {skillCategories[selectedCategory].skills.map((skill: string, index: number) => (
                <div 
                  key={index} 
                  className="bg-terminal-bg px-3 py-2 border border-terminal-green/50 text-terminal-green text-sm font-terminal hover:border-pip-green hover:text-pip-green transition-colors duration-200"
                >
                  <span className="text-pip-amber mr-2">[{index + 1}]</span>
                  {skill}
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-terminal-green/30">
              <div className="font-terminal text-xs text-terminal-text opacity-80 flex justify-between">
                <div>
                  <div className="terminal-prompt mb-2">
                    Master Supply Chain & expérience opérationnelle dans les secteurs Aéronautique, Défense, Luxe et Sidérurgie
                  </div>
                  <div className="terminal-prompt">
                    Complément de formation en Data Analytics (Power BI, SQL) pour l'optimisation des processus logistiques
                  </div>
                </div>
                <div className="animate-cursor-blink">▓</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
