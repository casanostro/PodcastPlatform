import { 
  projects, Project, InsertProject, 
  podcastItems, PodcastItem, InsertPodcastItem,
  users, User, InsertUser, 
  contacts, Contact, InsertContact
} from "@shared/schema";
import projectsData from "../shared/data/projects.json";
import podcastsData from "../shared/data/podcasts.json";

export interface IStorage {
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  getProjectBySlug(slug: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Podcast items methods
  getAllPodcastItems(): Promise<PodcastItem[]>;
  getFeaturedPodcastItems(): Promise<PodcastItem[]>;
  getPodcastItemById(id: number): Promise<PodcastItem | undefined>;
  createPodcastItem(item: InsertPodcastItem): Promise<PodcastItem>;
  
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Contact methods
  getContact(id: number): Promise<Contact | undefined>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private podcastItems: Map<number, PodcastItem>;
  private contacts: Map<number, Contact>;
  private userCurrentId: number;
  private projectCurrentId: number;
  private podcastItemCurrentId: number;
  private contactCurrentId: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.podcastItems = new Map();
    this.contacts = new Map();
    this.userCurrentId = 1;
    this.projectCurrentId = 1;
    this.podcastItemCurrentId = 1;
    this.contactCurrentId = 1;
    
    // Initialize with sample data
    this.initializeProjects();
    this.initializePodcastItems();
  }

  private initializeProjects() {
    projectsData.forEach(project => {
      this.projects.set(project.id, project as Project);
      if (project.id >= this.projectCurrentId) {
        this.projectCurrentId = project.id + 1;
      }
    });
  }

  private initializePodcastItems() {
    podcastsData.forEach(item => {
      this.podcastItems.set(item.id, item as PodcastItem);
      if (item.id >= this.podcastItemCurrentId) {
        this.podcastItemCurrentId = item.id + 1;
      }
    });
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getProjectBySlug(slug: string): Promise<Project | undefined> {
    return Array.from(this.projects.values()).find(
      (project) => project.slug === slug,
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  // PodcastItem methods
  async getAllPodcastItems(): Promise<PodcastItem[]> {
    return Array.from(this.podcastItems.values());
  }

  async getFeaturedPodcastItems(): Promise<PodcastItem[]> {
    return Array.from(this.podcastItems.values()).filter(
      (item) => item.featured,
    );
  }

  async getPodcastItemById(id: number): Promise<PodcastItem | undefined> {
    return this.podcastItems.get(id);
  }

  async createPodcastItem(insertPodcastItem: InsertPodcastItem): Promise<PodcastItem> {
    const id = this.podcastItemCurrentId++;
    const podcastItem: PodcastItem = {
      ...insertPodcastItem,
      id,
      badge: insertPodcastItem.badge ?? null,
      badgeColor: insertPodcastItem.badgeColor ?? null,
      featured: insertPodcastItem.featured ?? null,
    };
    this.podcastItems.set(id, podcastItem);
    return podcastItem;
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contact methods
  async getContact(id: number): Promise<Contact | undefined> {
    return this.contacts.get(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.contactCurrentId++;
    const contact: Contact = { ...insertContact, id };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
