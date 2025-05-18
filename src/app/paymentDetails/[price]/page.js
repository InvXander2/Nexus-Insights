"use client"
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const PaymentDetails = () => {
    const router = useRouter();
    const { price, min, max } = router.query;

    const [investmentAmount, setInvestmentAmount] = useState(price);
    const [paymentMethod, setPaymentMethod] = useState("btc");  // Default payment method
    const [errorMessage, setErrorMessage] = useState("");

    // Conversion rates based on payment method
    const conversionRates = {
        btc: 103892,  // Bitcoin rate
        eth: 2508,    // Ethereum rate
        usdt: 1,      // USDT rate (fixed to $1)
        trx: 0.27     // Tron rate
    };

    // Get the conversion rate based on selected payment method
    const currentRate = conversionRates[paymentMethod];
    
    // Convert the investment amount based on the selected payment method
    let amtConversion = (investmentAmount / currentRate).toFixed(4);

    const handleAmountChange = (e) => {
        const value = parseFloat(e.target.value);
        if (value >= min && value <= max) {
            setInvestmentAmount(value);
            setErrorMessage("");
        } else {
            setErrorMessage(`Amount must be between $${min} and $${max}`);
        }
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    return (
        <div className="bg-gradient-to-tl from-blue-900 to-black pb-10 px-28 max-[610px]:px-20 max-[472px]:px-10 max-[390px]:px-5 pt-20 flex items-center justify-center text-black">
            <div className="bg-white rounded-xl p-5 max-[450px]:p-3 w-[500px]">
                <div className="flex flex-col gap-5">
                    <h3 className="font-bold text-xl">Commencing Transaction...</h3>
                    
                    {/* Payment Method Section */}
                    <div className="flex flex-col gap-4 mt-5">
                        <label htmlFor="paymentMethod" className="font-semibold">Select Payment Method:</label>
                        <select
                            id="paymentMethod"
                            value={paymentMethod}
                            onChange={handlePaymentMethodChange}
                            className="p-2 border rounded-md text-black"
                        >
                            <option value="btc">Bitcoin (BTC)</option>
                            <option value="eth">Ethereum (ETH)</option>
                            <option value="usdt">USDT (BEP20)</option>
                            <option value="trx">Tron (TRX)</option>
                        </select>
                    </div>

                    <div className="flex gap-5 items-center">
                        <h4 className="max-[450px]:text-[13px]">Amount to deposit(Proposed) :</h4>
                        <h4 className="font-bold">${investmentAmount} USD ({amtConversion} {paymentMethod.toUpperCase()})</h4>
                    </div>
                    <div className="flex gap-5 items-center">
                        <h4 className="max-[450px]:text-[13px]">Total Fees :</h4>
                        <h4 className="font-bold">$0.00 USD</h4>
                    </div>
                    <div className="flex gap-5 items-center">
                        <h4 className="max-[450px]:text-[13px]">Sum Total :</h4>
                        <h4 className="font-bold">${investmentAmount} USD</h4>
                    </div>
                    <div className="flex gap-5 items-center">
                        <h4 className="max-[450px]:text-[13px]">Proposed Transaction Duration :</h4>
                        <h4 className="font-bold">10 mins</h4>
                    </div>
                    
                    {/* Error message */}
                    {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

                    {/* Continue to Payment Button */}
                    <Link href={{
                        pathname: `/verifyPayment/${amtConversion}`,
                        query: { 
                            paymentMethod,  // Pass selected payment method
                        }
                    }}>
                        <button className="bg-gradient-to-tl from-blue-900 to-black text-white p-2 flex w-full justify-center rounded-full mt-5">Continue to Payment</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
