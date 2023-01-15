<script>
	import { onMount } from "svelte";

	let orders;
	let amount = 0;

	const getItem = async (id) => {
		let res = await fetch(`https://gestore.up.railway.app/items/${id}`);
		res = await res.json();

		amount += res.item.price;
		return res.item;
	};

	const orderDone = async (id) => {
		await fetch(`https://gestore.up.railway.app/orders/${id}`, { method: "DELETE" });
	};

	onMount(async () => {
		let res = await fetch("https://gestore.up.railway.app/orders");
		res = await res.json();

		orders = res.orders;
	});
</script>

<div class="staff-portal">
	<h1 class="staff-portal__title">Staff Portal</h1>

	<div class="staff-portal__orders">
		{#if orders}
			{#each orders as order (order._id)}
				<div class="staff-portal__orders__order">
					<div class="staff-portal__orders__order__details">
						<div class="staff-portal__orders__order__details__imp">
							<p class="staff-portal__orders__order__details__imp__ordered-by">Ordered by: {order.user.name}</p>
							<p class="staff-portal__orders__order__details__imp__price">Price: {amount} ₹</p>
						</div>

						<div class="staff-portal__orders__order__details__options">
							<button class="order-completed-btn primary-button primary-solid-button" on:click={() => orderDone(order._id)}>
								<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
									<path
										fill="#eeeeee"
										d="M15.792 29.25q-.25 0-.5-.083-.25-.084-.459-.292l-7.416-7.417q-.417-.416-.396-1.02.021-.605.396-1.021.416-.375.979-.375.562 0 .979.375l6.417 6.458 14.791-14.792q.417-.416 1-.416.584 0 1 .416.417.375.417.98 0 .604-.417.979L16.792 28.875q-.25.208-.48.292-.229.083-.52.083Z" />
								</svg>
							</button>
						</div>
					</div>

					<div class="staff-portal__orders__order__ordered-items">
						{#each order.list as id}
							{#await getItem(id) then item}
								<div class="staff-portal__orders__order__ordered-items__item">
									<h2 class="staff-portal__orders__order__ordered-items__item__item-name"># {item.name}</h2>
									<p class="staff-portal__orders__order__ordered-items__item__item-price">₹ {item.price}</p>
								</div>
							{/await}
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

<style>
	.staff-portal {
		margin: 1rem;
		width: 600px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}

	.staff-portal__title {
		font-size: 2.75rem;
		font-weight: 600;
		color: #673ab7;
	}

	.staff-portal__orders {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.staff-portal__orders__order {
		width: 100%;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		border-radius: 0.5rem;
		background-color: #363636;
	}

	.staff-portal__orders__order__details {
		width: 100%;
		display: flex;
	}

	.staff-portal__orders__order__details__imp {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.staff-portal__orders__order__details__imp__ordered-by {
		font-size: 1.25rem;
		font-weight: 400;
		color: #eeeeee;
	}

	.staff-portal__orders__order__details__imp__ordered-by {
		font-size: 1.25rem;
		font-weight: 400;
		color: #eeeeee;
	}

	.staff-portal__orders__order__details__options {
		display: flex;
		align-items: center;
	}

	.order-completed-btn {
		height: 100% !important;
		padding: 0 0.25rem;
	}

	.staff-portal__orders__order__ordered-items {
		padding: 0.5rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		border: 1px solid #bdbdbd;
		border-radius: 0.25rem;
	}

	.staff-portal__orders__order__ordered-items__item {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.staff-portal__orders__order__ordered-items__item__item-name {
		font-size: 1rem;
		font-weight: 600;
		color: #eeeeee;
	}

	.staff-portal__orders__order__ordered-items__item__item-price {
		font-size: 1rem;
		font-weight: 400;
		color: #eeeeee;
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
