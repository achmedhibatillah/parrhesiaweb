import { ReactNode } from "react"

type InputErrorProps = {
    children?: ReactNode
}

export default function InputError({ children }: InputErrorProps) {
    if (!children) return null

    return (
        <p className="text-red-400 text-xs mt-1 flex items-center">
            <i className="fas fa-exclamation-circle me-1 text-[10px] mb-0.5"></i>    
            {children}
        </p>
    )
}