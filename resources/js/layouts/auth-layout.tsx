import Navbar from "@/templates/navbar"
import Container from "@/templates/container"

export default function AuthLayout({ children, page, className }) {
    return (
        <div className={`w-[100%] md:px-0 bg-[url('/storage/img/website/bg-login.svg')] bg-center bg-no-repeat bg-cover pb-40 ${className}`}>
            <div className="z-0">
                <Container>
                    <div className="grid lg:grid-cols-3 min-h-[100vh]">
                        <div className="lg:col-span-2 flex justify-center lg:justify-start pt-50 lg:pt-70">
                            <div className="">
                                <h1 className="text-5xl md:text-7xl xl:text-8xl text-yellow-200 font-extrabold text-shadow-md/20">parrhesia<i className="not-italic text-blue-100">.com</i></h1>
                                <h1 className="text-[15.7px] md:text-[24px] xl:text-[31.5px] ms-4 lg:ms-8 text-white font-extrabold text-shadow-md/20 -mt-2">Sistem Informasi Laboratorium Parrhesia</h1>
                            </div>
                        </div>
                        <div className="lg:col-span-1 flex justify-center items-start pt-3 lg:pt-50">
                            <div className="border border-gray-300 p-4 rounded-xl w-[100%] md:w-[75%] lg:w-[100%] shadow-lg bg-white/90 backdrop-blur-md py-15">
                            { children }
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}