<script>
	import { onMount } from "svelte";

	let orders;

	const getItem = async (id) => {
		let res = await fetch(`https://gestore.up.railway.app/items/${id}`);
		res = await res.json();

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
	<h1 class="staff-portal-title">Staff Portal</h1>

	<div class="orders">
		{#if orders}
			{#each orders as order (order._id)}
				<div class="order">
					<div class="order-details">
						<div class="order-imp-details">
							<p class="order-no">Order no: {order.orderNo}</p>
							<p class="order-price">Price: {order.amount} ₹</p>
						</div>

						<div class="order-options">
							<button class="order-completed-btn primary-button primary-solid-button" on:click={() => orderDone(order._id)}>
								<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
									<path
										fill="#eeeeee"
										d="M15.792 29.25q-.25 0-.5-.083-.25-.084-.459-.292l-7.416-7.417q-.417-.416-.396-1.02.021-.605.396-1.021.416-.375.979-.375.562 0 .979.375l6.417 6.458 14.791-14.792q.417-.416 1-.416.584 0 1 .416.417.375.417.98 0 .604-.417.979L16.792 28.875q-.25.208-.48.292-.229.083-.52.083Z" />
								</svg>
							</button>
						</div>
					</div>

					<div class="ordered-items">
						{#each order.items as id}
							{#await getItem(id) then item}
								<div class="item">
									<h2 class="item-name"># {item.name}</h2>
									<p class="item-price">₹ {item.price}</p>
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
		margin: 16px;
		width: 600px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 48px;
	}

	.staff-portal-title {
		font-size: 44px;
		font-weight: 600;
		color: #673ab7;
	}

	.orders {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.order {
		width: 100%;
		padding: 16px;
		display: flex;
		flex-direction: column;
		gap: 16px;
		border-radius: 8px;
		background-color: #363636;
	}

	.order-details {
		width: 100%;
		display: flex;
	}

	.order-imp-details {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.order-no {
		font-size: 20px;
		font-weight: 400;
		color: #eeeeee;
	}

	.order-price {
		font-size: 20px;
		font-weight: 400;
		color: #eeeeee;
	}

	.order-options {
		display: flex;
		align-items: center;
	}

	.order-completed-btn {
		height: 100% !important;
		padding: 0 4px;
	}

	.ordered-items {
		padding: 8px;
		display: flex;
		flex-direction: column;
		gap: 8px;
		border: 1px solid #bdbdbd;
		border-radius: 4px;
	}

	.item {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.item-name {
		font-size: 16px;
		font-weight: 600;
		color: #eeeeee;
	}

	.item-price {
		font-size: 16px;
		font-weight: 400;
		color: #eeeeee;
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

	.primary-button:hover {
		transform: scale(1.05);
		transition: all 0.15s ease-in-out;
	}
</style>
