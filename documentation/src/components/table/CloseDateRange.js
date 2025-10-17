import Btn from '../../elements/buttons/Btn';

const CloseDateRange = ({ setDate, setIsComponentVisible }) => {
    return (
        <div className='calender-btn-group'>
            <Btn className='calender-button' onClick={() => { setDate([{ startDate: '', endDate: '', key: 'selection' }]); setIsComponentVisible(false) }} title="clear" />
            <Btn className='close-button' onClick={() => setIsComponentVisible(false)} title="close"/>
        </div>
    )
}

export default CloseDateRange