import { ReactNode, FC } from 'react';


const Menu:FC<{children: ReactNode}>=({children})=>{
    //content
    return(
        <section className="Content">
            {children}
        </section>
    )
}

export default Menu;