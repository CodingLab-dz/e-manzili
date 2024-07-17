'use client'
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from './ui/card'
import { BsFillGridFill } from "react-icons/bs";
import { MdSingleBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { AvatarImage, Avatar } from '@radix-ui/react-avatar'
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { app, auth } from '@/app/firebase/config'
import { onAuthStateChanged, signOut } from "firebase/auth"
import Aos from 'aos'
import "aos/dist/aos.css"

export default function CardsS({ img, adres, nom, type, mail, tel, disc, id, logo }) {
    const router = useRouter()
    const [isconnected, setisconnected] =useState(true)
    useEffect(() => {
        Aos.init()
    }, [])

    useEffect(() => {
        onAuthStateChanged(auth,async (user) => {
            if (user) {
                setisconnected(true)
            } else {
                setisconnected(false)
            }
        })
    })
    const handelclick = () => {
        sessionStorage.clear()
        sessionStorage.setItem("selected", JSON.stringify({ nom: nom, adress: adres, img: img, mail: mail, disc: disc, id: id, tel: tel, type: type, logo: logo }))
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/detail-service')
            } else {
                router.push('/signup')
            }
        })

    }
    return (
        <div data-aos="fade-up" data-aos-duration="3000">
            <Link href={
                isconnected ? {
                    pathname: '/detail-service',
                    query: {select: JSON.stringify({ nom: nom, adress: adres, img: img, mail: mail, disc: disc, id: id, tel: tel, type: type, logo: logo })}
                } : '/signup'
                //  {
                //     pathname: '/signup',
                //     query: {select: JSON.stringify({type: "services", nom: nom, adress: adres, img: img, mail: mail, disc: disc, id: id, tel: tel, type: type, logo: logo })}
                // }
                }>
                <Card className="py-3 shadow-lg transition-all hover:-translate-y-2 min-w-[300px]">
                    <CardContent className='bg-cover bg-center h-[200px]'>
                        <Avatar className='rounded-lg overflow-hidden w-full h-full'>
                            <AvatarImage alt='image' src={img[0].img} style={{ width: "100%", height: "100%" }} className='rounded-lg' loading='lazy' />
                        </Avatar>
                    </CardContent>
                    <CardFooter className="flex flex-col">
                        <div className='flex flex-row justify-between w-full items-center mb-2'>
                            <div className='flex flex-col'>
                                <h1>{nom}</h1>
                            </div>
                            <div className='flex flex-row items-center border border-blue-950 text-blue-950 rounded-full px-3 py-1'>
                                <span>{type} </span>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between items-center w-full'>
                            <h1 className='font-semibold'>{adres}</h1>
                        </div>
                    </CardFooter>
                </Card>
            </Link>
        </div>
    )
}
