<template>
	<div v-if="car">
		<CarDetailHero :car="car" />
		<CarDetailAttributes :features="car.features" />
		<CarDetailDescription :description="car.description" />
		<CarDetailContact />
	</div>
</template>

<script setup>
const route = useRoute()
const { toTitleCase } = useUtilities()
const car = await useFetchCar(route.params.id)

useHead({
	title: toTitleCase(route.params.name),
})

if (!car.value) {
	throw createError({
		statusCode: 404,
		message: `Car with ID ${route.params.id} not found.`,
	})
}

definePageMeta({
	layout: 'custom',
})
</script>
