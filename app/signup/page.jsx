'use client';

import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber, isPossiblePhoneNumber, getCountryCallingCode, getCountries } from 'react-phone-number-input';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from "@/components/ui/input-otp"
import libphonenumber from 'libphonenumber-js';
import countryNames from 'react-phone-number-input/locale/fr.json'
import { app, auth, db } from "../firebase/config";
import { RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"
import { useRouter } from "next/navigation";
import Image from "next/image";
import banner from '@/images/House-banner.webp'


export default function Signup() {
    const [ismobile, setIsmobile] = useState(false)
    const [next, setNext] = useState(false)
    const [value, setValue] = useState()
    const [countryset, setCountryset] = useState("DZ")
    const [nom, setNom] = useState("")
    const [prenom, setPrnom] = useState("")
    const [confirmation, setConfirmation] = useState(null)
    const inputRef = useRef(null);
    const [msg, setMsg] = useState("")
    const router = useRouter()
    const [otp, setOpt] = useState()



    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                router.push('/')
                // if (!docD) {
                //     router.push('/')
                // } else {
                //     if (docD.type === "states") {
                //         router.push('/detail?select='+JSON.stringify({ id: docD.id, promo: docD.promo, adress: docD.adres, img: docD.img, prix: docD.prix, disc: docD.disc, entreprise: docD.entreprise, chmbr: docD.chmbr, sanit: docD.sanit, surface: docD.surface, etat: docD.etat }))
                //         // router.push({
                //         //     pathname: '/detail',
                //         //     query: { select: JSON.stringify({ id: docD.id, promo: docD.promo, adress: docD.adres, img: docD.img, prix: docD.prix, disc: docD.disc, entreprise: docD.entreprise, chmbr: docD.chmbr, sanit: docD.sanit, surface: docD.surface, etat: docD.etat }) }
                //         // })
                //     } else {
                //         router.push({
                //             pathname: '/detail-service',
                //             query: { select: JSON.stringify({ nom: docD.nom, adress: docD.adres, img: docD.img, mail: docD.mail, disc: docD.disc, id: docD.id, tel: docD.tel, type: docD.type, logo: docD.logo }) }
                //         })
                //     }
                // }
            }
        })
    })

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recapcha-container", {
            'size': 'invisible',
            'callback': (response) => {

            },
            'expired-callback': () => {

            },
        })
    }, [auth])
    const handelbutton = async () => {
        const valid = (value && isValidPhoneNumber(value) ? true : false)
        const possible = (value && isPossiblePhoneNumber(value) ? true : false)
        if (!valid || !possible) {
            setMsg("check phone number")
        } else {
            try {
                const confirm = await signInWithPhoneNumber(auth, value, window.recaptchaVerifier);
                setConfirmation(confirm)

                setNext(true)
            } catch (error) {
                console.error(error)
            }
        }
        //setNext(true)
    }
    const handelOTP = async () => {
        try {
            await confirmation.confirm(otp).then(cred => {
                const userRef = doc(db, 'users', cred.user.uid);
                setDoc(userRef, {
                    nom: nom,
                    prenom: prenom,
                    country: countryNames[countryset],
                    bienfav: [],
                    servfav: []
                })
            })
            alert('user connected')
        } catch (error) {
            console.error(error)
        }
    }
    //  useEffect(() => {
    //      const input = inputRef.current;
    //      const iti = intlTelInput(input, {
    //          utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js',
    //      });
    //      var errorMap = [
    //          "Invalid number",
    //          "Invalid country code",
    //          "Too short",
    //          "Too long",
    //          "Invalid number"
    //      ];
    //      input.addEventListener('blur', () => {
    //          if (input.value.trim()) {
    //              if (iti.isValidNumber()) {
    //                  const phoneNumber = iti.getNumber();
    //                  console.log(phoneNumber);
    //                  // Perform Twilio phone number syntax validation here
    //              } else {
    //                  input.classList.add('error');
    //                  const errorCode = iti.getValidationError();
    //                  alert(errorMap[errorCode]);
    //              }
    //          }
    //      })
    //      return () => {
    //          // Clean up the intlTelInput instance if needed
    //      };
    //  }, [])



    return (
        <div className=" m-full min-h-screen flex items-center">
            <div className="w-full max-w-7xl m-auto">
                <div className={ismobile ? "my-6 border rounded-xl overflow-hidden min-h-[500px] h-fit py-6 p-3 mx-3" : "my-6 border rounded-xl overflow-hidden flex flex-row min-h-[500px] h-fit py-6 p-3 shadow-xl"}>

                    <div className="w-full  overflow-hidden tablet:w-[50%] h-full px-6 relative">
                        <div className="w-full h-full flex flex-col justify-start items-start ">
                            <div className="w-fit h-fit my-6">
                                <h1 className="font-bold text-[36px]">Inscription</h1>
                            </div>
                            <div className="w-full">
                                <Label htmlFor="nom">Nom</Label>
                                <Input id='nom' className='my-3 px-2 w-[240px]' onChange={(e) => setNom(e.target.value)} value={nom} />
                                <Label htmlFor="prenom">Prenom</Label>
                                <Input id='prenom' className='my-3 px-2 w-[240px]' onChange={(e) => setPrnom(e.target.value)} value={prenom} />
                                <Label htmlFor="phone" >N° phone</Label>
                                <div className="my-container-class w-fit h-fit rounded-md overflow-hidden my-3 px-2" >
                                    <PhoneInput
                                        id="phone"
                                        placeholder="Enter phone number"
                                        defaultCountry="DZ"
                                        value={value}
                                        onCountryChange={setCountryset}
                                        onChange={setValue}
                                        error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
                                    />
                                </div>
                                {/* <h1>value: {value}</h1>
                                <h1>countryc: {countryset}</h1>
                                <h1>country: {countryNames[countryset]}</h1> */}
                                <h1 className="text-red-400">{msg}</h1>
                                <Button onClick={handelbutton} className='float-right px-12'>next</Button>
                            </div>
                        </div>
                        <div className={next ? "w-full h-full absolute top-0 left-0 transition-all bg-[#F5F5F5] flex flex-col justify-around items-start px-3" : "w-full h-full absolute top-0 left-[100%] transition-all bg-[#F5F5F5]"}>
                            <h1>OTP</h1>
                            <div className='w-fit h-fit my-3'>
                                <InputOTP
                                    maxLength={6}
                                    value={otp}
                                    onChange={(value) => setOpt(value)} >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>
                            <Button onClick={handelOTP}>sign up</Button>
                        </div>
                    </div>
                    <div className="hidden tablet:flex bg-center bg-cover w-[50%] h-full bg-red-600 rounded-tr-xl rounded-br-xl overflow-hidden">
                        <Image src={banner} alt='banner' style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            </div>
            <div id="recapcha-container"></div>
        </div>
    );
}