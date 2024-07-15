import React from "react";
import bnnerabout from "@/images/House-banner.jpg"
import Image from "next/image";
import Link from 'next/link'
import { Button } from "@/components/ui/button";


export default function About() {
    const text= "qui sommes nous ? Premier réseau de promoteurs immobilier en Algérie , portail de l’immobilier en Algerie , Notre mission est d’offrir à chacun de nos utilisateurs , une expérience immobilière simple et efficace afin qu’ils concrétisent leurs projets d’achat, en toute sérénité. , nous mettons à dispositions des Algeriens le plus large choix d’annonces afin de leur faciliter la recherche d’un bien selon leurs critères propres , et répondre à toutes les questions soulevées par la réalisation d’un projet immobilier. Notre ambition est de proposer une expérience personnalisée adaptée aux besoins de chacun, afin que chaque vie soit plus simple. specialisé dans les bien neufs , le site propose plusieurs services comme le demenagement, la gestion de bien immobilier ou meme vous conseillez pour mener à bien un achat immobilier, une vente, et une veille sur l'actualité du secteur."
    return (
        <div className="w-full h-fit">

            <div className="m-auto w-full h-fit min-h-screen flex align-middle items-center max-w-7xl">
                <div className="w-full h-fit grid grid-cols-1 tablet:grid-cols-2 gap-6">
                    {/* img */}
                    <div className="h-[500px] rounded-xl bg-center bg-cover overflow-hidden">
                        <Image src={bnnerabout} alt='banner' style={{ width: '100%', height: '100%' }} />
                    </div>
                    {/* text */}
                    <div>
                        <h1 className="mb-3 text-[30px] font-bold">A propos de nous</h1>
                        <h2 className="mb-6 text[20px]">LE MEILLEUR CHOIX <br /> POUR VOUS</h2>
                        <p className="mb-6">{text}</p>
                        <Link href='/emanzili'>
                        <Button>Nos Services</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}