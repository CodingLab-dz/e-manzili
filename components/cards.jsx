'use client'
import React, {useEffect, useState}from 'react'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from './ui/card'
import { BsFillGridFill } from "react-icons/bs";
import { MdSingleBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { AvatarImage, Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import Link from 'next/link';
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { app, auth, storage, storageRef } from '@/app/firebase/config'
import { onAuthStateChanged, signOut } from "firebase/auth"
import { ref, getDownloadURL } from "firebase/storage"
import Aos from 'aos'
import "aos/dist/aos.css"


export default function Cards({ id, img, adres, promo, surface, prix, chmbr, sanit, disc, entreprise, etat }) {
    const router = useRouter()
    const [isconnected, setisconnected] =useState(true)
    useEffect(()=>{
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
        sessionStorage.setItem("id", JSON.stringify({ id: id, promo: promo, adress: adres, img: img, prix: prix, disc: disc, entreprise: entreprise, chmbr: chmbr, sanit: sanit, surface: surface, etat: etat }))
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/detail')
            } else {
                router.push('/signup')
            }
        })

    }
    console.log(JSON.stringify({id:id, promo:promo, adress: adres, img: img, prix: prix, disc: disc, entreprise: entreprise, chmbr: chmbr, sanit: sanit, surface: surface, etat: etat}))
    return (
        <div  data-aos="fade-up" data-aos-duration="3000">
            <Link href={
                isconnected ? {
                    pathname: '/detail',
                    query: {select: JSON.stringify({id:id, promo:promo, adress: adres, img: img, prix: prix, disc: disc, entreprise: entreprise, chmbr: chmbr, sanit: sanit, surface: surface, etat: etat})}
                } : '/signup'
                // {
                //     pathname: '/signup',
                //     query: {select: JSON.stringify({type: "states",id:id, promo:promo, adress: adres, img: img, prix: prix, disc: disc, entreprise: entreprise, chmbr: chmbr, sanit: sanit, surface: surface, etat: etat})}
                // }
            }>
            <Card className="py-3 shadow-lg transition-all hover:-translate-y-2 min-w-[300px]">
                <CardContent className='bg-cover bg-center h-[200px]'>
                    <Avatar>
                        <AvatarImage alt='@shadcn' src={img[0].url} style={{ width: "100%", height: "100%" }} className='rounded-lg' loading='lazy' />
                        <AvatarFallback>{promo}</AvatarFallback>
                    </Avatar>
                    {/* {
                            getDownloadURL(ref(storage, 'gs://e-manzili.appspot.com/GAEA/FM1-F3B/salon.jpeg')).then((url) => {

                                <Avatar className='rounded-lg overflow-hidden w-full h-full'>

                                </Avatar>
                            })
                        } */}
                </CardContent>
                <CardFooter className="flex h-fit flex-col">
                    <div className='flex flex-row justify-between w-full'>
                        <div className='flex flex-col mb-2 mr-3'>
                            <h1 className='font-semibold'>adress, adress</h1>
                        </div>
                        <div>
                            <h1 className='font-semibold'>{prix}DZ/m</h1>
                        </div>
                    </div>
                    <div className='w-full mb-2'>
                        <h1 className='w-full'>{promo}</h1>
                    </div>
                    <div className='flex flex-row justify-between items-center w-full'>
                        <div className='flex flex-row items-center'>
                            <BsFillGridFill />
                            <span>{surface} m</span>
                        </div>
                        <div className='flex flex-row items-center'>
                            <div className='flex flex-row mx-1 items-center'>
                                <MdSingleBed />
                                <span>{chmbr}</span>
                            </div>
                            <div className='flex flex-row mx-1 items-center'>
                                <BiBath />
                                <span>{sanit}</span>
                            </div>
                        </div>
                    </div>
                </CardFooter>
            </Card>
            </Link>
        </div>
    )
}
