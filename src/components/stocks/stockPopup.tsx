import './stocktable.css';

export default function StockPopUp(props: {symbol: string, trigger: boolean, closeModal:(value: boolean) => void}){
    return (props.trigger) ? (
        <div className='stock-popup-overlay'>
            <div className="stock-popup-inner">
                <div className='stock-popup-header'>
                    <button className='close-btn' onClick={() => props.closeModal(false)}>close</button>
                </div>
            </div>
        </div>
    ) : null
}