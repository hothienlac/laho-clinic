import { z } from 'zod';

export const registerUserRequestSchema = z.object({
    email: z.string().email(),
    fullname: z.string().min(5).max(256),
    nickname: z.string().min(5).max(256),
    password: z.string().min(8).max(256),
    phoneNumber: z.string().min(8).max(15).optional(),
});
export type RegisterUserRequest = z.infer<typeof registerUserRequestSchema>;
