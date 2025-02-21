import { z } from 'zod';

export const sendDiscordMessageRequestSchema = z.object({
    discordChannelName: z.string(),
    username: z.string(),
    message: z.string(),
});
export type SendDiscordMessageRequest = z.infer<typeof sendDiscordMessageRequestSchema>;
