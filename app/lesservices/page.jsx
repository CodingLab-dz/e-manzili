'use client'
import React, { useState, useEffect} from "react";
import { Button } from "@/components/ui/button";
import { PiSecurityCameraFill, PiTreeFill, PiTruckFill, PiElevatorFill, PiPaintRollerFill } from "react-icons/pi";
import { TbAirConditioning } from "react-icons/tb";
import { GiVacuumCleaner } from "react-icons/gi";
import Image from "next/image";
import servbanner from '@/images/servbanner.webp'
import Pagination from "@/components/ui/pagination";
import CardsS from "@/components/cardsS";
import { services } from "@/data/data";
import Aos from 'aos'
import "aos/dist/aos.css"

export default function Lesservices() {
    const [filter, setFilter] = useState("all")
    const [fixed, setFixed] = useState(false)
    useEffect(()=>{
        Aos.init()
    }, [])
    function handelfixed() {
        if (window.scrollY >= 500) {
            setFixed(true)
        } else {
            setFixed(false)
        }
    }
    window.addEventListener("scroll", handelfixed)
    
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(12);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const nPages = Math.ceil(services.length / recordsPerPage)
    const currentRecords = services.slice(indexOfFirstRecord, indexOfLastRecord);
    return (
        <div className="w-full px-3 xl:px-0" data-aos="fade-up" data-aos-duration="3000">
            <div className='m-auto w-full h-[500px] max-w-7xl bg-center bg-cover rounded-xl overflow-hidden relative mb-7 mt-[75px]'>
                <Image src={servbanner} alt='banner' style={{ width: '100%', height: '100%' }} />
                <div className='w-full h-full absolute bottom-0 left-0 flex flex-col justify-center items-center bg-gradient-to-t from-[#050505cc] to-[#0505050d] z-10 py-6'>
                    <h1 className='text-white w-[800px] font-bold text-[25px] mintablet:text-[40px] mx-auto mintablet:mx-0  my-6 px-6 tablet:px-0'>Trouvez les meilleurs <br className='mintablet:hidden'/> prestataires de services <br className='mintablet:hidden'/> en un clic avec e-manzili!</h1>
                </div>
            </div>


            <div className={fixed ? "w-full h-fit fixed z-20 top-[70px] bg-[#f5f5f5b3]" : "w-full h-fit"} data-aos="fade-up" data-aos-duration="3500">
                <div className="h-fit w-full  max-w-7xl min-w-7xl m-auto flex  overflow-y-auto justify-between items-center py-3">
                    <Button onClick={() => setFilter("all")} className={filter === "all" ? 'rounded-full bg-yellow-500 text-blue-950 border border-blue-950 hover:bg-yellow-500 hover:-translate-y-1 transition-all mx-1 lg:mx-0' : 'rounded-full hover:-translate-y-1 transition-all mx-1 lg:mx-0'}>All</Button>
                    <Button onClick={() => setFilter("securité")} className={filter === "securité" ? 'rounded-full bg-yellow-500 text-blue-950 border border-blue-950 hover:bg-yellow-500 hover:-translate-y-1 transition-all mx-1 lg:mx-0' : 'rounded-full hover:-translate-y-1 transition-all mx-1 lg:mx-0'}><PiSecurityCameraFill /> <span className="ml-3">Securité</span></Button>
                    <Button onClick={() => setFilter("jardinage")} className={filter === "jardinage" ? 'rounded-full bg-yellow-500 text-blue-950 border border-blue-950 hover:bg-yellow-500 hover:-translate-y-1 transition-all mx-1 lg:mx-0' : 'rounded-full hover:-translate-y-1 transition-all mx-1 lg:mx-0'}><PiTreeFill /> <span className="ml-3">Jardinage</span></Button>
                    <Button onClick={() => setFilter("déménagement")} className={filter === "déménagement" ? 'rounded-full bg-yellow-500 text-blue-950 border border-blue-950 hover:bg-yellow-500 hover:-translate-y-1 transition-all mx-1 lg:mx-0' : 'rounded-full hover:-translate-y-1 transition-all mx-1 lg:mx-0'}><PiTruckFill /> <span className="ml-3">Déménagement</span></Button>
                    <Button onClick={() => setFilter("climatiseur")} className={filter === "climatiseur" ? 'rounded-full bg-yellow-500 text-blue-950 border border-blue-950 hover:bg-yellow-500 hover:-translate-y-1 transition-all mx-1 lg:mx-0' : 'rounded-full hover:-translate-y-1 transition-all mx-1 lg:mx-0'}><TbAirConditioning /> <span className="ml-3">Maintenance Climatiseur</span></Button>
                    <Button onClick={() => setFilter("ascenseur")} className={filter === "ascenseur" ? 'rounded-full bg-yellow-500 text-blue-950 border border-blue-950 hover:bg-yellow-500 hover:-translate-y-1 transition-all mx-1 lg:mx-0' : 'rounded-full hover:-translate-y-1 transition-all mx-1 lg:mx-0'}><PiElevatorFill /> <span className="ml-3">Maintenance Ascenseur</span></Button>
                    <Button onClick={() => setFilter("nettoyage")} className={filter === "nettoyage" ? 'rounded-full bg-yellow-500 text-blue-950 border border-blue-950 hover:bg-yellow-500 hover:-translate-y-1 transition-all mx-1 lg:mx-0' : 'rounded-full hover:-translate-y-1 transition-all mx-1 lg:mx-0'}><GiVacuumCleaner /> <span className="ml-3">Nettoyage</span></Button>
                    <Button onClick={() => setFilter("décoration")} className={filter === "décoration" ? 'rounded-full bg-yellow-500 text-blue-950 border border-blue-950 hover:bg-yellow-500 hover:-translate-y-1 transition-all mx-1 lg:mx-0' : 'rounded-full hover:-translate-y-1 transition-all mx-1 lg:mx-0'}><PiPaintRollerFill /> <span className="ml-3">Décoration</span></Button>
                </div>
            </div>


            <div className='m-auto w-full max-w-7xl h-fit mt-6'>
                <div className='m-auto w-fit h-fit grid laptop:grid-cols-4 gap-6 grid-cols-1  mintablet:grid-cols-2 tablet:grid-cols-3'>
                    {
                        currentRecords && currentRecords.filter((crnt) => {
                            //const chmbrCondition = chmbr === "all" || item.chmbr === chmbr;
                            //const prjctCondition = prjct === "all" || item.prjct === prjct;
                            //const ettCondition = ett === "all" || item.ett === ett;
                            if (filter === "all") {
                                return crnt
                            }else if (filter === crnt.type) {
                                return crnt
                            }
                        }).map((stt, k) => (
                            <CardsS key={k} id={stt.id} nom={stt.nom} adres={stt.adress} disc={stt.disc} img={stt.images} mail={stt.mail} tel={stt.tel} type={stt.type} logo={stt.logo}/>
                        ))
                    }
                </div>
                <div className='m-fit h-fit my-6 flex justify-center items-center'>
                    <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>


        </div>
    );
}