import React, { useEffect } from 'react';
import {useAtom} from "jotai";
import {accessTokenAtom, initatePaymentAtom, selectedCauseAtom, txnidAtom} from "@/data/store.ts";

import CryptoJS from 'crypto-js';
import {useProfileControllerGetUserProfile} from "@/api/auth.ts";
import {Button} from "@mantine/core";
import {ImArrowRight2} from "react-icons/im";
import {useNavigate} from "react-router-dom";
import {usePaymentControllerGetPaymentByTxnId} from "@/api/survey.ts";
import Routes from "@/data/routes.ts";
const merchantKey = import.meta.env.VITE_PAYU_MERCHANT_KEY;
const salt = import.meta.env.VITE_PAYU_SALT;
const ENV = import.meta.env.VITE_PAYU_ENV;


function generateHash(txnid, amount, productinfo, firstname, email) {
    const concatenatedData = `${merchantKey}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
    const hash = CryptoJS.SHA512(concatenatedData).toString(CryptoJS.enc.Hex);
    return hash;
}

const loadPayUScript = (): Promise<void> => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        if (ENV === 'TEST') {
            script.src = 'https://test.payu.in/_payment';
        }else if(ENV === 'PROD'){
            script.src = 'https://secure.payu.in/_payment';
        }// Change to PayU’s environment
        script.async = true;
        script.onload = () => resolve();
        document.body.appendChild(script);
    });
};


export const PayUCheckout: React.FC = () => {
    const [accessToken] = useAtom(accessTokenAtom);
    const [txnid , setTxnid] = useAtom(txnidAtom);
    const { data: profileInfo } = useProfileControllerGetUserProfile({
        query: {
            enabled: !!accessToken,
        },
    })

    const surl = `https://uat.backend.cause-i.ai/v1/payments`;
    const furl = `https://uat.backend.cause-i.ai/v1/payments`;
    const [initatePayment] =useAtom(initatePaymentAtom);
    const amount = initatePayment?.amount;
    const productinfo = initatePayment?.productinfo;
    const firstname = initatePayment?.firstname;
    const email = profileInfo?.email;
    const phone = initatePayment?.phone;


    useEffect(() => {
        loadPayUScript();
        console.log(initatePayment)
    }, []);


    // Function to generate unique transaction ID with prefix IM_
    const generateTransactionID = (): string => {
        const timestamp = Date.now(); // Get current timestamp
        return `IM_${timestamp}`;
    };
    setTxnid(generateTransactionID()); // Generate transaction ID

    const startPayment = async () => {
        // Call your backend API to generate the hash

        const hash = generateHash(txnid, amount, productinfo, firstname, email);
        // Prepare PayU form data
        const payUForm = document.createElement('form');
        // PayU URL
        if (ENV === 'TEST') {
            payUForm.action = 'https://test.payu.in/_payment';
        } else if (ENV === 'PROD') {
            payUForm.action = 'https://secure.payu.in/_payment';
        }
        payUForm.method = 'POST';

        // Add form inputs
        payUForm.innerHTML = `
      <input type="hidden" name="key" value="${merchantKey}" />
      <input type="hidden" name="txnid" value="${txnid}" />
      <input type="hidden" name="amount" value="${amount}" />
      <input type="hidden" name="productinfo" value="${productinfo}" />
      <input type="hidden" name="firstname" value="${firstname}" />
      <input type="hidden" name="email" value="${email}" />
      <input type="hidden" name="phone" value="${phone}" />
      <input type="hidden" name="hash" value="${hash}" />
      <input type="hidden" name="surl" value="${surl}" />
      <input type="hidden" name="furl" value="${furl}" />
    `;

        document.body.appendChild(payUForm);
        payUForm.submit();
    };

    return (
        <Button
            type="submit"
            variant="white"
            size="lg"
            radius="xl"
            color="#101010"
            rightSection={<ImArrowRight2 />}
            className="text-gray"
            onClick={startPayment}
        >
            Proceed to Payment
        </Button>
    );
};

export const VerifyPayment: React.FC = () => {
    const [txnid] = useAtom(txnidAtom)
    const navigate = useNavigate();
    const [ selectedCause ] = useAtom(selectedCauseAtom);

    const { data: txnDetails, isLoading, isError, error } = usePaymentControllerGetPaymentByTxnId(txnid, {});

    if (isLoading) {
        return <div>Loading payment details...</div>;
    }

    if (isError) {
        return <div>Error: {error?.message || "Failed to fetch payment details."}</div>;
    }

    return (
        <div className="mt-10 px-4 md:px-10">
    <span className="text-2xl md:text-3xl">
      Your answers just unlocked funding for{' '}
        <span className="font-semibold" style={{ color: selectedCause.colour }}>
        {selectedCause.name}
      </span>
    </span>
            <br />
            <br />
            <br />
            <span className="text-lg md:text-2xl">
      Feel proud—you’re officially part of a purpose pathway that leads to more authentic folks like yourself!
      <br />
      Hold on while we send you an invitation to join its kickass vibes!
    </span>
            <br />
            <br />
            <br />
            <span className="text-lg md:text-2xl">In the meantime,</span>
            <div className="flex flex-col md:flex-row gap-5 mt-5">
                <Button
                    type="submit"
                    variant="white"
                    size="lg"
                    radius="xl"
                    color="#101010"
                    className="text-gray w-full md:w-auto"
                    onClick={() => navigate(Routes.REWARD)}
                >
                    <span className="px-4 md:px-10 text-center">Reveal Your Civic Empathy Quotient</span>
                </Button>
                <Button
                    type="submit"
                    variant="transparent"
                    size="lg"
                    radius="xl"
                    color="#101010"
                    className="text-white border border-white w-full md:w-auto hover:text-orange hover:border-orange"
                    style={{ borderWidth: '2px' }}
                    onClick={() => navigate(Routes.PROFILE)}
                >
                    <span className="px-4 md:px-10 text-center">Download Payment Receipt</span>
                </Button>
            </div>
        </div>
    );

};
