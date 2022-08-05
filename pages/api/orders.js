import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()
    if (req.method === 'POST') {
        const {name, items, total, date} = req.body
        const order = await prisma.order.create({
            data: {
                name,
                items,
                total,
                date
            }
        })
        res.json(order)
    }
}
