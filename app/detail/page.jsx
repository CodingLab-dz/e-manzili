'use client'
import React, { useState, useEffect, Suspense } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from 'embla-carousel-autoplay'
// import Image from "next/image";
// import { useSearchParams, Suspense } from "next/router";
// import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
// import { BsFillGridFill } from "react-icons/bs";
// import { MdSingleBed } from "react-icons/md";
// import { BiBath } from "react-icons/bi";
// import { FaLocationDot } from "react-icons/fa6";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { onAuthStateChanged } from "firebase/auth"
// import { auth, db } from "../firebase/config";
// import { useRouter } from "next/navigation";
// import { doc, getDoc, updateDoc } from "firebase/firestore";
// import { states } from "@/data/data";
import Details from "@/components/details";
import { Audio } from "react-loader-spinner";
import { useSearchParams } from "next/navigation";
export default function Detail() {

    
    const searchParams = useSearchParams()
    const docD = JSON.parse(searchParams.get('select'))
    


    // function read(){
    //     const searchParams = useSearchParams()
    //     const doc = JSON.parse(searchParams.get('select'))
    //     return doc
    // }


    // const [ismobile, setIsmobile] = useState(false)
    // const [userid, setUserid] = useState()
    // const [bienfavv, setBienfav] = useState()
    // const [exist, setExist] = useState(false)
    // //  const doc = JSON.parse(routerd.get('select'))
    // const router = useRouter()
    // const [docD2, setDocD2] = useState()
    // const [searchParams] = useSearchParams()
    // // const docD = read()
    // const docD = JSON.parse(searchParams.get('select'))
    // // JSON.parse(sessionStorage.getItem('selected'))
    // // JSON.parse(sessionStorage.getItem('id'))
    // const [page, setPage] = useState(0);
    // const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 10000 })])


    // useEffect(() => {
    //     setDocD2(states.find(item => item.id === docD.id))
    // }, [])
    // useEffect(() => {
    //     let int = setInterval(() => {
    //         setPage(prev => ((prev + 1) > (docD.img.length - 1) ? 0 : prev + 1));
    //     }, 3000);
    //     return () => clearInterval(int)
    // })
    // useEffect(() => {
    //     onAuthStateChanged(auth, async (user) => {
    //         if (!user) {
    //             router.push('/')
    //         }
    //         else {
    //             const docRef = doc(db, "users", user.uid);
    //             const docSnap = await getDoc(docRef);
    //             if (docSnap.exists()) {
    //                 setUserid(user.uid)
    //                 setBienfav(docSnap.data())
    //                 const list = docSnap.data().bienfav
    //                 if (list.includes(docD.id)) {
    //                     setExist(true)
    //                 } else {
    //                     setExist(false)
    //                 }
    //             }
    //         }
    //     })
    // })
    // const handelAddfav = async () => {
    //     const list = bienfavv.bienfav
    //     const finallist = [...list, docD.id]
    //     console.log(finallist)
    //     const washingtonRef = doc(db, "users", userid);
    //     await updateDoc(washingtonRef, {
    //         bienfav: finallist
    //     })
    // }
    // const handelSupp = async () => {
    //     const list = bienfavv.bienfav
    //     const index = list.indexOf(docD.id);
    //     if (index !== -1) {
    //         const flist = list.filter(item => item !== docD.id);
    //         console.log(flist)
    //         const washingtonRef = doc(db, "users", userid);
    //         await updateDoc(washingtonRef, {
    //             bienfav: flist
    //         })
    //     }
    // }
    return (
        <Suspense>
            <Details docD={docD}/>
        </Suspense>
            
    );
}