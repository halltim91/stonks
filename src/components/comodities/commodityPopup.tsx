import React from 'react'
import { ReactNode } from "react"
import './commodityPopup.css'


function CommodityPopup(props:{children:ReactNode, trigger:boolean, closeModal:(value: boolean) => void}) {
  return (props.trigger)?(
    <div className='popup-inner'>
        <button className='close-btn' onClick={() => props.closeModal(false)}>close</button>
        {props.children}        
    </div>
  ):null;
  
}

export default CommodityPopup