import React from 'react'
import logo from "@/images/logo-white.webp"
import Image from 'next/image'
import { IoLogoFacebook, IoMail, IoLogoInstagram } from "react-icons/io5";
import { PiPhoneFill } from "react-icons/pi";
import Link from 'next/link';

export const Footer = () => {
    const destinationEmail = 'contact@e-manzili.com';
    const links = [
        { label: "Acceuil", link: "/" },
        { label: "Les Biens", link: "/lesbiens" },
        { label: "les services", link: "/lesservices" },
        { label: "A propos", link: "/about" },
        { label: "E-manzili", link: "/emanzili" },
        { label: "Contact", link: "#contact" }
    ]
    return (
        <div className='w-full min-h-[200px] bg-[#003566]' id='contact'>
            {/* <div className='w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center'>
                <div className='h-[150px] overflow-hidden'>
                    <Image src={logo} height={200} width={150} alt='logo' />
                </div>
                <div className='text-white flex flex-row'>
                    <IoLogoFacebook className='mx-3 text-[30px]' />
                    <IoLogoInstagram className='mx-3 text-[30px]' />
                    <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${destinationEmail}`}>
                        <IoMail className='mx-3 text-[30px]' />
                    </Link>
                </div>
            </div> */}
            <div className='w-full h-full max-w-7xl mx-auto flex px-6'>
                <div className='className="m-auto w-fit h-fit grid laptop:grid-cols-3 gap-6 grid-cols-1  mintablet:grid-cols-2 pt-6'>
                    {/* logo */}
                    <div>
                        <div className='h-[80px] overflow-hidden'>
                            <Image src={logo} height={150} width={100} alt='logo' />
                        </div>
                        <div>
                            <p className='text-white text-[10px]'>
                                Chez e-manzili, nous offrons des services de consultation spécialisés en organisation, management et stratégie de vente immobilière. Notre expertise aide nos clients à optimiser leurs processus, à améliorer leur gestion et à maximiser les résultats de leurs ventes immobilières.
                            </p>
                        </div>
                    </div>
                    {/* contact */}
                    <div className='text-white flex flex-col justify-center'>
                        {/* <IoLogoFacebook className='mx-3 text-[30px]' />
                        <IoLogoInstagram className='mx-3 text-[30px]' /> */}
                        <div className='flex flex-row'>
                            <PiPhoneFill className='mr-3 text-[20px]' />
                            <span>+33 6 00 00 00 00</span>
                        </div>
                        <Link href={`https://mail.google.com/mail/?view=cm&fs=1&to=${destinationEmail}`} className='flex flex-row'>
                            <IoMail className='mr-3 text-[20px]' />
                            <span>contact@e-manzili.com</span>
                        </Link>
                    </div>
                    {/* links */}
                    <div className='text-white my-6 text-[15px] flex flex-col justify-center'>
                        {links.map((link, k) => (
                            <Link key={k} href={link.link} className='flex flex-row'>
                                <span>{link.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
