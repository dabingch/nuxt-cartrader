// * Or you can create a auth.global.js file to
// * apply this middleware globally
// * to.path.includes('profile)

export default defineNuxtRouteMiddleware((to, from) => {
	const user = useSupabaseUser()
	if (user.value) return

	return navigateTo('/auth/login')
})
