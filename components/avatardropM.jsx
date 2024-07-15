'use client'
import React, { useState } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import Link from 'next/link'

export default function AvatardropM({ isconnectd, handelLogout, av }) {
    const [isopen, setIsopen] = useState(false)
    return (
        <div>
            {/* <Popover>
                <PopoverButton className="border rounded-full">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </PopoverButton>
                <PopoverPanel className="absolute flex flex-col top-[170px] border px-11 py-3 transform  z-30 rounded-lg bg-[#F5F5F5]">
                    <Link href="" className='my-3'>link1</Link>
                    <Link href="" className='my-3'>link2</Link>
                    <div onClick={handelLogout}>
                        <Button >Deconnection</Button>
                    </div>
                </PopoverPanel>
            </Popover> */}
            <div className='w-fit h-fit'>
                <div onClick={()=>setIsopen(!isopen)}>
                    <Avatar>
                        {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                        <AvatarFallback>{av}</AvatarFallback>
                    </Avatar>
                </div>
                <div className={isopen ? 'flex flex-col pl-6 h-fit transition-all' : "h-0 overflow-hidden transition-all"}>
                <Link href="/bienfavoris" className='my-3'>mes bien favoris</Link>
                <Link href="/servicesfavoris" className='my-3'>mes services favoris</Link>
                    <div onClick={handelLogout}>
                        <Button >Deconnection</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
