import React, { useState, useEffect } from "react"

import Container from "@/templates/container"
import Sidebar from "@/templates/sidebar"
import Button from "@/components/button"

function IconHide({ hideSidebar, index }) {
    let shift = 'translate-x-0'
    if (index === 1) {
        shift = 'translate-x-2'
    } else if (index === 2) {
        shift = 'translate-x-1'
    }
    return (
        <span className={`h-[2px] w-4 block rounded-full transition-all duration-300 mb-1 ${(!hideSidebar) && shift} ${(hideSidebar) ? 'bg-white' : 'bg-yellow-200'}`} />
    )
}

export default function PortalLayout({ userdata, pagenow, children }) {

    const [hideSidebar, setHideSidebar] = useState(false)

    useEffect(() => {
      if (window.innerWidth < 640) {
        setHideSidebar(true)
      }
    }, [])
  
    const handleSidebar = () => setHideSidebar(!hideSidebar)
    
    console.log(hideSidebar)

    return (
        <div>
            <div className="bg-amber-900 fixed w-[100%]">
                <Container>
                    <div className="flex items-center">
                        <div className="px-3">
                            <button className="cursor-pointer py-2 w-7" onClick={handleSidebar}>
                                <IconHide hideSidebar={hideSidebar} index={1} />
                                <IconHide hideSidebar={hideSidebar} index={2} />
                                <IconHide hideSidebar={hideSidebar} index={3} />
                            </button>
                        </div>
                        <p className={`${!hideSidebar ? 'text-yellow-200' : 'text-white'}`}>Parrhesia Colective Academy</p>
                    </div>
                </Container>
            </div>
            <Container className="pt-10">
                <div className="flex w-full overflow-hidden">
                    
                    {/* Sidebar kiri */}
                    <div className="fixed md:static">
                        <div className={`transition-all duration-300 ease-in-out ${hideSidebar ? 'w-0' : 'w-[158%] -mt-1 -ms-3 md:ms-0 md:mt-0 md:w-60'} h-[100vh] md:h-auto bg-amber-50 md:bg-white overflow-hidden`}>
                            <div className="sticky top-0 flex flex-col justify-between pt-1">
                                <Sidebar userdata={userdata} pagenow={pagenow} />
                                <div className="mt-2 flex items-center gap-1 px-3">
                                <p className="text-sm">©</p>
                                <p className="text-xs leading-3 whitespace-nowrap overflow-hidden text-ellipsis">2025 | Sistem Informasi<br/>Laboratorium Parrhesia</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Konten utama */}
                    <div className="flex-1 transition-all duration-300 ease-in-out -mt-10 px-3 shadow-sm shadow-gray-400 pt-11 pb-3 overflow-auto  max-h-[100vh]">
                        <div className="">
                        {   children}
                        </div>
                    </div>

                    {/* Sidebar kanan / Identitas */}
                    <div className="xl:w-1/6 hidden xl:block">
                        <div className="sticky top-0 ps-2">
                            <div className="bg-linear-to-br from-white to-amber-100 shadow rounded-xl overflow-hidden">
                                <div className={`flex justify-center items-center mb-4 ${
                                userdata.bg === null ?
                                    'bg-gray-200'
                                :
                                    'bg-[url("/storage/img/")]'
                                }`}>
                                    <div className="rounded-full overflow-hidden flex justify-center items-center h-20 w-20 translate-y-6 bg-amber-200 shadow">
                                        {userdata.pp === null ?
                                            <i className="fas fa-user text-3xl text-white"></i>
                                        :
                                            <img src="/usr" alt="" />
                                        }
                                    </div>
                                </div>
                                <div className="p-3 pt-7">
                                    <div className="text-center">
                                        <p className="break-all leading-3.5 text-violet-800 font-bold text-lg">{userdata.username}</p>
                                        <p className="break-all mt-1">{userdata.fullname}</p>
                                    </div>
                                    <div className="mt-3 flex justify-center">
                                        <Button tag="a" className="bg-amber-400 hover:bg-amber-500 text-white" link="/profil">Profil saya</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-amber-50 shadow rounded-xl overflow-hidden mt-3 p-3">
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col justify-center text-center">
                                        <p className="font-bold text-xl text-gray-700">5</p>
                                        <p className="text-gray-400">Publikasi</p>
                                    </div>
                                    <div className="flex flex-col justify-center text-center">
                                        <p className="font-bold text-xl text-gray-700">10 rb</p>
                                        <p className="text-gray-400">Apresiasi</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}