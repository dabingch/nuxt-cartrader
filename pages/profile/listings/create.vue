<template>
	<div>
		<div class="mt-24">
			<h1 class="text-6xl mt-24">Create a new Listing</h1>
		</div>
		<div class="shadow rounded p-3 mt-5 flex flex-wrap justify-between">
			<CarAdSelect
				title="Make *"
				:options="makes"
				name="make"
				@change-input="onChangeInput"
			/>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: 'custom',
})

const { makes } = useCars()

const info = useState('adInfo', () => {
	return {
		make: '',
		model: '',
		year: '',
		price: '',
		mileage: '',
		city: '',
		seats: '',
		description: '',
		images: null,
	}
})

const onChangeInput = (data, name) => {
	info.value[name] = data
}
</script>
