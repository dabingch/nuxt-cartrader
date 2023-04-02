<template>
	<div class="spinner">
		<div class="spinner-inner"></div>
	</div>
</template>

<script>
export default {
	name: 'Spinner',
}
</script>

<style scoped>
.spinner {
	position: relative;
	width: 40px;
	height: 40px;
}

.spinner-inner {
	position: absolute;
	top: 50%;
	left: 50%;
	width: 25px;
	height: 25px;
	margin-top: -12.5px;
	margin-left: -12.5px;
	border-radius: 50%;
	border: 3px solid #0074d9;
	border-top-color: transparent;
	animation: spinner 1s linear infinite;
}

@keyframes spinner {
	to {
		transform: rotate(360deg);
	}
}
</style>
