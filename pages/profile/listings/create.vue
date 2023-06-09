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
			<CarAdInput
				v-for="input in inputs"
				:key="input.id"
				:title="input.title"
				:name="input.name"
				:placeholder="input.placeholder"
				@change-input="onChangeInput"
			/>
			<CarAdTextarea
				title="Description"
				name="description"
				placeholder=""
				@change-input="onChangeInput"
			/>
			<CarAdImage @change-input="onChangeInput" />
			<div>
				<button
					:disabled="isButtonDisabled || isLoading"
					class="bg-blue-400 text-white rounded py-2 px-7 mt-3"
					:class="
						isButtonDisabled || isLoading
							? 'cursor-not-allowed'
							: 'cursor-pointer'
					"
					@click.prevent="handleSubmit"
				>
					{{ isLoading ? 'Processing...' : 'Submit' }}
				</button>
				<p v-if="errorMessage" class="mt-3 text-red-600">
					{{ errorMessage }}
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: 'custom',
	middleware: ['auth'],
})

useHead({
	title: 'Create a new Listing',
})

const { makes } = useCars()
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const info = useState('adInfo', () => {
	return {
		make: '',
		model: '',
		year: '',
		price: '',
		miles: '',
		city: '',
		seats: '',
		features: '',
		description: '',
		image: null,
	}
})

const errorMessage = ref('')
const isLoading = ref(false)

const onChangeInput = (data, name) => {
	info.value[name] = data
}

const inputs = [
	{
		id: 1,
		title: 'Model *',
		name: 'model',
		placeholder: 'Civic',
	},
	{
		id: 2,
		title: 'Year *',
		name: 'year',
		placeholder: '2019',
	},
	{
		id: 3,
		title: 'Price *',
		name: 'price',
		placeholder: '100000',
	},
	{
		id: 4,
		title: 'Miles *',
		name: 'miles',
		placeholder: '10000',
	},
	{
		id: 5,
		title: 'City *',
		name: 'city',
		placeholder: 'Austin',
	},
	{
		id: 6,
		title: 'Number of seats',
		name: 'seats',
		placeholder: '5',
	},
	{
		id: 7,
		title: 'Features *',
		name: 'features',
		placeholder: 'Bluetooth, Sunroof, etc.',
	},
]

const isButtonDisabled = computed(() => {
	for (let key in info.value) {
		if (!info.value[key]) return true
	}

	return false
})

const handleSubmit = async () => {
	isLoading.value = true
	errorMessage.value = ''
	const fileName = Math.floor(Math.random() * 100000)
	const { data, error } = await supabase.storage
		.from('images')
		.upload('public/' + fileName, info.value.image)

	if (error) {
		errorMessage.value = "Couldn't upload image"
		isLoading = false
		return
	}

	const body = {
		...info.value,
		city: info.value.city.toLowerCase(),
		features: info.value.features.split(', '),
		numberOfSeats: parseInt(info.value.seats),
		miles: parseInt(info.value.miles),
		price: parseInt(info.value.price),
		year: parseInt(info.value.year),
		name: `${info.value.make} ${info.value.model}`,
		listerId: user.value.id,
		image: data.path,
	}

	delete body.seats

	try {
		const res = await $fetch('/api/car/listings', {
			method: 'POST',
			body,
		})
		navigateTo('/profile/listings')
	} catch (error) {
		errorMessage.value = error.statusMessage
		await supabase.storage.from('images').remove(data.path)
	} finally {
		isLoading.value = false
	}
}
</script>
