'use client'
import React from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import Link from 'next/link'

export default function Avatardrop({isconnectd, handelLogout, av}) {
    return (
        <div>
            <Popover>
                <PopoverButton className="border rounded-full">
                    <Avatar>
                        {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                        <AvatarFallback>{av}</AvatarFallback>
                    </Avatar>
                </PopoverButton>
                <PopoverPanel className="absolute flex flex-col top-[75px] border px-11 py-3 transform -translate-x-1/3 z-30 rounded-lg bg-[#F5F5F5]">
                    <Link href="/bienfavoris" className='my-3'>mes bien favoris</Link>
                    <Link href="/servicesfavoris" className='my-3'>mes services favoris</Link>
                    <div onClick={handelLogout}>
                        <Button >Deconnection</Button>
                    </div>
                </PopoverPanel>
            </Popover>
        </div>
    )
}
