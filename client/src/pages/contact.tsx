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
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  subject: z.string().min(3, { message: "Subject must be at least 3 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
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
        title: "Message sent successfully!",
        description: "Thank you for contacting us. We'll get back to you soon.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error sending message",
        description: "There was a problem sending your message. Please try again later.",
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
            <h1 className="text-3xl font-mono font-bold text-terminal-green mb-2">CONTACT TERMINAL</h1>
            <p className="text-terminal-text/80">Have questions or interested in our services? Reach out!</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NAME</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full p-3 bg-terminal-dark border border-terminal-green/30 rounded-md focus:border-terminal-green focus:ring focus:ring-terminal-green/20 focus:outline-none text-terminal-text"
                          placeholder="Enter your name"
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
                          placeholder="Enter your email"
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
                    <FormLabel>SUBJECT</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className="w-full p-3 bg-terminal-dark border border-terminal-green/30 rounded-md focus:border-terminal-green focus:ring focus:ring-terminal-green/20 focus:outline-none text-terminal-text"
                        placeholder="Enter subject"
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
                        placeholder="Enter your message"
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
                  {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
                </Button>
              </div>
            </form>
          </Form>
        </TerminalScreen>
      </div>
    </section>
  );
}
