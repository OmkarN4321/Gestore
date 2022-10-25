<script>
	import { push } from "svelte-spa-router";

	let error = "";
	let email = "";
	let password = "";
	export let setState;

	const login = async () => {
		if (email && password) {
			let res = await fetch(`https://gestore-production.up.railway.app//staffLogin?email=${email}&password=${password}`);
			res = await res.json();

			if (res.user) {
				sessionStorage.setItem("user", JSON.stringify(res.user));
				push("/staff");
			} else {
				error = "Incorrect credentials";
			}
		} else {
			error = "All fields are required";
		}
	};
</script>

<div class="auth">
	<div class="login">
		<h1 class="app-title">Gestore</h1>

		<div class="login-inputs">
			<input type="text" placeholder="STAFF EMAIL" class="login-input" bind:value={email} />
			<input type="password" placeholder="STAFF PASSWORD" class="login-input" bind:value={password} />
		</div>

		<div class="login-errors-and-buttons">
			{#if error}
				<div class="login-errors">
					<p class="error">{error}</p>
				</div>
			{/if}

			<button class="primary-button primary-solid-button" on:click={login}>Login</button>
		</div>
	</div>

	<div class="auth-alternate-buttons">
		<button class="primary-button primary-outline-button" on:click={() => setState("user")}> User Login </button>
		<button class="primary-button primary-outline-button" on:click={() => setState("admin")}> Admin Login </button>
	</div>
</div>

<style>
	.auth {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.login {
		width: 300px;
		padding: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 48px;
		border-radius: 8px;
		background-color: #363636;
	}

	.app-title {
		font-size: 44px;
		font-weight: 600;
		color: #673ab7;
	}

	.login-inputs {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.login-input {
		width: 100%;
		height: 40px;
		padding: 4px 8px;
		border-radius: 4px;
		border: 1px solid #9575cd;
		font-size: 16px;
		color: #eeeeee;
		background-color: inherit;
	}

	.login-errors-and-buttons {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.login-errors {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		border: 1px solid #e57373;
		background-color: #d32f2f;
		font-size: 16px;
		font-weight: 400;
	}

	.auth-alternate-buttons {
		width: 300px;
		display: flex;
		gap: 16px;
	}

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

	.primary-outline-button {
		border: 1px solid #9575cd;
	}

	.primary-button:hover {
		transform: scale(1.05);
		transition: all 0.15s ease-in-out;
	}
</style>
