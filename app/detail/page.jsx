'use client'
import React, { useState, useEffect, Suspense } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay'
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { BsFillGridFill } from "react-icons/bs";
import { MdSingleBed } from "react-icons/md";
import { BiBath } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase/config";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { states } from "@/data/data";
export default function Detail() {
    const [ismobile, setIsmobile] = useState(false)
    const [userid, setUserid] = useState()
    const [bienfavv, setBienfav] = useState()
    const [exist, setExist] = useState(false)
    //  const doc = JSON.parse(routerd.get('select'))
    const router = useRouter()
    const [docD2, setDocD2] = useState()
    const searchParams = useSearchParams()
    const docD = JSON.parse(searchParams.get('select'))
    // JSON.parse(sessionStorage.getItem('id'))
    const [page, setPage] = useState(0);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 10000 })])
    useEffect(() => {
        setDocD2(states.find(item => item.id === docD.id))
    }, [])
    useEffect(() => {
        let int = setInterval(() => {
            setPage(prev => ((prev + 1) > (docD.img.length - 1) ? 0 : prev + 1));
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
                    const list = docSnap.data().bienfav
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
        const list = bienfavv.bienfav
        const finallist = [...list, docD.id]
        console.log(finallist)
        const washingtonRef = doc(db, "users", userid);
        await updateDoc(washingtonRef, {
            bienfav: finallist
        })
    }
    const handelSupp = async () => {
        const list = bienfavv.bienfav
        const index = list.indexOf(docD.id);
        if (index !== -1) {
            const flist = list.filter(item => item !== docD.id);
            console.log(flist)
            const washingtonRef = doc(db, "users", userid);
            await updateDoc(washingtonRef, {
                bienfav: flist
            })
        }
    }
    return (
        <Suspense>
            <div className="w-full h-fit px-3 lg:px-0">
                <div className="mt-[80px] m-auto w-full h-fit max-w-7xl rounded-xl overflow-hidden border">
                    <div className='h-[400px] tablet:h-[600px] w-full rounded-lg  overflow-hidden'>
                        <div className="w-full h-[70%]">
                            <div className='w-full h-full bg-center bg-cover relative'>
                                <Avatar className='rounded-none overflow-hidden w-full h-full transition-all'>
                                    <AvatarImage alt='image' src={docD.img[page].url} style={{ width: "100%", height: "100%" }} />
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
                                                <AvatarImage alt='image' src={img.url} style={{ width: "100%", height: "100%" }} loading='lazy' />
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
                        <div className="col-span-2 flex flex-col">
                            <div className="col-span-2 grid-rows-3 gap-6">
                                <div className="w-full text-[40px] font-bold">
                                    <h1>{docD.promo}</h1>
                                </div>
                                <div className="w-full text-[20px]">
                                    <spam className="flex justify-start items-center"><FaLocationDot /> <h2 className="mx-3"> aezrzre</h2></spam>

                                </div>
                                <div className="w-full pt-8">
                                    <div dangerouslySetInnerHTML={{ __html: docD.disc }} />
                                </div>
                            </div>
                            <div className="flex flex-row my-3">
                                <Avatar className='h-[70px] w-[70px]'>
                                    <AvatarImage src={docD.entreprise.logo} alt="logo" />
                                </Avatar>
                                <div className="flex flex-row ml-3">
                                    <div className="flex flex-col mr-6">
                                        <h1>{docD.entreprise.nom}</h1>
                                        <div className="flex flex-row items-center my-3">
                                            <FaLocationDot />
                                            <h2>{docD.entreprise.adresse}</h2>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            (docD.entreprise.phone).map((ph, k) => (
                                                <h1 key={k}>{ph}</h1>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-last">
                            <Card className='ps-6'>
                                <CardHeader>
                                    <h1><span className="font-bold">Propotion: </span>{docD.entreprise.nom}</h1>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-rows-2 gap-4">
                                        <div className="bg-gray-200 w-full flex flex-row justify-around items-center rounded-lg font-bold">
                                            <div className="h-full w-fit flex justify-center items-center">
                                                <MdSingleBed />{docD.chmbr}
                                            </div>
                                            <div className="h-full w-fit flex justify-center items-center">
                                                <BiBath />{docD.sanit}
                                            </div>
                                            <div className="h-full w-fit flex justify-center items-center">
                                                <BsFillGridFill />{docD.surface}
                                            </div>
                                        </div>
                                        <div className="w-full flex flex-row justify-around items-center ">
                                            <div className="w-fit h-full flex flex-col">
                                                <h1>Etat</h1>
                                                <h1 className="font-bold">{docD.etat}</h1>
                                            </div>
                                            <div className="w-fit h-full flex flex-col">
                                                <h1>prix</h1>
                                                <h1 className="font-bold">{docD.prix} DZ/m</h1>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter>
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
        </Suspense>
    );
}