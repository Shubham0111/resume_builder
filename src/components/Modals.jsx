import React, { useState }  from "react";
import './Modals.css'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
function PopUp(props){
    const [popup,setPop]=useState(false)
    const handleClickOpen=()=>{
        setPop(!popup)
    }
    const closePopup=()=>{
        setPop(false)
    }
    return(
        <div>
            
            <div>
            <button onClick={handleClickOpen}  style={{background:'none',
                border: 'none'}}><InfoOutlinedIcon fontSize="small"/></button>
                {
                    popup?
                    <div className="main" style={{width:'100vw'}}>
                        <div className="popup">
                            <div className="popup-header">
                                <h1>{props.name}</h1>
                                <h1 onClick={closePopup}>X</h1>
                            </div>
                            <div>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices metus congue, porta diam vitae, convallis arcu. Curabitur nec orci purus. Cras placerat enim ut arcu interdum laoreet. Sed viverra semper massa, consequat sagittis tortor scelerisque at. Proin porta vestibulum quam eget molestie. Phasellus eu aliquam lectus. Etiam eu vehicula orci, quis vulputate enim. Duis et ultrices justo, eu tempor lectus. Pellentesque convallis eros a sem scelerisque vestibulum.</p>
                            </div>
                        </div>
                    </div>:""
                }
            </div>
        </div>
    )
}
export default PopUp;