<template>
	<div>
		<CarCards :cars="cars" />
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
