import React from "react";

export default function Home({
    children
}:{
    children: React.ReactNode
}){
    return(
        <div>
            {children}
        </div>
    )
}