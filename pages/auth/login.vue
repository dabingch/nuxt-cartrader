<template>
	<div class="mt-10">
		<h1 class="text-5xl font-bold mb-7">Log in</h1>
		<button
			@click="handleLogin"
			class="bg-red-400 p-3 rounded text-white font-bold"
		>
			Login with Google
		</button>
	</div>
</template>

<script setup>
definePageMeta({
	layout: 'custom',
	middleware: [
		function (to, from) {
			const user = useSupabaseUser()
			if (user.value) return navigateTo('/')

			return
		},
	],
})

const supabase = useSupabaseClient()

const handleLogin = async () => {
	const { error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
	})

	if (error) {
		console.log('Error logging in', error)
		return
	}
}
</script>
