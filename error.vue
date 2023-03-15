<template>
	<div class="flex flex-col justify-center h-screen items-center">
		<h1 class="text-9xl">{{ error.statusCode }}</h1>
		<p class="mt-7 text-4xl">{{ error.message }}</p>
		<button
			@click="onClick"
			class="rounded mt-7 text-2xl bg-blue-400 px-7 py-4 text-white"
		>
			Go Back
		</button>
	</div>
</template>

<script setup>
const error = useError()

const onClick = () => {
	navigateTo('/')
}
</script>
