import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { memeValidationSchema } from 'validationSchema/memes';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getMemes();
    case 'POST':
      return createMeme();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getMemes() {
    const data = await prisma.meme
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'meme'));
    return res.status(200).json(data);
  }

  async function createMeme() {
    await memeValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.meme.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
