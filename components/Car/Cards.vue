<template>
	<div class="w-full md:w-[600px]">
		<ClientOnly>
			<template #fallback>
				<!-- this will be rendered on server side -->
				<p class="md:text-2xl text-4xl text-cyan-400">
					Loading cars...
				</p>
			</template>
			<CarCard
				v-for="car in cars"
				:key="car.id"
				:car="car"
				@favor="handleFavorite"
				:favored="car.id in favorite"
			/>
		</ClientOnly>
	</div>
</template>

<script setup>
const props = defineProps({
	cars: Array,
})

const favorite = useLocalStorage('favorite', {})

const handleFavorite = (id) => {
	if (id in favorite.value) {
		delete favorite.value[id]
	} else {
		favorite.value = {
			...favorite.value,
			[id]: true,
		}
	}
}
</script>
