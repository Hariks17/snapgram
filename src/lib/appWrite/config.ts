import { Client, Account, Databases, Storage, Avatars } from "appwrite";
import { url } from "inspector";
export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_URL,
  userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTIONID,
  savesCollectionId: import.meta.env.VITE_APPWRITE_SAVES_COLLECTIONID,
  postsCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTIONID,
};

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);
export { ID } from "appwrite";
