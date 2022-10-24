<script>
	import Router from "svelte-spa-router";
	import { wrap } from "svelte-spa-router/wrap";
	import AuthPage from "./pages/AuthPage.svelte";
	import UserPage from "./pages/UserPage.svelte";
	import AdminPage from "./pages/AdminPage.svelte";
	import StaffPage from "./pages/StaffPage.svelte";

	const routes = {
		"/": wrap({
			component: AuthPage,
		}),
		"/user": wrap({
			component: UserPage,
		}),
		"/admin": wrap({
			component: AdminPage,
		}),
		"/staff": wrap({
			component: StaffPage,
		}),
	};
</script>

<Router {routes} />

<style>
</style>
