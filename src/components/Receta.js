import React, {useContext, useState} from 'react';
import {ModalContext} from '../context/ModalContext';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

function getModalStyle() {
    const top = 50 ;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 500,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      overflow: 'scroll',
      height: '100%',
      display: 'block'
    },
}));

const Receta = ({receta}) => {

    //configuracion del modal de Material UI 
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();
    
    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    //Extraer los valores del context
    const {informacion, guardarIdReceta, guardarReceta} = useContext(ModalContext);
    
    //Muestra y formatea los ingredientes 
    const mostrarIngredientes = informacion => {
        let ingredientes = [];
        for (let i = 0; i < 16; i++){
            if( informacion[`strIngredient${i}`] ){
                ingredientes.push(
                    <li>{informacion[`strIngredient${i}`]} {informacion[`strMeasure${i}`]}</li>
                )
            }
        }
        return ingredientes;
    }

    return ( 
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img className="card-img-top" src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`}/>
                <div className="card-body">
                    <button 
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            guardarIdReceta(receta.idDrink);
                            handleOpen();

                        }}
                    >
                        Ver Receta
                    </button>
                    
                    <Modal
                        open={open}
                        onClose={() =>{
                            handleClose();
                            guardarReceta({});
                            guardarIdReceta(null);
                        }}

                        
                    >
                        <div style={modalStyle} className={classes.paper}>
                            <h2>{informacion.strDrink}</h2>
                            <h3 className="mt-4">Instrucciones</h3>
                            <p>{informacion.strInstructions}</p>
                            <img className="img-fluid my-4" src={informacion.strDrinkThumb} alt={informacion.strDrink}/>
                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {mostrarIngredientes(informacion)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
     );
}
 
export default Receta;