'use client'

import React, { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { BsFillGridFill } from "react-icons/bs";
import { MdSingleBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PiSecurityCameraFill, PiTreeFill, PiTruckFill, PiElevatorFill, PiPaintRollerFill } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { GiVacuumCleaner } from "react-icons/gi";
import { MdMail } from "react-icons/md";
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams } from "next/navigation";

export default function Detailsservices() {


    // function read(){
    //     const searchParams = useSearchParams()
    //     const doc = JSON.parse(searchParams.get('select'))
    //     return doc
    // }






    const [ismobile, setIsmobile] = useState(false)
    const router = useRouter()
    // const doc = JSON.parse(routerd.get('select'))
     const searchParams = useSearchParams()
    // const docD = read()
    const docD = JSON.parse(searchParams.get('select'))
    // JSON.parse(sessionStorage.getItem('selected'))
    const [page, setPage] = useState(0);
    const [userid, setUserid] = useState()
    const [bienfavv, setBienfav] = useState()
    const [exist, setExist] = useState(false)
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 10000 })])
    const [icon, setIcon] = useState(docD.type == "jardinage" ? <PiTreeFill /> : docD.type == "décoration" ? <PiPaintRollerFill /> : docD.type === "nettoyage" ? <GiVacuumCleaner /> : docD.type == "ascenseur" ? <PiElevatorFill /> : docD.type == "climatiseur" ? <TbAirConditioning /> : docD.type == "déménagement" ? <PiTreeFill /> : <PiSecurityCameraFill />)

    const { toast } = useToast()


    

    useEffect(() => {
        let int = setInterval(() => {
            setPage(prev => ((prev + 1) > 2 ? 0 : prev + 1));
        }, 3000);
        return () => clearInterval(int)
    })

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push('/')
            }
            else {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserid(user.uid)
                    setBienfav(docSnap.data())
                    const list = docSnap.data().servfav
                    if (list.includes(docD.id)) {
                        setExist(true)
                    } else {
                        setExist(false)
                    }
                }
            }
        })
    })
    const handelAddfav = async () => {
        const list = bienfavv.servfav
        const finallist = [...list, docD.id]
        console.log(finallist)
        const washingtonRef = doc(db, "users", userid);
        await updateDoc(washingtonRef, {
            servfav: finallist
        })
    }
    const handelSupp = async () => {
        const list = bienfavv.servfav
        const index = list.indexOf(docD.id);
        if (index !== -1) {
            const flist = list.filter(item => item !== docD.id);
            console.log(flist)
            const washingtonRef = doc(db, "users", userid);
            await updateDoc(washingtonRef, {
                servfav: flist
            })
        }
    }
    return (
            <div className="w-full h-fit px-3 lg:px-0">
                <div className="mt-[80px] m-auto w-full h-fit max-w-7xl rounded-xl overflow-hidden border">
                    <div className='h-[400px] tablet:h-[600px] w-full rounded-lg  overflow-hidden'>
                        <div className="w-full h-[70%]">
                            <div className='w-full h-full bg-center bg-cover relative'>
                                <Avatar className='rounded-none overflow-hidden w-full h-full transition-all'>
                                    <AvatarImage alt='image' src={docD.img[page].img} style={{ width: "100%", height: "100%" }} />
                                </Avatar>
                                <div className={ismobile ? 'bg-gradient-to-t from-[#050505cc] to-[#0505050d] absolute w-fit h-fit flex justify-center bottom-0 py-1 px-2 items-end text-white' : 'bg-gradient-to-t from-[#050505cc] to-[#0505050d] bottom-0 py-1 px-2 absolute w-fit h-fit text-white'}>
                                    <div className='flex flex-col'>
                                        <h1 className={ismobile ? 'text-[40px] font-extrabold' : 'text-[60px] font-extrabold'}>{docD.img[page].alt}</h1>

                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-2 my-2">
                                {
                                    docD.img.map((img, k) => (
                                        <div key={k} className="bg-cover bg-center h-[200px]" onClick={() => setPage(k)}>
                                            <Avatar className='rounded-none overflow-hidden w-full h-full'>
                                                <AvatarImage alt='image' src={img.img} style={{ width: "100%", height: "100%" }} loading='lazy' />
                                            </Avatar>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        {/*<div className="embla re" ref={emblaRef}>
                        <div className="embla__container">
                            {
                                docD.img.map((un, k) => (
                                    <div key={k} className='embla__slide border'>
                                        <div className='w-full h-[500px] bg-center bg-cover'>
                                            <Avatar className='rounded-lg overflow-hidden w-full h-full'>
                                                <AvatarImage alt='image' src={un.url} style={{ width: "100%", height: "100%" }} className='rounded-lg' loading='lazy' />
                                            </Avatar>
                                            <div className={ismobile ? 'bg-gradient-to-t from-[#050505cc] to-[#0505050d] absolute bottom-0 w-full h-full flex justify-center px-24 items-end text-white pb-28' : 'bg-gradient-to-t from-[#050505cc] to-[#0505050d] absolute bottom-0 w-full h-full flex justify-center px-24 items-end text-white pb-20'}>
                                                <div className='flex flex-col'>
                                                    <h1 className={ismobile ? 'text-[40px] font-extrabold text-right w-[250px]' : 'text-[60px] font-extrabold text-right w-[500px]'}>{docD.img[page].alt} {k}</h1>
                                                  
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        </div>*/}
                    </div>
                </div>
                <div className="m-auto my-12 w-full max-w-7xl h-fit">
                    <div className="w-full h-full grid grid-cols-1 gap-4 tablet:grid-cols-3">
                        <div className="col-span-2 grid-rows-3 gap-6">
                            <div className="w-full text-[40px] font-bold">
                                <h1>{docD.nom}</h1>
                            </div>
                            <div className="w-full text-[20px]">
                                <samp className="flex justify-start items-center"><FaLocationDot /> <h2 className="mx-3"> {docD.adress}</h2></samp>

                            </div>
                            <div className="w-full pt-8">
                                <p>{docD.disc}</p>
                            </div>
                        </div>

                        <div className="order-1 lg:order-last">
                            <Card className='ps-6'>
                                <CardHeader>
                                    <h1></h1>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-rows-2 gap-4">
                                        <div className="w-full flex flex-row justify-around items-center rounded-lg font-bold">
                                            <div className="h-full w-fit flex justify-center items-center">
                                                <Avatar>
                                                    <AvatarImage src={docD.logo.img} alt="@shadcn" />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                            </div>
                                            <div className="h-fit w-fit flex justify-center items-center  border border-blue-950 text-blue-950 rounded-full px-6 py-2 cursor-default">
                                                <span className="mx-2">{icon}</span> {docD.type}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-col justify-around items-start px-3">
                                            <div className="w-fit h-full flex flex-row items-center my-2">
                                                <FaPhone />
                                                <h1 className="mx-2">{docD.tel}</h1>
                                            </div>
                                            <div className="w-fit h-full flex flex-row items-center">
                                                <MdMail />
                                                <h1 className="mx-2">{docD.mail}</h1>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter >
                                    {
                                        !exist ? <div className='py-3' onClick={handelAddfav}
                                        >
                                            <Button>Ajouter au favauris</Button>
                                        </div> : <div className="py-3" onClick={handelSupp}>
                                            <Button>supprimer des favauris</Button>
                                        </div>
                                    }
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
    );
}
