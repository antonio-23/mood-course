import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";

export const getUserByClerkID = async () => {
  const { userId } = auth();

  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        clerkId: userId as string,
      },
    });

    return user;
  } catch (error) {
    console.error("No User found with the given Clerk ID:", userId);

    return null;
  }
};
