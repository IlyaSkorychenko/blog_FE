import {useState} from "react";

export default function Dropdown (props) {
    const [listState, setListState] = useState(false);
    const dropdownToggle = () => {
        const newState = !listState;
        setListState(newState);
    }

    return(
        <div onClick={dropdownToggle}
                    className={`dropdown h-100 ${listState ? 'show': ''}`
                    }>
            <button className="btn btn-secondary dropdown-toggle">
                {props.text}
            </button>
            <div style={{right: '0'}}
                 className={`dropdown-menu px-2 ${listState ? 'show': ''}`}>
                {props.children}
            </div>
        </div>
    )
}