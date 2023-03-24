import cars from '@/data/cars.json'

export default defineEventHandler((event) => {
	const { id } = event.context.params

	const car = cars.find((c) => c.id === parseInt(id))

	if (!car) {
		throw createError({
			status: 404,
			message: `Car with ID of ${id} does not exist`,
		})
	}

	return car
})
