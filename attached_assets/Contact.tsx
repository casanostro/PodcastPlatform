import { useState, useEffect } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { ContactFormData } from '@/lib/types';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: ''
  });
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [terminalReady, setTerminalReady] = useState(false);

  useEffect(() => {
    // Simulation de démarrage d'un terminal pour la page de contact
    const startupLines = [
      "ROBCO INDUSTRIES (TM) TERMINAL",
      "INITIALISATION DU MODULE DE COMMUNICATION...",
      "FRÉQUENCES RADIO OUVERTES",
      "CRYPTAGE ACTIVÉ",
      "SYSTÈME DE MESSAGERIE PRÊT",
      "EN ATTENTE DE TRANSMISSION..."
    ];

    let lineIndex = 0;
    const terminalBootInterval = setInterval(() => {
      if (lineIndex < startupLines.length) {
        setTerminalLines(prev => [...prev, startupLines[lineIndex]]);
        lineIndex++;

        if (lineIndex === startupLines.length) {
          clearInterval(terminalBootInterval);
          setTimeout(() => {
            setTerminalReady(true);
          }, 800);
        }
      }
    }, 400);

    return () => clearInterval(terminalBootInterval);
  }, []);

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      // Simulation de transmission
      await new Promise(resolve => setTimeout(resolve, 1500));
      const response = await apiRequest('POST', '/api/contact', data);
      const result = await response.json();
      return result;
    },
    onSuccess: (data) => {
      toast({
        title: "TRANSMISSION RÉUSSIE",
        description: "Message envoyé avec succès. Nous vous répondrons dans les plus brefs délais.",
        variant: "default",
      });
      setFormData({ name: '', email: '', message: '' });
      setTerminalLines(prev => [...prev, "TRANSMISSION TERMINÉE", "CONNEXION FERMÉE"]);
      setTimeout(() => {
        setTerminalLines([]);
        setTerminalReady(false);
        setTimeout(() => {
          setTerminalLines(["ROBCO INDUSTRIES (TM) TERMINAL", "SYSTÈME DE MESSAGERIE PRÊT", "EN ATTENTE DE NOUVELLE TRANSMISSION..."]);
          setTerminalReady(true);
        }, 1000);
      }, 3000);
    },
    onError: (error) => {
      toast({
        title: "ERREUR DE TRANSMISSION",
        description: error instanceof Error ? error.message : "Échec de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
      setTerminalLines(prev => [...prev, "ERREUR: TRANSMISSION ÉCHOUÉE", "VÉRIFIEZ LA CONNEXION ET RÉESSAYEZ"]);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTerminalLines(prev => [...prev, "INITIALISATION DE LA TRANSMISSION...", "ENVOI EN COURS..."]);
    contactMutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <section id="contact" className="py-10 px-4 relative overflow-hidden bg-terminal-bg min-h-screen scanlines">
      <div className="container mx-auto max-w-4xl">
        <div className="robco-header mb-8">
          <h2 className="font-robco text-3xl md:text-4xl text-terminal-header pb-2 uppercase">
            ÉTABLIR UNE CONNEXION
          </h2>
          <div className="w-full border-b border-terminal-green mt-2"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Section Informations de contact */}
          <div className="bg-terminal-dark p-5 border border-terminal-green terminal-border">
            <h3 className="font-robco text-xl text-pip-green mb-4 uppercase">Informations de contact</h3>
            
            {!terminalReady ? (
              <div className="bg-terminal-bg border border-terminal-green p-4 h-80 overflow-y-auto font-terminal text-terminal-green">
                {terminalLines.map((line, index) => (
                  <div key={index} className="mb-1">
                    {index > 0 && <span className="text-pip-amber">{'>'}</span>} {line}
                  </div>
                ))}
                <span className="animate-cursor-blink">▓</span>
              </div>
            ) : (
              <>
                <ul className="space-y-4 font-terminal text-terminal-green">
                  <li className="flex items-center terminal-list-item">
                    <div className="inline-block bg-terminal-green w-6 h-6 flex items-center justify-center mr-3 text-terminal-bg">
                      @
                    </div>
                    <a href="mailto:adrien.tripon@example.com" className="text-terminal-text hover:text-pip-green transition-colors">
                      adrien.tripon@example.com
                    </a>
                  </li>
                  <li className="flex items-center terminal-list-item">
                    <div className="inline-block bg-terminal-green w-6 h-6 flex items-center justify-center mr-3 text-terminal-bg">
                      #
                    </div>
                    <span className="text-terminal-text">+33 6 XX XX XX XX</span>
                  </li>
                  <li className="flex items-center terminal-list-item">
                    <div className="inline-block bg-terminal-green w-6 h-6 flex items-center justify-center mr-3 text-terminal-bg">
                      !
                    </div>
                    <span className="text-terminal-text">Paris, France</span>
                  </li>
                </ul>
                
                <div className="mt-8 pt-4 border-t border-terminal-green/30">
                  <h3 className="font-robco text-lg text-pip-green mb-4 uppercase">Réseaux Professionnels</h3>
                  <div className="flex space-x-4">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-terminal-bg border border-terminal-green text-terminal-green hover:text-pip-green hover:border-pip-green transition-colors">
                      <span className="font-terminal">[GitHub]</span>
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-terminal-bg border border-terminal-green text-terminal-green hover:text-pip-green hover:border-pip-green transition-colors">
                      <span className="font-terminal">[LinkedIn]</span>
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
          
          {/* Section Formulaire de contact */}
          <div className="bg-terminal-dark p-5 border border-terminal-green">
            <h3 className="font-robco text-xl text-terminal-header mb-4 uppercase">Transmettre un message</h3>
            
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block font-terminal text-xs text-terminal-green mb-1">[NOM]</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-terminal-bg border border-terminal-green px-4 py-2 font-terminal text-terminal-text focus:border-pip-green focus:outline-none"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block font-terminal text-xs text-terminal-green mb-1">[EMAIL]</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-terminal-bg border border-terminal-green px-4 py-2 font-terminal text-terminal-text focus:border-pip-green focus:outline-none"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block font-terminal text-xs text-terminal-green mb-1">[MESSAGE]</label>
                <textarea 
                  id="message" 
                  rows={6}
                  className="w-full bg-terminal-bg border border-terminal-green px-4 py-2 font-terminal text-terminal-text focus:border-pip-green focus:outline-none resize-none"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="font-terminal text-sm bg-terminal-bg border border-terminal-green text-terminal-green px-6 py-3 hover:text-pip-green hover:border-pip-green transition-colors duration-300 w-full"
                disabled={contactMutation.isPending}
              >
                {contactMutation.isPending ? 'TRANSMISSION EN COURS...' : 'ENVOYER LE MESSAGE'}
                {!contactMutation.isPending && <span className="ml-2 animate-cursor-blink">▓</span>}
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-terminal-green/30">
              <div className="font-terminal text-xs text-terminal-green opacity-70 flex justify-between">
                <div>
                  ÉTAT DU SYSTÈME: <span className="text-pip-green">OPÉRATIONNEL</span>
                </div>
                <div>
                  <span className="text-terminal-header">ROBCO COMM V2.5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
