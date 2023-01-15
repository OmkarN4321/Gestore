<script>
	import Accordion from "../../Accordion.svelte";

	let user;
	let email = "";
	let error = "";
	let newUser = { name: "", email: "", RFID: null };

	const addUser = async () => {
		let res = await fetch("https://gestore.up.railway.app/user", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...newUser, userType: { role: "User" } })
		});

		if (res.status === 500) {
			error = await res.json();
		} else if (res.status === 200) {
			error = "";
			newUser = { name: "", email: "", RFID: null };
		}
	};

	const findUser = async () => {
		let res = await fetch(`https://gestore.up.railway.app/user?email=${email}`);
		res = await res.json();

		if (res.user) {
			user = res.user;
		} else {
			user = null;
		}
	};

	const updateUser = async (id) => {
		await fetch(`https://gestore.up.railway.app/user/${id}`, {
			method: "PUT",
			body: JSON.stringify(user),
			headers: { "Content-Type": "application/json" }
		});

		user = null;
	};

	const deleteUser = async (id) => {
		await fetch(`https://gestore.up.railway.app/user/${id}`, { method: "DELETE" });

		user = null;
	};
</script>

<div class="admin-portal__users-tab-panel">
	<Accordion title="Add a new user">
		<div class="add-user">
			<div class="add-user__inputs">
				<input class="input" type="text" placeholder="NEW USER'S NAME" bind:value={newUser.name} />
				<input class="input" type="text" placeholder="NEW USER'S EMAIL" bind:value={newUser.email} />
				<input class="input" type="number" placeholder="NEW USER'S RFID" bind:value={newUser.RFID} />
			</div>

			<div class="add-user__error-and-submit">
				{#if error}
					<div class="add-user__errors">
						<p class="error">{error.message}</p>
					</div>
				{/if}

				<button class="primary-button primary-solid-button" on:click={addUser}> Add user </button>
			</div>
		</div>
	</Accordion>

	<Accordion title="Modify an existing user">
		<div class="modify-user">
			<div class="find-user">
				<input class="input find-user-input" type="text" placeholder="USER'S EMAIL" bind:value={email} />

				<button class="find-user-btn primary-button primary-solid-button" on:click={findUser}>Find</button>
			</div>

			{#if user}
				<div class="user">
					<div class="user-data-display">
						<div class="user-data-field">
							<p class="user-data-field-name">Name:</p>
							<input class="user-data-field-input" type="text" name="userName" bind:value={user.name} />
						</div>
						<div class="user-data-field">
							<p class="user-data-field-name">Email:</p>
							<input class="user-data-field-input" type="text" name="userEmail" placeholder="USER'S EMAIL" bind:value={user.email} />
						</div>
						<div class="user-data-field">
							<p class="user-data-field-name">RFID:</p>
							<input class="user-data-field-input" type="text" name="userRFID" placeholder="USER'S EMAIL" bind:value={user.RFID} />
						</div>
					</div>

					<div class="user-data-options">
						<button class="update-btn primary-button primary-outline-button" on:click={() => updateUser(user._id)}> Update </button>
						<button class="delete-btn primary-button primary-outline-button" on:click={() => deleteUser(user._id)}> Delete </button>
					</div>
				</div>
			{/if}
		</div>
	</Accordion>
</div>

<style>
	.admin-portal__users-tab-panel {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.add-user {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.add-user-inputs {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.input {
		width: 100%;
		height: 40px;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		border: 1px solid #9575cd;
		font-size: 1rem;
		color: #eeeeee;
		background-color: inherit;
	}

	.add-user-error-and-submit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.add-user-errors {
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

	.modify-user {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 3rem;
	}

	.find-user {
		display: flex;
		gap: 1rem;
	}

	.find-user-input {
		flex: 3;
	}

	.find-user-btn {
		flex: 1;
	}

	.user {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.user-data-display {
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border-radius: 0.25rem;
		background-color: #363636;
	}

	.user-data-field {
		width: 100%;
		display: flex;
		gap: 0.5rem;
	}

	.user-data-field-name {
		font-size: 1rem;
		font-weight: 400;
		color: #eeeeee;
	}

	.user-data-field-input {
		padding: 0;
		width: 100%;
		border: none;
		font-size: 1rem;
		color: white;
		background-color: #363636;
	}

	.user-data-options {
		display: flex;
		gap: 1rem;
	}

	.update-btn {
		border: 1px solid #ffd54f !important;
	}

	.delete-btn {
		border: 1px solid #e57373 !important;
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
