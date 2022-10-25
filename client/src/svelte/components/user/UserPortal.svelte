<script>
	import { onMount } from "svelte";
	import PaymentModal from "./PaymentModal.svelte";

	let items;
	let list = [];
	let modal = false;

	const pushToList = (id) => {
		list = list.concat(id);
	};

	const popFromList = (id) => {
		list = list.filter((l_id) => l_id !== id);
	};

	const setModal = () => {
		modal = !modal;
	};

	onMount(async () => {
		let res = await fetch("https://gestore-production.up.railway.app//items");
		res = await res.json();

		items = res.items;
	});
</script>

<div class="user-portal">
	<h1 class="user-portal-title">User Portal</h1>

	<div class="menu">
		{#if items}
			{#each items as item (item._id)}
				<div class="item">
					<div class="item-details">
						<h2 class="item-name"># {item.name}</h2>
						<p class="item-price">₹ {item.price}</p>
					</div>

					<div class="item-options">
						{#if !list.includes(item._id)}
							<button class="push-to-list primary-button primary-outline-button" on:click={() => pushToList(item._id)}>
								<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
									<path
										fill="#eeeeee"
										d="M6.375 12.75q-.583 0-.979-.396T5 11.375q0-.625.396-1.021.396-.396.979-.396h17.042q.583 0 .979.417t.396 1q0 .583-.396.979t-.979.396Zm0 6.792q-.583 0-.979-.396T5 18.167q0-.584.396-.979.396-.396.979-.396h17.042q.583 0 .979.396.396.395.396.979 0 .583-.396.979t-.979.396Zm0 6.833q-.583 0-.979-.417-.396-.416-.396-1 0-.583.396-.979t.979-.396h10.167q.583 0 1 .396.416.396.416.979 0 .625-.416 1.021-.417.396-1 .396Zm19.917 4.333-3.875-3.833q-.417-.417-.417-1t.417-.958q.416-.375.979-.396.562-.021.979.354l2.833 2.792 6.5-6.542q.417-.375 1-.375.584 0 1 .417.417.416.396 1-.021.583-.437 1l-7.542 7.541q-.375.375-.917.375-.541 0-.916-.375Z" />
								</svg>
							</button>
						{:else}
							<button class="pop-from-list primary-button primary-outline-button" on:click={() => popFromList(item._id)}>
								<svg xmlns="http://www.w3.org/2000/svg" height="40" width="40">
									<path
										fill="#eeeeee"
										d="M6.375 26.375q-.583 0-.979-.396T5 25q0-.583.396-.979t.979-.396h9.458q.584 0 .979.396.396.396.396.979t-.396.979q-.395.396-.979.396Zm0-6.792q-.583 0-.979-.395Q5 18.792 5 18.208q0-.625.396-1.02.396-.396.979-.396h16.417q.583 0 .979.416.396.417.396 1 0 .584-.396.98-.396.395-.979.395Zm0-6.791q-.583 0-.979-.417t-.396-1q0-.583.396-.979T6.375 10h16.417q.583 0 .979.396t.396.979q0 .625-.396 1.021-.396.396-.979.396Zm16.542 22.916q-.417-.416-.417-1 0-.583.375-1l3.625-3.583-3.625-3.625q-.417-.417-.417-.979 0-.563.417-.979.375-.375.958-.375.584 0 1 .375l3.625 3.625 3.584-3.625q.416-.375.979-.396.562-.021.979.396.417.375.417.958t-.417 1l-3.625 3.625L34 33.708q.417.417.438.98.02.562-.396.979-.417.416-1 .416-.584 0-1-.416l-3.584-3.625-3.625 3.625q-.416.416-.958.416t-.958-.375Z" />
								</svg>
							</button>
						{/if}
					</div>
				</div>
			{/each}
		{/if}
	</div>

	{#if list.length !== 0}
		<button class="order-the-list primary-button primary-solid-button" on:click={setModal}>Order the list</button>
	{/if}

	{#if modal}
		<PaymentModal {setModal} {list} />
	{/if}
</div>

<style>
	.user-portal {
		margin: 16px;
		width: 600px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 48px;
	}

	.user-portal-title {
		font-size: 44px;
		font-weight: 600;
		color: #673ab7;
	}

	.menu {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.item {
		width: 100%;
		padding: 16px;
		display: flex;
		border-radius: 8px;
		background-color: #363636;
	}

	.item-details {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.item-name {
		font-size: 20px;
		font-weight: 600;
		color: #eeeeee;
	}

	.item-price {
		font-size: 20px;
		font-weight: 400;
		color: #eeeeee;
	}

	.item-options {
		display: flex;
		align-items: center;
	}

	.push-to-list {
		height: 100% !important;
		padding: 0 4px;
	}

	.pop-from-list {
		height: 100% !important;
		padding: 0 4px;
		border: 1px solid #e57373 !important;
	}

	.order-the-list {
		position: sticky;
		bottom: 16px;
		left: 0;
		right: 0;
		box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px;
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
