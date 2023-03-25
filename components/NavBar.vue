<template>
	<div>
		<!-- Navbar -->
		<header
			class="sticky top-0 z-50 flex justify-between items-center space-x-1 border-b bg-white p-4 shadow-md"
		>
			<nuxt-link class="text-3xl font-mono" to="/">CarTrader</nuxt-link>
			<div class="flex" v-if="user">
				<nuxt-link class="mr-5" to="/profile/listings"
					>Profile</nuxt-link
				>
				<p @click="handleLogout" class="cursor-pointer">Logout</p>
			</div>
			<nuxt-link v-else to="/auth/login">Login</nuxt-link>
		</header>
	</div>
</template>

<script setup>
const user = useSupabaseUser()
const supabase = useSupabaseClient()

const handleLogout = async () => {
	const { error } = await supabase.auth.signOut()

	if (error) {
		console.log('Error logging out', error)
		return
	}

	navigateTo('/')
}
</script>

<style lang="scss" scoped></style>
