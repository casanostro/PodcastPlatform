import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API route to get all projects
  app.get("/api/projects", async (req: Request, res: Response) => {
    try {
      const projects = await storage.getAllProjects();
      res.json(projects);
    } catch (error) {
      res.status(500).json({ message: "Error fetching projects" });
    }
  });

  // API route to get a specific project by ID
  app.get("/api/projects/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid project ID" });
      }
      
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  });

  // API route to get a specific project by slug
  app.get("/api/projects/slug/:slug", async (req: Request, res: Response) => {
    try {
      const { slug } = req.params;
      const project = await storage.getProjectBySlug(slug);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      res.json(project);
    } catch (error) {
      res.status(500).json({ message: "Error fetching project" });
    }
  });

  // API route to get all podcast items
  app.get("/api/podcasts", async (req: Request, res: Response) => {
    try {
      const podcasts = await storage.getAllPodcastItems();
      res.json(podcasts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching podcast items" });
    }
  });

  // API route to get featured podcast items
  app.get("/api/podcasts/featured", async (req: Request, res: Response) => {
    try {
      const featuredPodcasts = await storage.getFeaturedPodcastItems();
      res.json(featuredPodcasts);
    } catch (error) {
      res.status(500).json({ message: "Error fetching featured podcast items" });
    }
  });

  // API route to get a specific podcast item by ID
  app.get("/api/podcasts/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid podcast item ID" });
      }
      
      const podcastItem = await storage.getPodcastItemById(id);
      if (!podcastItem) {
        return res.status(404).json({ message: "Podcast item not found" });
      }
      
      res.json(podcastItem);
    } catch (error) {
      res.status(500).json({ message: "Error fetching podcast item" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // createdAt is set server-side below, so it must not be required from the client
      const validationResult = insertContactSchema.omit({ createdAt: true }).safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid form data",
          errors: validationResult.error.errors
        });
      }
      
      const contactData = {
        ...validationResult.data,
        createdAt: new Date().toISOString()
      };
      
      await storage.createContact(contactData);
      
      res.status(200).json({ 
        message: "Message received! Thank you for your contact request." 
      });
    } catch (error) {
      res.status(500).json({ 
        message: "Error processing contact request" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
