'use client'

import React, { useEffect, useState, Suspense} from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth, db } from "../firebase/config";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { states } from "@/data/data";
import Cards from "@/components/cards";
import Link from "next/link";


export default function Bientfavoris() {
    const [favlist, setFavlist] = useState([])
    const [userid, setUserid] = useState()


    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (!user) {
                router.push('/')
            }
            else {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const list = docSnap.data().bienfav
                    setFavlist(states.filter(item => list.includes(item.id)))
                }
            }
        })
    })
    return (
        <div className="w-full h-fit min-h-screen px-3 lg:px-0">
            <div className="mt-[80px] m-auto w-full h-fit max-w-7xl flex flex-col">
                <div className="w-full text-center my-10">
                    <h1 className="mb-3 text-[30px] font-bold">Mes biens Favoris</h1>
                </div>
                {
                    (favlist.length > 0) ? <div className="w-full h-fit grid laptop:grid-cols-4 gap-6 grid-cols-1  mintablet:grid-cols-2 ">
                        {
                            favlist && favlist.map((stt, k) => (
                                <Cards key={k} id={stt.id} chmbr={stt.chambre} img={stt.images} sanit={stt.saniter} surface={stt.superficie} prix={stt.prix} promo={stt.projet} disc={stt.discriptionB} entreprise={stt.entreprise} etat={stt.etat} />
                            ))
                        }
                    </div> : <div className="w-full text-center">
                        <h2>votre list des favoris est vide</h2>
                    </div>
                }
                <div className="w-full text-center my-3">
                <Link href="/" className="underline underline-offset-2">
                    <h3>voire les biens</h3>
                </Link>
                </div>
            </div>
        </div>
    )
}