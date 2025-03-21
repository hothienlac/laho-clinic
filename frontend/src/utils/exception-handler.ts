import { HttpException } from '@/exceptions';
import { NextApiRequest } from 'next';

export const exceptionHandler =
  (handler: (request: NextApiRequest) => Promise<Response>) =>
  async (request: NextApiRequest): Promise<Response> => {
    try {
      const response = await handler(request);
      return response;
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        return new Response(JSON.stringify(error), {
          status: error.statusCode,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (error instanceof Error) {
        return new Response(JSON.stringify({ message: error.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      return new Response(
        JSON.stringify({ message: 'An unknown error occurred' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  };
