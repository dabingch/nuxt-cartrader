<template>
	<div>
		<CarCards v-if="cars.length" :cars="cars" />
		<div v-else>
			<h1 class="text-red-600">No cars found in this location</h1>
		</div>
	</div>
</template>

<script setup>
const route = useRoute()
const { data: cars, refresh } = await useFetchCars(route.params.city, {
	minPrice: route.query.minPrice,
	maxPrice: route.query.maxPrice,
	make: route.params.make,
})

watch(
	() => route.query,
	// () => refresh // not work
	() => window.location.reload(true)
)
</script>
