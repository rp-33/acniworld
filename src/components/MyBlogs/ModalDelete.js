import React from 'react';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Loading from '../../presentation/Loading';
import PropTypes from 'prop-types';

const ModalDelete = ({open,handleClose,handleDelete,isLoading})=>{
    return(
        <Slide direction="up" in={open} mountOnEnter unmountOnExit>
            <div className="modal-delete">
                <div className="ctn">
                    {isLoading
                    ?
                        <Loading />
                    :
                    <div>
         			    <h2>Eliminar blog</h2>
         			    <p>¿Deseas eliminar este blog?</p>
         			    <div style={{textAlign:'right'}}>
         				    <Button color="secondary" onClick = {()=>handleClose(false)}>cancelar</Button>
         				    <Button color="primary" onClick = {()=>handleDelete()}>Aceptar</Button>
         			    </div>
                    </div>
                    }
        		</div> 
            </div>
        </Slide>

    )
}

ModalDelete.propTypes = {
    open : PropTypes.bool.isRequired,
    handleClose : PropTypes.func.isRequired,
    handleDelete : PropTypes.func.isRequired,
    isLoading : PropTypes.bool.isRequired
}

export default ModalDelete