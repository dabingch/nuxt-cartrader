<template>
	<div>
		<div class="flex justify-between mt-24 items-center">
			<h1 class="text-6xl">My Listings</h1>
			<nuxt-link
				to="/profile/listings/create"
				class="w-9 h-9 bg-blue-400 flex justify-center items-center rounded-full text-white font-bold cursor-pointer"
				>+</nuxt-link
			>
		</div>
		<div v-if="!isLoading" class="shadow rounded p-3 mt-5">
			<CarListingCard
				v-for="listing in listings"
				:key="listing.id"
				:listing="listing"
				@deleteClick="handleDelete"
			/>
		</div>
		<div class="spinner" v-else>
			<Spinner />
		</div>
	</div>
</template>

<script setup>
const user = useSupabaseUser()
// Use useAsyncData instead if you want to do some logic with the response
// useAsyncData("<name>", async () => {}, { watch: [<watch data to refresh>]})
const { data: listings } = await useFetch(
	`/api/car/listings/user/${user.value.id}`
)

const isLoading = ref(false)

useHead({
	title: 'My Listings',
})

const handleDelete = async (id) => {
	isLoading.value = true
	try {
		await $fetch(`/api/car/listings/${id}`, {
			method: 'DELETE',
		})
		listings.value = listings.value.filter((listing) => listing.id !== id)
	} catch (err) {
		console.error(err)
	} finally {
		isLoading.value = false
	}
}

definePageMeta({
	layout: 'custom',
	middleware: ['auth'],
})
</script>

<style scoped>
.spinner {
	position: absolute;
	left: 50%;
	top: 50%;
}
</style>
