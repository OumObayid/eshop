import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import React, { useEffect } from "react"
import CheckoutForm from "./CheckoutForm"
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";

const PUBLIC_KEY = "pk_test_51MKIp3KSFdzmNXFyn788JoITCaC8eeCxcjr3voWx0nyc6CTtaY4vvNVRAvdTrhuphTzY0GzeQSfrBTlipjLNUHDK00hq6cTLL7"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

export default function Checkout() {

const navigate=useNavigate();
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        console.log('user :', user);
        if (!user) {
        
          navigate("/login");
        }
      })
  }, [])
  
	return (
		<Elements stripe={stripeTestPromise}>
			<CheckoutForm />
		</Elements>
	)
}
