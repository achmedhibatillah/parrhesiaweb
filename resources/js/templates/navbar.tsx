import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import Container from "./container"
import Button from "@/components/build/button"

export default function Navbar({ page, className }) {
    const menu = [
        {
            title: 'Utama',
            page: 'home',
            icon: 'home',
            url: '/'
        },
        {
            title: 'Artikel',
            page: 'artikel',
            icon: 'pencil-alt',
            url: 'artikel'
        },
        {
            title: 'Berita',
            page: 'berita',
            icon: 'newspaper',
            url: 'berita'
        },
        {
            title: 'Riset',
            page: 'riset',
            icon: 'atom',
            url: 'riset'
        },
        {
            title: 'Layanan',
            page: 'layanan',
            icon: 'tag',
            url: 'layanan'
        },
        {
            title: 'Laporan',
            page: 'laporan',
            icon: 'exclamation',
            url: 'laporan'
        },
        {
            title: 'Survei',
            page: 'survei',
            icon: 'poll',
            url: 'survei'
        },
        {
            title: 'Kemitraan',
            page: 'kemitraan',
            icon: 'handshake',
            url: 'kemitraan'
        },
        {
            title: 'Tentang Kami',
            page: 'tentang-kami',
            icon: 'info',
            url: 'tentang-kami'
        },
        {
            title: 'Organisasi',
            page: 'organisasi',
            icon: 'network-wired',
            url: 'organisasi'
        },
        {
            title: 'Kurikulum',
            page: 'kurikulum',
            icon: 'book',
            url: 'kurikulum'
        },
        {
            title: 'Rekrutmen',
            page: 'rekrutmen',
            icon: 'user-plus',
            url: 'rekrutmen'
        },
    ]
    
    const [showMenu, setShowMenu] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
            setShowMenu(false) // Scroll ke bawah → sembunyikan
            } else {
            setShowMenu(true) // Scroll ke atas → tampilkan
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    const [open, setOpen] = useState(false)
    const navbarRef = useRef(null)

    const toggleMenu = () => setOpen(!open)

    useEffect(() => {
    function handleClickOutside(event) {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setOpen(false)
        }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
        document.removeEventListener('mousedown', handleClickOutside)
    }
    }, [navbarRef])

    return (
        <div className={className} ref={navbarRef}>
            <div className="text-dark bg-[rgba(255,255,255,0.95)] py-3 shadow-md fixed w-[100%]">
                <Container className={'w-[99%]'}>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7">
                        <div className="col-span-1 md:col-span-1 lg:col-span-1 xl:col-span-1 relative flex">
                            <div className="flex gap-2 px-4 py-3 items-center text-light bg-gradient-to-br from-blue-900 to-yellow-200 rounded-m border-5 border-light shadow-md">
                                <img src="assets/i/logo/no-bg.png" className="w-[30px]" />
                                <div className="leading-[0.5] mt-[-5px]">
                                    <p className="text-xl font-[900]">Parrhesia</p>
                                    <p className="text-[9.3px]">Collective Academy</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 md:col-span-3 lg:col-span-4 xl:col-span-6 flex relative justify-end items-center">
                            <div className='overflow-hidden ps-1.5'>
                                <AnimatePresence>
                                    {showMenu && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                                            className=""
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, y: -20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                transition={{ duration: 0.3 }}
                                                className="grid grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-1"
                                            >
                                                {menu.map(item => (
                                                    <a
                                                        key={item.page}
                                                        href={item.url}
                                                        className="hidden lg:flex items-end gap-2 md:2-[180px] xl:w-[190px] h-[30px] bg-gradient-to-tr from-blue-700 to-yellow-200 hover:bg-gradient-to-tl hover:from-blue-700 hover:to-blue-700 transition-colors rounded-full relative"
                                                    >
                                                        <div className="bg-light inset-shadow-sm inset-shadow-indigo-300/80 h-[30px] w-[30px] -ms-1.5 rounded-full flex justify-center items-center">
                                                            <i className={`text-[14px] text-yellow-300 fas fa-${item.icon}`}></i>
                                                        </div>
                                                        <p className="m-0 md:text-[10px] lg:text-[14px] text-light font-bold mb-1">{item.title}</p>
                                                        <i className={`fas fa-circle absolute right-1 top-[7px] shadow-2xl ${page === item.page ? 'text-green-300' : 'text-light'}`}></i>
                                                    </a>
                                                ))}
                                            </motion.div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="ms-3 bg-amber-200">
                                <a href="login" className="bg-blue-600 hover:bg-blue-500 transition-colors text-light border-5 border-light flex flex-col items-center rounded-xl p-2 pt-3">
                                    <i className="fas fa-lock"></i>
                                    <p className="text-[10px]">Login</p>
                                </a>
                            </div>
                            <div className="flex justify-center items-center ms-3">
                                <div className={`hover:bg-blue-500 transition-colors ${open ? "shadow-md/20 bg-blue-700" : "bg-blue-600"} text-light rounded-full flex justify-center items-center h-10 w-10 cursor-pointer lg:hidden`} onClick={toggleMenu}>
                                    <i className={`fas fa-angle-down transition-transform duration-300 ${open ? "rotate-180 mb-0.5" : "rotate-0"}`}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="menu-sm" className={`lg:hidden overflow-hidden transition-all duration-900 ease-in-out ${open ? 'opacity-100 max-h-[100vh]' : 'opacity-0 max-h-0'}`}>
                        <div className="mt-5">
                            {menu.map(item => (
                                <a key={item.page} href={item.url} className="flex items-end gap-2 w-[98%] h-[45px] bg-gradient-to-br from-blue-700 to-yellow-300 hover:bg-gradient-to-tl hover:from-passion hover:to-passion transition-colors rounded-full relative mb-2 ms-1.5 shadow">
                                    <div className="bg-light inset-shadow-sm inset-shadow-indigo-300/80 h-[45px] w-[45px] -ms-1.5 rounded-full flex justify-center items-center">
                                        <i className={`text-[14px] text-yellow-300 fas fa-${item.icon}`}></i>
                                    </div>
                                    <p className="m-0 text-light font-bold mb-3">{item.title}</p>
                                    <i className={`fas fa-circle absolute right-2 top-[15px] ${page === item.page ? 'text-green-400' : 'text-light'}`}></i>
                                </a>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}


