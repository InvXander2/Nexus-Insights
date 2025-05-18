"use client"
import Link from "next/link";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

const PaymentDetails = () => {
    const params = useParams();
    const btc = 29418.60;

    const [amount, setAmount] = useState('');
    const [btcAmount, setBtcAmount] = useState('0.0000');
    const [error, setError] = useState('');

    // Determine plan range based on selected price
    let min = 0, max = 0;
    if (params.price == 50) { min = 200; max = 999; }
    else if (params.price == 100) { min = 1000; max = 4999; }
    else if (params.price == 500) { min = 5000; max = 9999; }
    else if (params.price == 1000) { min = 10000; max = 1000000; } // unlimited

    // Update BTC conversion as user types
    useEffect(() => {
        if (amount && !isNaN(amount)) {
            setBtcAmount((parseFloat(amount) / btc).toFixed(4));
        } else {
            setBtcAmount('0.0000');
        }
    }, [amount]);

    const handleChange = (e) => {
        const val = e.target.value;
        setAmount(val);
        if (val && (parseFloat(val) < min || parseFloat(val) > max)) {
            setError(`Amount must be between $${min} and $${max}`);
        } else {
            setError('');
        }
    };

    return (
        <div className="bg-gradient-to-tl from-blue-900 to-black pb-10 px-5 pt-20 flex items-center justify-center text-black">
            <div className="bg-white rounded-xl p-5 max-w-md w-full">
                <div className="flex flex-col gap-5">
                    <h3 className="font-bold text-xl">Commencing Transaction...</h3>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-semibold">Enter amount to invest (${min} - ${max})</span>
                        <input
                            type="number"
                            className="border border-gray-300 p-2 rounded"
                            value={amount}
                            onChange={handleChange}
                            placeholder={`e.g. ${min}`}
                        />
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                    </label>

                    <div className="flex gap-5 items-center">
                        <h4 className="text-sm">Amount to deposit (Proposed):</h4>
                        <h4 className="font-bold">${amount || '0.00'} USD ({btcAmount} BTC)</h4>
                    </div>

                    <div className="flex gap-5 items-center">
                        <h4 className="text-sm">Total Fees:</h4>
                        <h4 className="font-bold">$0.00 USD</h4>
                    </div>

                    <div className="flex gap-5 items-center">
                        <h4 className="text-sm">Sum Total:</h4>
                        <h4 className="font-bold">${amount || '0.00'} USD</h4>
                    </div>

                    <div className="flex gap-5 items-center">
                        <h4 className="text-sm">Proposed Transaction Duration:</h4>
                        <h4 className="font-bold">10 mins</h4>
                    </div>

                    <Link href={error || !amount ? "#" : `/verifyPayment/${btcAmount}`}>
                        <button
                            disabled={!!error || !amount}
                            className={`p-2 w-full rounded-full font-semibold ${
                                error || !amount
                                    ? "bg-gray-400 cursor-not-allowed"
                                    : "bg-gradient-to-tl from-blue-900 to-black text-white"
                            }`}
                        >
                            Continue to Payment
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PaymentDetails;
