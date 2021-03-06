import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { z } from 'zod';

import { prisma } from '../../../db/client';

export const appRouter = trpc
    .router()
    .query('slugCheck', {
        input: z.object({
            slug: z.string(),
        }),
        async resolve({ input }) {
            const count = await prisma.link.count({
                where: {
                    slug: input.slug,
                },
            });

            return { used: count > 0 };
        },
    })
    .mutation('createSlug', {
        input: z.object({
            slug: z.string(),
            protocol: z.string(),
            url: z.string(),
        }),
        async resolve({ input }) {
            try {
                await prisma.link.create({
                    data: {
                        slug: input.slug.trim(),
                        url: `
                            ${input.protocol}${input.url.trim().toLowerCase()}
                        `,
                    },
                });
            } catch (error) {
                console.error(`ERROR CREATING SLUG: ${error}`);
            }
        },
    });

export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
    router: appRouter,
    createContext: () => null,
});
