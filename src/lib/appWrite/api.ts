import { INewUser } from "@/types";
import { ID, account, appwriteConfig, avatars, databases } from "./config";

export const createNewUser = async (user: INewUser) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw new Error("Account Not created");

    const avatarURL = avatars.getInitials(user.name);

    const newUser = await saveUserToDB({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      imageUrl: avatarURL,
    });

    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const saveUserToDB = (user: {
  accountId: string;
  name: string;
  email: string;
  username?: string;
  imageUrl: URL;
}) => {
  try {
    const newUser = databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.error(error);
  }
};

export const signInAccount = (user: { email: string; password: string }) => {
  try {
    const session = account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.error(error);
  }
};
