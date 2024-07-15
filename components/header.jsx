'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import Avatardrop from './avatardrop'
import Connexionbtn from './connexionbtn'
import { usePathname } from "next/navigation"
import { cn } from '@/lib/utils'
import { app, auth,  db} from '@/app/firebase/config'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useWindowWidth } from '@react-hook/window-size'
import AvatardropM from './avatardropM'
import { HiBars3 } from "react-icons/hi2";
import logo from '@/images/logo.png'
import Image from 'next/image'
import Aos from 'aos'
import "aos/dist/aos.css"
export default function Header() {
    const usepath = usePathname()
    const [burgur, setBurger] = useState(false)
    const [av, setAv] = useState()
    const [isconectrd, setIsconected] = useState(false)
    const onlyWidth = useWindowWidth()
    const mobilewith = onlyWidth < 768
    const links = [
        { label: "Les Biens", link: "/" },
        { label: "les services", link: "/lesservices" },
        { label: "A propos", link: "/about" },
        { label: "E-manzili", link: "/emanzili" },
        { label: "Contact", link: "#contact" }
    ]
    useEffect(()=>{
        Aos.init()
    }, [])
    useEffect(() => {
        onAuthStateChanged(auth,async (user) => {
            if (user) {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const nom = docSnap.data().nom
                    const prenom = docSnap.data().prenom
                    setAv(( nom.charAt(0) + prenom.charAt(0)))
                }
                setIsconected(true)
            } else {
                setIsconected(false)
            }
        })
    })
    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className='w-full h-[70px] fixed z-50 top-0 border-b bg-[#F5F5F5]' data-aos="fade-down" data-aos-duration="1500">
            <div className='m-auto w-full z-40 h-full max-w-7xl flex flex-row justify-between items-center px-3 xl:px-0'>
                {/* logo */}
                <div>
                    <Image src={logo} width={100} height={70} alt='logo'/>
                </div>
                {/* links */}
                <div className='hidden tablet:flex'>
                    {links.map((link, k) => (
                        <Link key={k} href={link.link} className={link.link === usepath ? 'mr-6 text-yellow-500' : 'mr-6 hover:text-yellow-600'}>{link.label}</Link>
                    ))}
                </div>
                {/* conexion & avatar */}
                <div className='hidden tablet:block'>
                    {!isconectrd ? <div>
                        <Connexionbtn />
                    </div> : <div>
                        <Avatardrop handelLogout={handleLogout} av={av}/>
                    </div>}
                </div>
                <div className='tablet:hidden' onClick={()=>setBurger(!burgur)}>
                    <HiBars3 />
                </div>
            </div>
            {/* mobile nav */}
            <div className={burgur ? 'absolute z-30 left-0 top-[75px] flex flex-col min-h-[200px] h-fit w-full justify-start transition-all bg-[#F5F5F5] border rounded-xl p-3 mx-2 tablet:hidden' : 'absolute z-40 left-0 top-[-300px] flex flex-col min-h-[200px] h-fit w-full justify-start transition-all bg-[#F5F5F5] border rounded-xl p-3 mx-2 tablet:hidden'}>

                {/* links */}
                <div className='flex flex-col'>
                    {links.map((link, k) => (
                        <Link key={k} href={link.link} className={link.link === usepath ? 'mb-3 text-yellow-500' : 'mb-3 hover:text-yellow-600'}>{link.label}</Link>
                    ))}
                </div>
                {/* conexion & avatar */}
                <div>
                    {!isconectrd ? <div>
                        <Connexionbtn />
                    </div> : <div>
                        <AvatardropM handelLogout={handleLogout} av={av}/>
                    </div>}
                </div>
            </div>
        </div>
    )
}
