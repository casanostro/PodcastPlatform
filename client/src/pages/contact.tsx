import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { TerminalScreen } from "@/components/terminal-screen";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit comporter au moins 2 caractères." }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide." }),
  subject: z.string().min(3, { message: "Le sujet doit comporter au moins 3 caractères." }),
  message: z.string().min(10, { message: "Le message doit comporter au moins 10 caractères." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message envoyé avec succès !",
        description: "Merci de m'avoir contacté. Je vous répondrai dans les plus brefs délais.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi du message",
        description: "Un problème est survenu lors de l'envoi de votre message. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="py-16 bg-terminal-dark">
      <div className="container mx-auto px-4">
        <TerminalScreen className="max-w-3xl mx-auto p-6">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-mono font-bold text-terminal-green mb-2">TERMINAL DE CONTACT</h1>
            <p className="text-terminal-text/80">Des questions ou intéressé(e) par mes services ? Contactez-moi !</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NOM</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full p-3 bg-terminal-dark border border-terminal-green/30 rounded-md focus:border-terminal-green focus:ring focus:ring-terminal-green/20 focus:outline-none text-terminal-text"
                          placeholder="Entrez votre nom"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>EMAIL</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full p-3 bg-terminal-dark border border-terminal-green/30 rounded-md focus:border-terminal-green focus:ring focus:ring-terminal-green/20 focus:outline-none text-terminal-text"
                          placeholder="Entrez votre email"
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SUJET</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full p-3 bg-terminal-dark border border-terminal-green/30 rounded-md focus:border-terminal-green focus:ring focus:ring-terminal-green/20 focus:outline-none text-terminal-text"
                        placeholder="Entrez le sujet"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MESSAGE</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        rows={5}
                        className="w-full p-3 bg-terminal-dark border border-terminal-green/30 rounded-md focus:border-terminal-green focus:ring focus:ring-terminal-green/20 focus:outline-none text-terminal-text resize-none"
                        placeholder="Entrez votre message"
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-center">
                <Button
                  type="submit"
                  className="px-6 py-3 bg-terminal-green text-terminal-dark font-medium rounded-md hover:bg-terminal-green/90 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "ENVOI EN COURS..." : "ENVOYER MESSAGE"}
                </Button>
              </div>
            </form>
          </Form>
        </TerminalScreen>
      </div>
    </section>
  );
}
