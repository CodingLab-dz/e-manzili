'use client'
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardDescription, CardTitle, CardFooter } from './ui/card'
import { IoIosArrowDown, IoIosPeople, IoIosHome, IoIosAnalytics} from "react-icons/io";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import { GiTeacher } from "react-icons/gi";
import { FaClipboardCheck } from "react-icons/fa";
import { LiaSearchDollarSolid } from "react-icons/lia";





export default function ServiceForm({ img, title, discption }) {
    const [dtl, setStl] = useState(false)

    // Map titles to icons
    const iconMapping = {
        "Consultation": <FaClipboardCheck className=" text-blue-950 mx-auto text-3xl" />, // Example icon for Consultation
        "Management": <GiTeacher className=" text-blue-950 mx-auto text-3xl" />, // Example icon for Management
        "Stratégie de vente": <TbDeviceDesktopAnalytics className=" text-blue-950 mx-auto text-3xl" /> ,
        "Evaluation": <LiaSearchDollarSolid className=" text-blue-950 mx-auto text-3xl" />// Example icon for Stratégie de vente
    };


    return (
        <div>
            <Card className="h-fit min-h-[160px] w-[300px] shadow-lg transition-all hover:-translate-y-2 min-w-[300px] bg-transparent hover:border-yellow-500" >
                <CardHeader>
                    <CardTitle className='py-5'>
                        {/* Icon for the service */}
                        <div className="mr-2">
                            {iconMapping[img]} 
                        </div>
                    </CardTitle>
                    <div className='flex flex-row justify-between w-full cursor-pointer' onClick={() => setStl(!dtl)}>
                        <CardTitle>{title}</CardTitle>
                        <div className='h-fit w-fit'>
                            <IoIosArrowDown className={dtl ? 'rotate-180 transition-all' : 'transition-all'} />
                        </div>
                    </div>
                </CardHeader>
                <CardContent className={dtl ? 'block transition-all' : 'hidden transition-all'}>
                    <CardDescription>{discption}</CardDescription>
                </CardContent>
            </Card>
        </div>
    )
}