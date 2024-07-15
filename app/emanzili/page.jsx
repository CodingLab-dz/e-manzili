'use client'

import React, {useEffect} from "react";
import Image from "next/image";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Button } from "@/components/ui/button";
import estim from "@/images/businessman.jpg"
import bienth from "@/images/living-room.webp"
import demenag from "@/images/moving-furniture.webp"
import maintenance from "@/images/man-electrical-technician.jpg"
import design from "@/images/designe.jpg"
import formation from "@/images/formation.jpg"
import Aos from 'aos'
import "aos/dist/aos.css"
export default function Emanzili() {
    
    useEffect(()=>{
        Aos.init()
    }, [])
    const content = [
        {
            title: "Biens haut standing",
            description: "E-manzili offre aux personnes issues des quatres coins du monde la possibilité d'acquérir un bien immobilier haut standing en Algérie",
            // (
            //     <div className="h-full flex flex-col">
            //         <p>E-manzili offre aux personnes issues des quatres coins du monde la possibilité d'acquérir un bien immobilier haut standing en Algérie</p>
            //         <Button className='w-fit my-6'>Detail</Button>
            //     </div>
            // ),
            content: (
                <div className="h-full w-full bg-center bg-cover" data-aos="fade-down" data-aos-duration="2000">
                    <Image src={bienth} alt='Biens haut standing' style={{ width: '100%', height: '100%' }} />
                </div>
            ),
        },
        {
            title: "Demenagement",
            description:
                "Notre service de déménagement offre une solution complète pour un déménagement en sécurité, de la planification à la livraison, en passant par l'emballage et le transport de vos biens.",
            content: (
                <div className="h-full w-full bg-center bg-cover" >
                    <Image src={demenag} alt='Biens haut standing' style={{ width: '100%', height: '100%' }}  loading="lazy"/>
                </div>
            ),
        },
        {
            title: "Estimation du bien",
            description:
                "Nous offerons une évaluation professionnelle et précise de la valeur de vos biens immobiliers, afin de vous permettre de prendre des décisions éclairées. Nous utilisons des méthodes de pointe pour garantir une estimation fiable et juste.",
            content: (
                <div className="h-full w-full bg-center bg-cover">
                    <Image src={estim} alt='Biens haut standing' style={{ width: '100%', height: '100%' }} />
                </div>
            ),
        },
        {
            title: "Maintenance",
            description:
                "Nous offrons une solution complète pour entretenir et protéger vos biens en garantissant leur bon fonctionnement. Nous assurons une maintenance régulière et réparation rapide en cas de besoin, pour vous permettre de vous concentrer sur votre activité principale.",
            content: (
                <div className="h-full w-full bg-center bg-cover">
                    <Image src={maintenance} alt='Biens haut standing' style={{ width: '100%', height: '100%' }} />
                </div>
            ),
        },
        {
            title: "Ameublement & Amenagement",
            description:
                "Notre service d'ameublement et d'aménagement vous offre des solutions élégantes et fonctionnelles pour transformer votre espace en un lieu de vie confortable et accueillant",
            content: (
                <div className="h-full w-full bg-center bg-cover">
                    <Image src={design} alt='Biens haut standing' style={{ width: '100%', height: '100%' }} />
                </div>
            ),
        },
        {
            title: "Servocis E-manzili",
            description:(
                <div>
                    <h1>Voici un aperçu des services que je propose spécifiquement pour le secteur de la vente immobilière :</h1>
                    <ul>
                        <li>-Audit et diagnostic organisationnel</li>
                        <li>-Développement de stratégies de vente et marketing immobilier</li>
                        <li>-Optimisation des processus de gestion des transactions</li>
                        <li>-Formation et développement des compétences des équipes de vente</li>
                        <li>-Analyse financière et gestion des revenus</li>
                        <li>-Stratégies CRM et amélioration de la relation client</li>
                        <li>-Conseil en technologie et utilisation des outils digitaux</li>
                        <li>-Accompagnement des dirigeants et coaching en management immobilier</li>
                    </ul>
                </div>
            ),
            content: (
                <div className="h-full w-full bg-center bg-cover">
                    <Image src={formation} alt='Biens haut standing' style={{ width: '100%', height: '100%' }} />
                </div>
            ),
        },
    ];

    return (
        <div className="pt-14 ">
            <StickyScroll content={content} />
        </div>
    );
}