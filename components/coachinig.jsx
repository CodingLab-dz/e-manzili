'use clients'

import React from 'react'
import Image from "next/image";
import agent from '../images/agent2.png'
import building from '../images/building.png'
import about from '../images/formation.jpg'
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ServiceForm from "./serviceform";
import { Button } from "./ui/button";
import Link from 'next/link';


export default function Coaching() {
    const h1 = "Et si vendre devenait un Jeu d'enfant !"
    const apropos = "E-manzili est une société spécialisée en stratégie de vente, organisation et management dans le secteur immobilier. Nous accompagnons les entreprises en les aidant à définir et à mettre en œuvre des stratégies commerciales personnalisées, basées sur une analyse précise du marché. Nos services incluent des formations en leadership, gestion d'équipe, et techniques avancées de vente et de négociation immobilière. Nous optimisons également les processus de vente et de recouvrement pour maximiser l'efficacité de vos équipes. E-manzili propose des solutions innovantes en stratégie marketing immobilier, avec des plans sur mesure, des photographies professionnelles et des visites virtuelles. Notre objectif : vous accompagner dans le développement de votre activité et maximiser votre succès immobilier."
    const bannertext = "Chez e-manzili, nous offrons des services de consultation spécialisés en organisation, management et stratégie de vente immobilière. Notre expertise aide nos clients à optimiser leurs processus, à améliorer leur gestion et à maximiser les résultats de leurs ventes immobilières."
    const imane = " Consultante en stratégie de vente | Consultante en organisation et management | Chef de projet en commercialisation et services immobiliers en ligne Forte de plusieurs années d'expérience dans le marketing et l'immobilier, je me spécialise dans l'accompagnement des entreprises pour optimiser leur stratégie de vente et leur organisation. En tant que consultante, j'aide mes clients à créer des approches commerciales efficaces, adaptées aux besoins du marché actuel. Je combine mon expertise en management pour structurer des équipes performantes et en gestion de projets immobiliers en ligne pour dynamiser la commercialisation de biens. Mon objectif est d'aider mes clients à réussir grâce à des solutions stratégiques et innovantes. Je vous propose des formations et du coaching pour booster vos projets et atteindre vos objectifs."
    const services = [
        { id: 1, img: "Consultation", title: 'Étude et analyse du marché immobilier', description: "Je réalise des études approfondies des tendances du marché immobilier local et régional, vous permettant de mieux comprendre les dynamiques du secteur. J'évalue également les prix de vente de propriétés similaires en fonction de leur positionnement, pour vous fournir une analyse précise et stratégique afin de maximiser vos opportunités de vente." },
        { id: 2, img: "Management", title: "Coaching/Formation", description: "Je propose des formations sur le leadership et la gestion d'équipes immobilières, afin de renforcer vos compétences managériales. Vous apprendrez des techniques avancées de vente et de négociation immobilière, ainsi que des stratégies de communication pour mieux interagir avec vos clients. Je vous aide également à optimiser les processus de vente et de recouvrement pour améliorer l'efficacité de votre équipe." },
        { id: 3, img: "Stratégie de vente", title: "Stratégie marketing personnalisée", description: "Je vous accompagne dans la création de plans de marketing sur mesure pour promouvoir vos biens immobiliers de manière efficace et impactante. Cela inclut l'utilisation de photographies professionnelles, de visites virtuelles immersives et la conception de supports de vente adaptés à vos besoins, pour maximiser la visibilité et l'attractivité de vos offres." },
        { id: 3, img: "Evaluation", title: "Évaluation et positionnement", description: "Je réalise une évaluation précise de vos biens immobiliers pour définir un prix de vente attractif et compétitif, en tenant compte des spécificités du marché et de la concurrence. Mon objectif est de vous garantir un positionnement optimal, afin de vendre rapidement et au meilleur prix." },
    ]
    return (
        <div className="w-full px-3 tablet:px-0 ">
            <div className='m-auto w-full h-fit tablet:h-[500px] max-w-7xl bg-center bg-cover rounded-xl overflow-hidden relative mb-12 mt-[75px]'>
                <div className="w-full h-fit flex flex-col items-center justify-center">
                    {/* banner */}
                    <div className="flex flex-col tablet:flex-row">
                        <div className="w-full tablet:w-[50%] pt-14 mb-[60px]">
                            <h1 className="font-bold my-6 text-[30px] text-yellow-00 text-yellow-500">{h1}</h1>
                            <p>
                                {bannertext}
                            </p>
                            <Link href='#contact'>
                                <Button className='mt-6'>Contacter</Button>
                            </Link>
                        </div>
                        <div className="w-full tablet:w-[50%] ">
                            <Image src={building} alt='banner' style={{ width: '100%', height: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* service */}
            <div className="w-full h-fit mt-[80px] mintablet:mt-[40px]">
                <div className="w-full max-w-7xl m-auto h-fit tablet:h-[550px] pt-6">
                    <div className="w-fit h-fit mx-auto mt-12">
                        <h1 className="font-bold text-[32px] text-yellow-500 mb-6">Nos Formations</h1>
                    </div>
                    <div className="m-auto w-fit h-fit grid laptop:grid-cols-4 gap-6 grid-cols-1  mintablet:grid-cols-2 pt-6">
                        {
                            services.map((stt, k) => (
                                <ServiceForm key={k} img={stt.img} title={stt.title} discption={stt.description} />
                            ))
                        }
                    </div>
                </div>
            </div>
            {/* section test1 */}
            <div className='w-full h-fit mx-auto min-h-[700px]  text-white bg-blue-950 flex items-center'>
                <div className=" flex h-fit w-full max-w-7xl mx-auto flex-col-reverse tablet:flex-row justify-between ">
                    {/* image */}
                    <div className="w-full h-full target:w-[50%] pt-6 my-3   ">
                        <Image src={about} alt='banner' className="mx-auto" style={{ width: '100%', height: '100%' }} />
                    </div>
                    {/* text */}
                    <div className="w-full target:w-[50%]  ">
                        {/* <h1 className="font-bold mb-6 text-[30px]">ABID IMANE</h1> */}
                        <h1 className='font-bold text-[32px] mx-6 mt-6 text-yellow-500'>A propos</h1>
                        <p className="px-6 pt-6">
                            {apropos}
                        </p>
                    </div>
                </div>
            </div>

            {/* section  */}
            <div className="w-full max-w-7xl m-auto h-fit min-h-[700px] pb-6 mb-12 mt-[60px] mintablet:mt-[40px] flex items-center">
                
                <div className="flex flex-col mt-[60px] mb-[30px] tablet:flex-row justify-between">
                    {/* text */}
                    <div className="w-full target:w-[50%] pt-6 ">
                        <h1 className="font-bold mb-6 text-[30px] ml-12 text-yellow-500">ABID IMANE</h1>
                        <p className="px-6">
                            {imane}
                        </p>
                    </div>
                    {/* image */}
                    <div className="w-full h-full target:w-[50%] pt-6 mt-3 tablet:mt-0 relative">
                        {/* Gradient overlay wrapper */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#F5F5F5] to-transparent" style={{ height: '40%' }} />

                        {/* Image */}
                        <Image src={agent} alt='banner' className="mx-auto" style={{ width: '400px', height: '400px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}