'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "./ui/input-otp"
import { Label } from './ui/label'
import { Input } from './ui/input'
import Link from 'next/link'
import countryNames from 'react-phone-number-input/locale/fr.json'
import { auth, app } from '@/app/firebase/config'
import { RecaptchaVerifier, signInWithPhoneNumber, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, setDoc, doc } from "firebase/firestore"
import 'react-phone-number-input/style.css';
import PhoneInput, { isValidPhoneNumber, isPossiblePhoneNumber, getCountryCallingCode, getCountries } from 'react-phone-number-input';
import { usePathname, useRouter} from "next/navigation"
export default function Connexionbtn() {
    const usepath = usePathname()
    const [next, setNext] = useState(false)
    const [value, setValue] = useState()
    const [countryset, setCountryset] = useState("DZ")
    const [otp, setOpt] = useState()
    const [msg, setMsg] = useState("")
    const [confirmation, setConfirmation] = useState(null)
    const router = useRouter()

    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recapcha-container", {
            'size': 'invisible',
            'callback': (response) => {

            },
            'expired-callback': () => {

            },
        })
    }, [auth])



    const handelOTP = async () => {
        try {
            await confirmation.confirm(otp)
            if (usepath !== '/') {
                const doc = JSON.parse(sessionStorage.getItem('id'))
                if (doc) {
                    router.push('/detail')
                }else{
                    router.push('/detail-service')
                }

            }
            alert('user connected')
        } catch (error) {
            console.error(error)
        }
    }

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

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Connexion</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Commexion</DialogTitle>
                    </DialogHeader>
                    <div className='w-full h-full relative overflow-hidden'>
                        <div className="grid gap-4 py-4">
                            {/* <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input id="name" value="Pedro Duarte" className="col-span-3" />
                            </div> */}
                            <Label htmlFor="phone" className='text-left'>N°te Telephone</Label>
                            <div id='phone' className="my-container-class w-fit h-fit rounded-md overflow-hidden my-3 px-2" >
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
                        </div>
                        <div className={next ? 'w-full h-full bg-white absolute z-10 left-0 top-0 transition-all' : 'w-full h-full bg-white absolute z-10 left-[120%] top-0 transi'}>

                            <div className="grid grid-cols-1 items-center gap-4">
                                <Label htmlFor="username" className="text-left">
                                    OTP
                                </Label>
                                <div className='m-auto w-fit h-fit'>
                                    <InputOTP
                                        maxLength={6}
                                        value={otp}
                                        onChange={(value) => setOpt(value)}>
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
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <div className='flex flex-col w-full'>
                            {
                                !next ? <div className='flex flex-row justify-end' onClick={handelbutton}>
                                    <Button type="submit">Resive OTP</Button>
                                </div> : <div className='w-full flex flex-row justify-between items-center'>
                                    <div onClick={()=>setNext(false)}>
                                        <Button variant="outline" type="submit">return</Button>
                                    </div>
                                    <div>
                                        <Button onClick={handelOTP} type="submit">connexion</Button>
                                    </div>
                                </div>
                            }
                            <div className='my-2 text-right'>
                                <Link href="/signup">Create a accoute</Link>
                            </div>
                        </div>
                    </DialogFooter>
                </DialogContent>

                <div id="recapcha-container" className='z-50'></div>
            </Dialog>
        </div>
    )
}
