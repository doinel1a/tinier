import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../../db/client';

export default async function (
    request: NextApiRequest,
    response: NextApiResponse
) {
    const slug = request.query['slug'];

    if (!slug || typeof slug !== 'string') {
        response.statusCode = 404;
        response.send(
            JSON.stringify({
                message: 'Please provide a slug!',
            })
        );

        return;
    }

    const data = await prisma.link.findFirst({
        where: {
            slug: {
                equals: slug,
            },
        },
    });

    if (!data) {
        response.statusCode = 404;
        response.send(
            JSON.stringify({
                message: 'Slug not found!',
            })
        );

        return;
    }

    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader(
        'Cache-Control',
        's-maxage=2592000, stale-while-revalidate'
    );

    return response.json(data);
}
