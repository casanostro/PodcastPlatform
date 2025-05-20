import { useState, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";

// Form schema with Zod validation
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  subject: z.string().min(3, { message: "Le sujet doit comporter au moins 3 caractères." }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<ContactFormValues>>({});
  const [currentInput, setCurrentInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [introText, setIntroText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Terminal intro sequence
  const introSequence = 
`RIT-V300 INITIALIZING COMMUNICATION MODULE
ESTABLISHING SECURE CONNECTION...
ENCRYPTED CHANNEL READY

TERMINAL DE COMMUNICATION - ADRIEN TRIPON
VEUILLEZ SUIVRE LE PROTOCOLE DE CONTACT CI-DESSOUS:`;

  // Form steps for terminal-style interaction
  const formSteps = [
    { field: "name", prompt: "ENTREZ VOTRE NOM:" },
    { field: "email", prompt: "ENTREZ VOTRE ADRESSE E-MAIL:" },
    { field: "subject", prompt: "ENTREZ L'OBJET DE VOTRE MESSAGE:" },
    { field: "message", prompt: "ENTREZ VOTRE MESSAGE (TERMINEZ PAR '/END'):" }
  ];

  // Typing effect for intro text
  useEffect(() => {
    if (typingIndex < introSequence.length) {
      const timer = setTimeout(() => {
        setIntroText(prev => prev + introSequence[typingIndex]);
        setTypingIndex(typingIndex + 1);
      }, Math.random() * 30 + 10);
      
      return () => clearTimeout(timer);
    } else {
      setIntroComplete(true);
    }
  }, [typingIndex, introSequence]);

  // Auto-focus input after intro completes
  useEffect(() => {
    if (introComplete && !isComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [introComplete, currentStep, isComplete]);

  // Handle form input validation and progression
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const currentField = formSteps[currentStep].field;
    let value = currentInput.trim();

    // Special handling for the message field with /END command
    if (currentField === "message" && !value.endsWith("/END")) {
      // Append to existing message
      const updatedMessage = formData.message 
        ? formData.message + "\n" + value 
        : value;
      
      setFormData(prev => ({ ...prev, message: updatedMessage }));
      setCurrentInput("");
      return; // Don't advance step yet for message
    }

    // Remove /END for the actual message content
    if (currentField === "message" && value.endsWith("/END")) {
      value = value.replace("/END", "").trim();
      const finalMessage = formData.message 
        ? formData.message + "\n" + value 
        : value;
      
      // Validate final message
      try {
        contactFormSchema.shape[currentField].parse(finalMessage);
        setFormData(prev => ({ ...prev, [currentField]: finalMessage }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrorMessage(error.errors[0].message);
        }
        setCurrentInput("");
        return;
      }
    } else if (currentField !== "message") {
      // Validate other fields
      try {
        contactFormSchema.shape[currentField].parse(value);
        setFormData(prev => ({ ...prev, [currentField]: value }));
      } catch (error) {
        if (error instanceof z.ZodError) {
          setErrorMessage(error.errors[0].message);
        }
        setCurrentInput("");
        return;
      }
    }

    setCurrentInput("");
    
    // Move to next step or submit if complete
    if (currentStep < formSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      submitForm();
    }
  };

  // Submit form to API
  const submitForm = async () => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", formData as ContactFormValues);
      toast({
        title: "TRANSMISSION RÉUSSIE",
        description: "Message reçu. Une réponse vous sera envoyée dans les plus brefs délais.",
        variant: "default",
      });
      setIsComplete(true);
    } catch (error) {
      setErrorMessage("ERREUR DE TRANSMISSION. VEUILLEZ RÉESSAYER.");
      toast({
        title: "ERREUR DE COMMUNICATION",
        description: "Un problème est survenu lors de l'envoi du message.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="terminal-lines p-4">
      <div className="terminal-screen p-6 mb-8">
        {/* Header and intro text */}
        <pre className="font-terminal whitespace-pre-wrap mb-6 text-terminal-green">
          {introText}
          {typingIndex < introSequence.length && <span className="cursor">&#9608;</span>}
        </pre>
        
        {/* Form interaction area */}
        {introComplete && !isComplete && (
          <div className="mt-6">
            {/* Show previously entered data */}
            {formSteps.map((step, index) => {
              if (index < currentStep) {
                return (
                  <div key={index} className="mb-4">
                    <div className="cli-prompt text-terminal-accent">{step.prompt}</div>
                    <div className="ml-4 mt-1 text-terminal-green">
                      {step.field === "message" 
                        ? formData[step.field]?.split("\n").map((line, i) => (
                            <div key={i}>{line}</div>
                          ))
                        : formData[step.field]}
                    </div>
                  </div>
                );
              }
              return null;
            })}
            
            {/* Current input field */}
            {!isSubmitting && (
              <form onSubmit={handleInputSubmit}>
                <div className="mb-4">
                  <div className="cli-prompt text-terminal-accent">
                    {formSteps[currentStep]?.prompt}
                  </div>
                  {currentStep === 3 && (
                    <div className="text-xs text-terminal-text/60 mt-1 mb-2">
                      (Terminez votre message en tapant /END sur une nouvelle ligne)
                    </div>
                  )}
                  <div className="flex items-center">
                    <span className="text-terminal-green mr-2">&gt;</span>
                    <input
                      ref={inputRef}
                      type={formSteps[currentStep]?.field === "email" ? "email" : "text"}
                      value={currentInput}
                      onChange={(e) => setCurrentInput(e.target.value)}
                      className="bg-transparent border-none text-terminal-green focus:outline-none flex-1"
                      autoComplete="off"
                      disabled={isSubmitting}
                    />
                    <span className="cursor">&#9608;</span>
                  </div>
                </div>
                
                {/* Error message */}
                {errorMessage && (
                  <div className="text-pip-amber mb-4">ERREUR: {errorMessage}</div>
                )}
                
                <button type="submit" className="hidden">Submit</button>
              </form>
            )}
            
            {/* Loading state */}
            {isSubmitting && (
              <div className="mb-4">
                <div className="cli-prompt text-terminal-accent">TRANSMISSION EN COURS...</div>
                <div className="flex items-center mt-2">
                  <div className="h-1 w-full bg-terminal-dark">
                    <div className="h-full bg-terminal-green animate-pulse" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* After submission complete */}
        {isComplete && (
          <div className="mt-6 border-t border-terminal-green/30 pt-4">
            <div className="text-terminal-green mb-4">TRANSMISSION COMPLÈTE</div>
            <div className="mb-6">
              <div className="text-terminal-text mb-2">Récapitulatif:</div>
              <div className="cli-prompt">NOM: {formData.name}</div>
              <div className="cli-prompt">EMAIL: {formData.email}</div>
              <div className="cli-prompt">OBJET: {formData.subject}</div>
              <div className="cli-prompt mb-1">MESSAGE:</div>
              <div className="ml-4 border-l-2 border-terminal-green/30 pl-2 text-terminal-text/80">
                {formData.message?.split("\n").map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
            </div>
            
            <div className="cli-prompt text-terminal-accent">
              Merci pour votre message. Une réponse vous sera envoyée dans les plus brefs délais.
            </div>
            
            <div className="mt-4">
              <Link href="/" className="text-terminal-green hover:text-terminal-accent">
                &gt; RETOUR À L'ÉCRAN PRINCIPAL
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Command help */}
      <div className="terminal-screen p-4 mt-4">
        <div className="text-sm">
          <div className="cli-prompt mb-1">AIDE: SUIVEZ LES INSTRUCTIONS ET APPUYEZ SUR ENTRÉE APRÈS CHAQUE SAISIE</div>
          <div className="cli-prompt mb-1">RETOUR: <Link href="/" className="text-terminal-accent hover:underline">[MAIN]</Link> | EXPÉRIENCE: <Link href="/projects" className="text-terminal-accent hover:underline">[EXP]</Link></div>
        </div>
      </div>
    </div>
  );
}
