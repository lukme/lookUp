import React, { useState, useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaLuggageCart, FaRegCalendarAlt } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiConvergenceTarget } from 'react-icons/gi';
import Submenu from './Submenu';
import { Passengers } from '../MainPage/MainPage';

interface Props {
    source: 'ORIGIN' | 'DEPARTURE' | 'DESTINATION' | 'PASSENGERS' | 'LUGGAGE',
    passData: (arg0: SingleData) => void,
}

export interface SingleData {
    convertedSource: string,
    dataSelected: string | Passengers,
}

export const CustomSelect: React.FunctionComponent<Props> = (props: Props) => {
    const [submenuOpened, setSubmenuOpened] = useState<boolean>(false),
        [icon, setIcon] = useState<JSX.Element>(),
        [options, setOptions] = useState<string[]>(),
        [dataSelected, setDataSelected] = useState<string | Passengers>(),
        lowerCaseSource = props.source.toLowerCase(),
        convertedSource = lowerCaseSource.charAt(0).toUpperCase() + lowerCaseSource.slice(1);

    const renderIcon = () => {
        const { source } = props;
        switch (source) {
            case 'ORIGIN':
                setOptions(['Lodz'])
                return setIcon(<AiOutlineHome className='select__icon' size={20} />)
            case 'DEPARTURE':
                setOptions([])
                return setIcon(<FaRegCalendarAlt className='select__icon' size={20} />)
            case 'DESTINATION':
                setOptions(['Cracov', 'Vienna', 'Boston'])
                return setIcon(<GiConvergenceTarget className='select__icon' size={20} />)
            case 'PASSENGERS':
                setOptions([])
                return setIcon(<BsFillPersonFill className='select__icon' size={20} />)
            case 'LUGGAGE':
                setOptions(['Carry-on', 'Carry-on & trolley'])
                return setIcon(<FaLuggageCart className='select__icon' size={20} />)
            default: setOptions([]);
        }
    }

    useEffect(() => {
        !icon && renderIcon();
        formatDate()
    })

    const renderSubmenu = () => {
        return (
            <Submenu
                icon={icon}
                convertedSource={convertedSource}
                handleClick={closeSubmenu}
                submenuOptions={options}
            />
        )
    }

    const closeSubmenu = (dataSelected: string | Passengers) => {
        setDataSelected(dataSelected);
        setSubmenuOpened(false);
        props.passData({
            convertedSource,
            dataSelected,
        });
    }

    const renderValue = () => {
        if (typeof dataSelected === 'object') {
            return dataSelected
                ? (parseInt(dataSelected.adults) + parseInt(dataSelected.children) + parseInt(dataSelected.babies))
                : convertedSource
        }
        return !dataSelected ? convertedSource : dataSelected
    }

    const formatDate = () => {
        const today = new Date().toISOString().split("T")[0],
            yearFromNow = parseInt(today.substring(0,4)) + 1,
            maxDate = (`${yearFromNow}-${today.substring(5)}`);
        return maxDate;
    }

    return (
        props.source === 'DEPARTURE'
            ? (
                <div className="select--spacing">
                    <input
                        type="date"
                        name="departure"
                        id="departure"
                        className='select__button select__date'
                        max={formatDate()}
                        onChange={(event) => closeSubmenu(event.target.value)}
                    />
                </div>
            )
            : (
                <div className='select--spacing'>
                    <div
                        className='select'
                    >
                        <div
                            className='select__button'
                            onClick={() => setSubmenuOpened(!submenuOpened)}
                        >
                            {icon}
                            {renderValue()}
                        </div>
                        {submenuOpened ? renderSubmenu() : null}
                    </div>
                </div>
            )
    )
}