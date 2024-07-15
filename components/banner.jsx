'use client'
import React, { useState, useEffect} from 'react'
import Image from 'next/image'
import banner from '@/images/banner.webp'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from './ui/select'
import { Label } from '@headlessui/react'
import { states } from '@/data/data'
import Cards from './cards'
import Pagination from './ui/pagination'
import Aos from 'aos'
import "aos/dist/aos.css"
export default function Banner() {
    const nbrchmbr = [{ value: "1", Label: "1" }, { value: "2", Label: "2" }, { value: "3", Label: "3" }]
    const types = [{ value: "appartement", label: "Appartement" }, { value: "villa", label: "Villa" }, { value: "duplex", label: "Duplex" }]
    const etat = [{ value: "achevé", label: "Achevé" }, { value: "inachevé", label: "InAchevé" }]


    const [chmbr, setChmbr] = useState("all")
    const [prjct, setPrjct] = useState("all")
    const [ett, setEtt] = useState("all")
    const [fchmbr, setFChmbr] = useState("all")
    const [fprjct, setFPrjct] = useState("all")
    const [fett, setFEtt] = useState("all")

    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(8);
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const nPages = Math.ceil(states.length / recordsPerPage)
    const currentRecords = states.slice(indexOfFirstRecord, indexOfLastRecord);

    useEffect(()=>{
        Aos.init()
    }, [])
    const hadlchbrenbr = (value) => {
        setChmbr(value)
    }
    const hadlprjct = (value) => {
        setPrjct(value)
    }
    const hadletat = (value) => {
        setEtt(value)
    }
    const buttonhandler = () => {
        setFChmbr(chmbr)
        setFPrjct(prjct)
        setFEtt(ett)
    }

    return (
        <div className='w-full min-h-[500px] h-fit mt-[100px] px-3 xl:px-0'>
            <div className='m-auto w-full h-[500px] max-w-7xl bg-center bg-cover rounded-xl overflow-hidden relative mb-7 ' data-aos="fade-up" data-aos-duration="3000">
                <Image src={banner} alt='banner' style={{ width: '100%', height: '100%' }} />
                <div className='w-full h-full absolute bottom-0 left-0 flex flex-col justify-end items-center bg-gradient-to-t from-[#050505cc] to-[#0505050d] z-10 py-6'>
                    <h1 className='text-white w-[800px] font-bold text-[25px] mintablet:text-[40px] mx-auto my-6 px-6 tablet:px-0'>Trouvez la maison <br className='mintablet:hidden'/> de vos rêves <br /> avec facilité sur e-manzili.</h1>
                    <div className='w-fit h-fit tablet:h-[100px] bg-white my-3 rounded-xl flex flex-col tablet:flex-row justify-center items-center py-4 px-2'>
                        <Select className='mx-3' onValueChange={hadlchbrenbr}>
                            <SelectTrigger className="w-[200px] mx-2 my-3 tablet:mx-3 tablet:my-0">
                                <SelectValue placeholder="le N° des chabres " />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Nembre des chambre</SelectLabel>
                                    <SelectItem value="all">Tous</SelectItem>
                                    {
                                        nbrchmbr.map((nbr, k) => (
                                            <SelectItem key={k} value={nbr.value}>{nbr.Label}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select className='mx-3' onValueChange={hadlprjct}>
                            <SelectTrigger className="w-[200px] mx-2 my-3 tablet:mx-3 tablet:my-0">
                                <SelectValue placeholder="Types du Bien" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Types du Bien</SelectLabel>
                                    <SelectItem value="all">Tous</SelectItem>
                                    {
                                        types.map((nbr, k) => (
                                            <SelectItem key={k} value={nbr.value}>{nbr.label}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Select className='mx-3' onValueChange={hadletat}>
                            <SelectTrigger className="w-[200px] mx-2 my-3 tablet:mx-3 tablet:my-0">
                                <SelectValue placeholder="Etat des projets " />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Etat</SelectLabel>
                                    <SelectItem value="all">Tous</SelectItem>
                                    {
                                        etat.map((nbr, k) => (
                                            <SelectItem key={k} value={nbr.value}>{nbr.label}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button onClick={buttonhandler} className='mx-3'>Recherche</Button>
                    </div>
                </div>
            </div>
            <div className='m-auto w-full max-w-7xl h-fit px-3 xl:px-0'>
                <div className='m-auto w-fit h-fit grid laptop:grid-cols-4 gap-6 grid-cols-1  mintablet:grid-cols-2 '>
                    {
                        currentRecords && currentRecords.filter((crnt) => {
                            //const chmbrCondition = chmbr === "all" || item.chmbr === chmbr;
                            //const prjctCondition = prjct === "all" || item.prjct === prjct;
                            //const ettCondition = ett === "all" || item.ett === ett;
                            if ((fchmbr === "all" || crnt.chambre === fchmbr) && (fprjct === "all" || crnt.type === fprjct) && (fett === "all" || crnt.etat === fett)) {
                                return crnt
                            }
                        }).map((stt, k) => (
                            <Cards key={k} id={stt.id} chmbr={stt.chambre} img={stt.images} sanit={stt.saniter} surface={stt.superficie} prix={stt.prix} promo={stt.projet} disc={stt.discriptionB} entreprise={stt.entreprise} etat={stt.etat}/>
                        ))
                    }
                </div>
                <div className='m-fit h-fit my-6 flex justify-center items-center'>
                    <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </div>
    )
} 
