<script>
	import { onMount } from "svelte";
	import Accordion from "../../Accordion.svelte";

	let items;
	let error;
	let newItem = { name: "", price: 0 };

	const addItem = async () => {
		let res = await fetch("https://gestore-production.up.railway.app//items", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newItem)
		});

		if (res.status === 500) {
			error = await res.json();
		} else if (res.status === 200) {
			error = "";
			newItem = { name: "", price: 0 };
		}
	};

	const updateItem = async (item) => {
		await fetch(`https://gestore-production.up.railway.app//items/${item._id}`, {
			method: "PUT",
			body: JSON.stringify(item),
			headers: { "Content-Type": "application/json" }
		});
	};

	const deleteItem = async (item) => {
		await fetch(`https://gestore-production.up.railway.app//items/${item._id}`, { method: "DELETE" });
	};

	onMount(async () => {
		let res = await fetch("https://gestore-production.up.railway.app//items");
		res = await res.json();

		items = res.items;
	});
</script>

<div class="items-tab-panel">
	<Accordion title="Add a new item">
		<div class="add-item">
			<div class="add-item-inputs">
				<input class="input" type="text" placeholder="ITEM'S NAME" bind:value={newItem.name} />
				<input class="input" type="number" placeholder="ITEM'S PRICE" bind:value={newItem.price} />
			</div>

			<div class="add-item-error-and-submit">
				{#if error}
					<div class="add-item-errors">
						<p class="error">{error.message}</p>
					</div>
				{/if}

				<button class="primary-button primary-solid-button" on:click={addItem}> Add item </button>
			</div>
		</div>
	</Accordion>

	<Accordion title="Modify an existing item">
		<div class="modify-item">
			{#if items}
				{#each items as item (item._id)}
					<div class="item">
						<div class="item-data-display">
							<div class="item-data-field">
								<p class="item-data-field-name">Name:</p>
								<input class="item-data-field-input" type="text" name="userName" bind:value={item.name} />
							</div>
							<div class="item-data-field">
								<p class="item-data-field-name">Price:</p>
								<input class="item-data-field-input" type="text" name="userEmail" placeholder="USER'S EMAIL" bind:value={item.price} />
							</div>
						</div>

						<div class="item-data-options">
							<button class="update-btn primary-button primary-outline-button" on:click={() => updateItem(item)}> Update </button>
							<button class="delete-btn primary-button primary-outline-button" on:click={() => deleteItem(item)}> Delete </button>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</Accordion>
</div>

<style>
	.items-tab-panel {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.add-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 48px;
	}

	.add-item-inputs {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.input {
		width: 100%;
		height: 40px;
		padding: 4px 8px;
		border-radius: 4px;
		border: 1px solid #9575cd;
		font-size: 16px;
		color: #eeeeee;
		background-color: inherit;
	}

	.add-item-error-and-submit {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.add-item-errors {
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

	.modify-item {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.item {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.item-data-display {
		width: 100%;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		border-radius: 8px;
		background-color: #363636;
	}

	.item-data-field {
		width: 100%;
		display: flex;
		gap: 8px;
	}

	.item-data-field-name {
		font-size: 20px;
		font-weight: 400;
		color: #eeeeee;
	}

	.item-data-field-input {
		width: 100%;
		border: none;
		background-color: #363636;
		font-size: 20px;
		padding: 0;
		color: white;
	}

	.item-data-options {
		display: flex;
		gap: 16px;
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
