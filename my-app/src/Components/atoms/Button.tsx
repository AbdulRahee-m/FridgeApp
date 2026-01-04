
function Button({type,className,children,onClick}: {type?: "button" | "submit" | "reset", className?:string, children?:React.ReactNode,onClick?:(arg0?:any)=>void}) {
  return (
    
    <button type={type}
            className={className}
            onClick={onClick}
          >
            {children}
    </button>
  )
}

export default Button