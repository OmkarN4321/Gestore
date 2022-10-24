<script>
	let toggle = false;
	export let title;
</script>

<div class="accordion-component">
	<button class="accordion-toggle-button" on:click={() => (toggle = !toggle)}>
		{#if toggle}
			<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
				<path
					fill="#eeeeee"
					d="M6.7 14.675q-.275-.275-.275-.7 0-.425.275-.7l4.6-4.6q.15-.15.325-.213Q11.8 8.4 12 8.4t.375.062q.175.063.325.213l4.625 4.625q.275.275.275.675t-.3.7q-.275.275-.7.275-.425 0-.7-.275l-3.9-3.9L8.075 14.7q-.275.275-.675.275t-.7-.3Z" />
			</svg>
		{:else}
			<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
				<path
					fill="#eeeeee"
					d="M12 14.95q-.2 0-.375-.063-.175-.062-.325-.212L6.675 10.05q-.275-.275-.262-.688.012-.412.287-.687.275-.275.7-.275.425 0 .7.275l3.9 3.9 3.925-3.925q.275-.275.688-.263.412.013.687.288.275.275.275.7 0 .425-.275.7l-4.6 4.6q-.15.15-.325.212-.175.063-.375.063Z" />
			</svg>
		{/if}

		{title}
	</button>

	{#if toggle}
		<slot />
	{/if}
</div>

<style>
	.accordion-component {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.accordion-toggle-button {
		padding: 16px 0;
		width: 100%;
		display: flex;
		gap: 16px;
		font-size: 20px;
		font-weight: 400;
		border: none;
		border-bottom: 1px solid #bdbdbd;
	}
</style>
