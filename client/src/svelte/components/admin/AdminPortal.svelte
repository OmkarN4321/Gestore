<script>
	import ItemsTabPanel from "./tabs/ItemsTabPanel.svelte";
	import UsersTabPanel from "./tabs/UsersTabPanel.svelte";

	let tab = "users";
</script>

<div class="admin-portal">
	<h1 class="admin-portal-title">Admin Portal</h1>

	<div class="admin-portal-update-section">
		<div class="admin-portal-update-section-tabs">
			<button class="admin-portal-update-section-tab" on:click={() => (tab = "users")} style="color:{tab === 'users' ? '#7e57c2' : '#bdbdbd'}">
				USERS
			</button>
			<button class="admin-portal-update-section-tab" on:click={() => (tab = "items")} style="color:{tab === 'items' ? '#7e57c2' : '#bdbdbd'}">
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
		margin: 16px;
		width: 600px;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 48px;
	}

	.admin-portal-title {
		font-size: 44px;
		font-weight: 600;
		color: #673ab7;
	}

	.admin-portal-update-section {
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.admin-portal-update-section-tabs {
		padding-bottom: 8px;
		width: 100%;
		display: flex;
		border-bottom: 1px solid #bdbdbd;
	}

	.admin-portal-update-section-tab {
		width: 100%;
		font-size: 20px;
		font-weight: 400;
		color: #bdbdbd;
	}
</style>
