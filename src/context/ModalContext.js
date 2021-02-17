import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';


//crear el context
export const ModalContext = createContext();

const ModalProvider = (props) => {
    
    //state del provider
    const [idreceta, guardarIdReceta] = useState(null);

    const [receta, guardarReceta] = useState({});

    //una vez que ya tenemos seleccionada la receta volver a hacer el llamado a la api para sacar su info
    useEffect (() => {
        const obtenerReceta = async () => {
            if(!idreceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idreceta}`;
            const resultado = await axios.get(url);
            guardarReceta(resultado.data.drinks[0]);
        }
        obtenerReceta();
    }, [idreceta])

    return ( 
        <ModalContext.Provider
            value={{
                guardarIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
     );
}
 
export default ModalProvider;



