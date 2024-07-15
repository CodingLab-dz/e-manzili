import React from 'react'
import logo from "@/images/logo-white.webp"
import Image from 'next/image'
import { IoLogoFacebook, IoMail, IoLogoInstagram } from "react-icons/io5";
import Link from 'next/link';

export const Footer = () => {const
    destinationEmail = 'contact@e-manzili.com';
    return (
        <div className='w-full min-h-[200px] bg-[#003566]' id='contact'>
            <div className='w-full h-full max-w-7xl mx-auto flex flex-col items-center justify-center'>
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
            </div>
        </div>
    )
}
