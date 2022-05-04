import Link from 'next/link'
import React from "react";
import {useRouter} from "next/router";

function Navbar() {
    const router = useRouter()

    return (
        <nav className="px-2 sm:px-4 py-4">
            <div className="container flex flex-wrap justify-between items-center mx-auto">

                <Link href="/" className="flex">
                    <p className="self-center text-3xl whitespace-nowrap cursor-pointer">File<span className="font-bold text-red-400">Crate</span></p>
                </Link>

                <div className={router.pathname.endsWith('/terms-of-use') ? 'hidden' : 'inline-flex'}>
                    <a href={`${process.env.clientUrl}/terms-of-use`}>
                        <button className='max-w-sm bg-white border border-black text-black font-semibold py-2 px-4 inline-flex justify-center items-center drop-shadow hover:drop-shadow-none hover:bg-gray-50 hover:border-gray-300'>
                            <span>View our Terms of Use</span>
                        </button>
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
