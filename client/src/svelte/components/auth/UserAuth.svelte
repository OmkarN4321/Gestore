<script>
	import { push } from "svelte-spa-router";

	let error = "";
	let email = "";
	let password = "";
	export let setState;

	const login = async () => {
		if (email && password) {
			let res = await fetch(`https://gestore.up.railway.app/userLogin?email=${email}&password=${password}`);
			res = await res.json();

			if (res.user) {
				sessionStorage.setItem("user", JSON.stringify(res.user));
				push("/user");
			} else {
				error = "Incorrect credentials";
			}
		} else {
			error = "All fields are required";
		}
	};
</script>

<div class="auth">
	<div class="auth-login">
		<h1 class="auth-login__title">Gestore</h1>

		<div class="auth-login__inputs">
			<input type="text" placeholder="EMAIL" class="auth-login__input" bind:value={email} />
			<input type="password" placeholder="PASSWORD" class="auth-login__input" bind:value={password} />
		</div>

		<div class="auth-login__errors-and-buttons">
			{#if error}
				<div class="auth-login__errors">
					<p class="error">{error}</p>
				</div>
			{/if}

			<button class="primary-button primary-solid-button" on:click={login}>Login</button>
		</div>
	</div>

	<div class="auth-alt-buttons">
		<button class="primary-button primary-outline-button" on:click={() => setState("admin")}> Admin Login </button>
		<button class="primary-button primary-outline-button" on:click={() => setState("staff")}> Staff Login </button>
	</div>
</div>

<style>
	.auth {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.auth-login {
		width: 300px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 3rem;
		border-radius: 0.5rem;
		background-color: #363636;
	}

	.auth-login__title {
		font-size: 2.75rem;
		font-weight: 600;
		color: #673ab7;
	}

	.auth-login__inputs {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.auth-login__input {
		width: 100%;
		height: 40px;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid #9575cd;
		font-size: 1rem;
		color: #eeeeee;
		background-color: inherit;
	}

	.auth-login__errors-and-buttons {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.auth-login__errors {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 0.25rem;
		border: 1px solid #e57373;
		background-color: #d32f2f;
		font-size: 1rem;
		font-weight: 400;
	}

	.auth-alt-buttons {
		width: 300px;
		display: flex;
		gap: 1rem;
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

	.primary-outline-button {
		border: 1px solid #9575cd;
	}

	.primary-button:hover {
		transform: scale(1.05);
		transition: all 0.15s ease-in-out;
	}
</style>
