<script>
	import { onMount } from "svelte";
	import { loadStripe } from "@stripe/stripe-js";
	import { Elements, PaymentElement, LinkAuthenticationElement } from "svelte-stripe";

	let stripe;
	let elements;
	let feedback = null;
	let loading = false;
	let clientSecret = null;
	export let list;
	export let setModal;

	const order = async () => {
		if (!loading) {
			loading = true;

			const { paymentIntent, error } = await stripe.confirmPayment({
				elements,
				redirect: "if_required"
			});

			if (error) {
				feedback = { type: "failure", message: "Payment failed" };
				loading = false;
			} else if (paymentIntent && paymentIntent.status === "succeeded") {
				feedback = { type: "success", message: "Payment successful" };
				loading = false;
			}
		}
	};

	onMount(async () => {
		const { name, email } = JSON.parse(sessionStorage.getItem("user"));

		stripe = await loadStripe(import.meta.env.VITE_PUBLIC_STRIPE_KEY);

		let res = await fetch("https://gestore.up.railway.app/paymentIntent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ user: { name, email }, list })
		});
		res = await res.json();

		clientSecret = res.client_secret;
	});
</script>

<div class="modal-background">
	<div class="modal">
		<div class="modal__header">
			<h3 class="modal__header__title">Payment modal</h3>

			<button class="modal__header__cancel-btn" on:click={setModal}>
				<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
					<path
						fill="#eeeeee"
						d="m12 13.4-4.9 4.9q-.275.275-.7.275-.425 0-.7-.275-.275-.275-.275-.7 0-.425.275-.7l4.9-4.9-4.9-4.9q-.275-.275-.275-.7 0-.425.275-.7.275-.275.7-.275.425 0 .7.275l4.9 4.9 4.9-4.9q.275-.275.7-.275.425 0 .7.275.275.275.275.7 0 .425-.275.7L13.4 12l4.9 4.9q.275.275.275.7 0 .425-.275.7-.275.275-.7.275-.425 0-.7-.275Z" /></svg>
			</button>
		</div>

		{#if stripe && clientSecret}
			<div class="modal__content">
				<Elements theme="night" labels="floating" {stripe} {clientSecret} bind:elements>
					<LinkAuthenticationElement />
					<PaymentElement />
				</Elements>
			</div>

			<div class="modal__footer">
				{#if feedback}
					<div class="feedback" style=" {feedback.type === 'success' ? 'background-color: #388e3c; border-color: #81c784' : ''} ;">
						<p class="feedback-msg">
							{feedback.message}
						</p>
					</div>
				{/if}

				<button class="primary-button primary-solid-button" disabled={loading} on:click={order}>Order</button>
			</div>
		{:else}
			Loading...
		{/if}
	</div>
</div>

<style>
	.modal-background {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, 0.4);
	}

	.modal {
		margin: 1rem;
		width: 600px;
		padding: 1rem;
		display: flex;
		flex-direction: column;
		gap: 3rem;
		border-radius: 0.5rem;
		background-color: #363636;
	}

	.modal__header {
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.modal__header__title {
		font-size: 1rem;
		font-weight: 600;
		color: #eeeeee;
	}

	.modal__footer {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.feedback {
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
