import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
	let { id } = event.context.params
	if (id.includes('-')) {
		id = id.split('-')[1]
	}

	const car = await prisma.car.findUnique({
		where: { id: parseInt(id) },
	})

	if (!car) {
		throw createError({
			status: 404,
			statusMessage: `Car with ID of ${id} does not exist`,
		})
	}

	return car
})
