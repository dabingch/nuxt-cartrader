<template>
	<div
		class="font-serif md:w-[600px] w-[1000px] text-2xl rounded-full bg-white flex justify-between overflow-hidden drop-shadow-2xl mx-auto"
	>
		<input
			type="text"
			class="py-3 px-5 w-full md:text-xl text-2xl rounded-full focus:outline-none"
			:class="cityError ? 'border-red-500 border' : ''"
			placeholder="Search by city, e.g. Toronto"
			v-model="city"
		/>
		<button
			class="bg-sky-500 px-10 text-white md:text-xl"
			@click="onSearch"
		>
			Search
		</button>
	</div>
</template>

<script setup>
const city = ref('')
const cityError = ref(false)

const onSearch = () => {
	if (!city.value) {
		cityError.value = true
		return
	}
	navigateTo(`/city/${city.value}/car`)
}
</script>

<style lang="scss" scoped></style>
