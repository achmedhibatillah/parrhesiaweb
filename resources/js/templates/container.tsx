export default function Container({ children, className }) {
    return (
        <div className={`flex justify-center ${ className }`}>
            <div className="container px-0 md:px-3">
                {children}
            </div>
        </div>
    )
}