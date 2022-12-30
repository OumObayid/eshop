import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React from "react"
import CheckoutForm from "./CheckoutForm"

const PUBLIC_KEY = "pk_test_51MKIp3KSFdzmNXFyn788JoITCaC8eeCxcjr3voWx0nyc6CTtaY4vvNVRAvdTrhuphTzY0GzeQSfrBTlipjLNUHDK00hq6cTLL7"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function StripeContainer() {
	return (
		<Elements stripe={stripeTestPromise}>
			<CheckoutForm />
		</Elements>
	)
}
