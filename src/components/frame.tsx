import { ReactNode } from "react"

export default function Frame(props: {children: ReactNode, title: string}){
  
    return (
        <div className="bg-light container px-0 border border-dark border-3 m-2">
            <h3 className="text-white text-start border-bottom border-dark border-2 ps-3 py-1" style={{backgroundColor: '#0E3386'}}>{props.title}</h3>
            <div className="m-3">
                {props.children}
            </div>
        </div>
    )
}