import { User } from '../models/User';
import { IUser } from '../models/User';

export const getTypedUserByEmail = async (
  email: string,
  selectFields?: string
): Promise<IUser> => {
  const query = selectFields
    ? User.findOne<IUser>({ email }).select(selectFields)
    : User.findOne<IUser>({ email });

  const user = await query;

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};
