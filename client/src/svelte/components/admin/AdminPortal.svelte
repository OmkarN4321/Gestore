<script>
	import ItemsTabPanel from "./tabs/ItemsTabPanel.svelte";
	import UsersTabPanel from "./tabs/UsersTabPanel.svelte";

	let tab = "users";
</script>

<div class="admin-portal">
	<h1 class="admin-portal__title">Admin Portal</h1>

	<div class="admin-portal__update-section">
		<div class="admin-portal__update-section__tabs">
			<button
				class="admin-portal__update-section__tabs__tab"
				on:click={() => (tab = "users")}
				style="color:{tab === 'users' ? '#7e57c2' : '#bdbdbd'}">
				USERS
			</button>
			<button
				class="admin-portal__update-section__tabs__tab"
				on:click={() => (tab = "items")}
				style="color:{tab === 'items' ? '#7e57c2' : '#bdbdbd'}">
				ITEMS
			</button>
		</div>

		{#if tab === "users"}
			<UsersTabPanel />
		{:else if tab === "items"}
			<ItemsTabPanel />
		{/if}
	</div>
</div>

<style>
	.admin-portal {
		margin: 1rem;
		width: 600px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 3rem;
	}

	.admin-portal__title {
		font-size: 2.75rem;
		font-weight: 600;
		color: #673ab7;
	}

	.admin-portal__update-section {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.admin-portal__update-section__tabs {
		padding-bottom: 0.5rem;
		width: 100%;
		display: flex;
		border-bottom: 1px solid #bdbdbd;
	}

	.admin-portal__update-section__tabs__tab {
		width: 100%;
		font-size: 1.25rem;
		font-weight: 400;
		color: #bdbdbd;
	}
</style>
