import { ReactNode } from "react"

type InputSuccessProps = {
    children?: ReactNode
}

export default function InputSuccess({ children }: InputSuccessProps) {
    if (!children) return null

    return (
        <p className="text-green-500 text-xs mt-1 flex items-center">
            <i className="fas fa-check-circle me-1 text-[10px] mb-0.5"></i>    
            {children}
        </p>
    )
}