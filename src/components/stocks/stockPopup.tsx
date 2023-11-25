import './stocktable.css';
import { ReactNode } from 'react';

export default function StockPopUp(props: {trigger: boolean, closeModal:(value: boolean) => void, children: ReactNode | null}){
    return (props.trigger) ? (
        <div className='stock-popup-overlay'>
            <div className="stock-popup-inner">
                <div className='stock-popup-header'>
                    <button className='close-btn' onClick={() => props.closeModal(false)}>close</button>
                </div>
                {props.children}
            </div>
        </div>
    ) : null
}