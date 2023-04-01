<template>
	<div
		class="shadow relative border w-full overflow-hidden mb-5 cursor-pointer h-[200px]"
	>
		<img
			class="absolute w-7 md:w-5 right-5 md:right-3 top-2 md:top-5 z-20"
			:src="favored ? heartFilled : heartOutline"
			alt="heart"
			@click="emit('favor', car.id)"
		/>
		<div
			class="flex h-full"
			@click="navigateTo(`/car/${car.name}-${car.id}`)"
		>
			<nuxt-img
				:src="`${config.public.supabase.url}/storage/v1/object/public/images/${car.image}`"
				alt="Car image"
				class="w-[300px] h-full"
			/>
			<div class="p-4 flex flex-col">
				<div>
					<h1 class="text-2xl md:text-xl text-blue-700">
						{{ car.name }}
					</h1>
					<p class="text-gray-700">
						{{ car.description }}
					</p>
				</div>
				<h1 class="mt-auto text-xl">${{ car.price }}</h1>
			</div>
		</div>
	</div>
</template>

<script setup>
import heartFilled from '@/assets/heartFilled.png'
import heartOutline from '@/assets/heartOutline.png'

const props = defineProps({
	car: Object,
	favored: Boolean,
})

const emit = defineEmits(['favor'])
const config = useRuntimeConfig()
</script>
