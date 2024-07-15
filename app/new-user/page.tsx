import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()

  if (!user) {
    throw new Error('No current user found')
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [
        { clerkId: user.id as string },
        { email: user.emailAddresses[0].emailAddress as string },
      ],
    },
  })

  if (!existingUser) {
    await prisma.user.create({
      data: {
        clerkId: user.id as string,
        email: user.emailAddresses[0].emailAddress as string,
      },
    })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return <div>New User</div>
}

export default NewUser
