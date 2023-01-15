<script>
	import { push } from "svelte-spa-router";
</script>

<div class="login-prompt">
	<p class="login-prompt__msg">User needs to be logged in to avail the services</p>

	<button class="primary-button primary-solid-button" on:click={() => push("/")}>Login</button>
</div>

<style>
	.login-prompt {
		margin: 1rem;
		width: 600px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
		border-radius: 0.5rem;
		background-color: #363636;
	}

	.login-prompt__msg {
		font-size: 1.5rem;
		font-weight: 400;
	}

	.primary-button {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1rem;
		border-radius: 0.25rem;
	}

	.primary-solid-button {
		border: 1px solid #9575cd;
		background-color: #512da8;
	}

	.primary-button:hover {
		transform: scale(1.05);
		transition: all 0.15s ease-in-out;
	}
</style>
