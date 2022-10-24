<script>
	import { push } from "svelte-spa-router";
</script>

<div class="login-prompt">
	<p class="login-prompt-msg">User needs to be logged in to avail the services</p>

	<button class="primary-button primary-solid-button" on:click={() => push("/")}>Login</button>
</div>

<style>
	.primary-button {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 16px;
		border-radius: 4px;
	}

	.primary-solid-button {
		border: 1px solid #9575cd;
		background-color: #512da8;
	}

	.primary-button:hover {
		transform: scale(1.05);
		transition: all 0.15s ease-in-out;
	}

	.login-prompt {
		margin: 16px;
		width: 600px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 48px;
		border-radius: 8px;
		background-color: #363636;
	}

	.login-prompt-msg {
		font-size: 24px;
		font-weight: 400;
	}
</style>
