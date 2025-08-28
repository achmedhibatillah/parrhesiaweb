import Navbar from "@/templates/navbar"

export default function AppLayout({ children, page }) {
    return (
        <div className="w-[100%] md:px-0 overflow-x-hidden overflow-y-scroll">
            <Navbar page={page} className={'z-1'} />
            <div className="z-0">
                { children }
            </div>
        </div>
    )
}