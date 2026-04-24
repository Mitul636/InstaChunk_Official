import type { VercelRequest, VercelResponse } from '@vercel/node';
import prisma from './_lib/prisma';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method === 'GET') {
    try {
      const services = await prisma.serviceCategory.findMany({
        orderBy: { name: 'asc' },
      });
      const plans = await prisma.plan.findMany();
      let settings = await prisma.globalSettings.findUnique({
        where: { id: 'default' },
      });

      if (!settings) {
        // Initialize if not exists
        settings = await prisma.globalSettings.create({
          data: { id: 'default', data: {} },
        });
      }

      return response.status(200).json({ services, plans, settings: settings.data });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  if (request.method === 'POST') {
    // Basic authentication would go here for admin actions
    const { type, action, payload } = request.body;

    try {
      if (type === 'service') {
        if (action === 'add') {
          const res = await prisma.serviceCategory.create({ data: payload });
          return response.status(200).json(res);
        }
        if (action === 'update') {
          const res = await prisma.serviceCategory.update({
            where: { id: payload.id },
            data: payload,
          });
          return response.status(200).json(res);
        }
        if (action === 'delete') {
          await prisma.serviceCategory.delete({ where: { id: payload.id } });
          return response.status(200).json({ success: true });
        }
      }

      if (type === 'plan') {
        if (action === 'add') {
          const res = await prisma.plan.create({ data: payload });
          return response.status(200).json(res);
        }
        if (action === 'update') {
          const res = await prisma.plan.update({
            where: { id: payload.id },
            data: payload,
          });
          return response.status(200).json(res);
        }
        if (action === "delete") {
            await prisma.plan.delete({ where: { id: payload.id } });
            return response.status(200).json({ success: true });
        }
      }

      if (type === 'settings') {
          const res = await prisma.globalSettings.upsert({
              where: { id: 'default' },
              update: { data: payload },
              create: { id: 'default', data: payload }
          });
          return response.status(200).json(res.data);
      }

      return response.status(400).json({ error: 'Invalid type or action' });
    } catch (error: any) {
      return response.status(500).json({ error: error.message });
    }
  }

  return response.status(405).json({ error: 'Method not allowed' });
}
