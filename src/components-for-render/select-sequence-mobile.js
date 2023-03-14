import MUSIC_CONST from "../instrument-scale-calculations/musical-constants";
import DropDownOption from "./dropdown";

function SelectSequenceTypeMobile({onSequenceTypeChange, currentSequenceType}) {
    const sequences = Object.getOwnPropertyNames(MUSIC_CONST).slice(2);
    const sequenceTypeOptions = sequences.map((sequenceName, index) => {
        return <DropDownOption 
            optionName={sequenceName} 
            handleClickArguments={[sequenceName]} 
            key={"sequence" + sequenceName + index}/>
    }
    )
    return (
            <select 
                
                onChange={e => onSequenceTypeChange(e.target.value, Object.getOwnPropertyNames(MUSIC_CONST[e.target.value])[0])}
                name="sequence-type-dropdown"
                className="dropdown"
                defaultValue={currentSequenceType}>
                {sequenceTypeOptions}
            </select>
    );
}

export default SelectSequenceTypeMobile;