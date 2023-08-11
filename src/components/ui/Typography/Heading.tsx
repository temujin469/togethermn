import { cn } from "@/lib/utils"

export function H1({children,className}:{children:React.ReactNode,className?:string}) {
  return (
    <h1 className={cn("scroll-m-20 text-4xl text-gray-700 font-extrabold tracking-tight lg:text-5xl",className)}>
      {children}
    </h1>
  )
}

export function H2({children,className}:{children:React.ReactNode,className?:string}) {
  return (
    <h2 className={cn("scroll-m-20 pb-2 text-2xl md:text-3xl text-gray-700 font-semibold tracking-tight transition-colors first:mt-0",className)}>
      {children}
    </h2>
  )
}

export function H3({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h3 className={cn("scroll-m-20 text-xl md:text-2xl text-gray-700 font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}

export function H4({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <h4 className={cn("scroll-m-20 text-lg md:text-xl text-gray-700 font-semibold tracking-tight", className)}>
      {children}
    </h4>
  )
}



