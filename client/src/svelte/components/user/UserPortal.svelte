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
		let res = await fetch("https://gestore.up.railway.app/items");
		res = await res.json();

		items = res.items;
	});
</script>

<div class="user-portal">
	<h1 class="user-portal__title">User Portal</h1>

	<div class="user-portal__menu">
		{#if items}
			{#each items as item (item._id)}
				<div class="user-portal__menu__item">
					<div class="user-portal__menu__item__details">
						<h2 class="user-portal__menu__item__details__name"># {item.name}</h2>
						<p class="user-portal__menu__item__details__price">₹ {item.price}</p>
					</div>

					<div class="user-portal__menu__item__options">
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
		margin: 1rem;
		width: 600px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}

	.user-portal__title {
		font-size: 2.75rem;
		font-weight: 600;
		color: #673ab7;
	}

	.user-portal__menu {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.user-portal__menu__item {
		width: 100%;
		padding: 1rem;
		display: flex;
		border-radius: 0.5rem;
		background-color: #363636;
	}

	.user-portal__menu__item__details {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.user-portal__menu__item__details__name {
		font-size: 1.25rem;
		font-weight: 600;
		color: #eeeeee;
	}

	.user-portal__menu__item__details__price {
		font-size: 1.25rem;
		font-weight: 400;
		color: #eeeeee;
	}

	.user-portal__menu__item__options {
		display: flex;
		align-items: center;
	}

	.push-to-list {
		height: 100% !important;
		padding: 0 0.25rem;
	}

	.pop-from-list {
		height: 100% !important;
		padding: 0 0.25rem;
		border: 1px solid #e57373 !important;
	}

	.order-the-list {
		position: sticky;
		bottom: 1rem;
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
