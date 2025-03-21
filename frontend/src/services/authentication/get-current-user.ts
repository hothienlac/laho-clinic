import { UnauthorizedException } from '@/exceptions';
import { currentUser, User } from '@clerk/nextjs/server';

export async function getCurrentUser(): Promise<User> {
  const user = await currentUser();
  if (!user) {
    throw new UnauthorizedException(
      'You must be logged in to access this resource',
    );
  }
  return user;
}
