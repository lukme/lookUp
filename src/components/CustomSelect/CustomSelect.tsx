import React, { useState, useEffect } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaLuggageCart, FaRegCalendarAlt } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiConvergenceTarget } from 'react-icons/gi';
import ListItem from './ListItem';

interface Props {
    source: 'ORIGIN' | 'DEPARTURE' | 'DESTINATION' | 'PASSENGERS' | 'LUGGAGE',
}

const CustomSelect: React.FunctionComponent<Props> = (props: Props) => {
    const [submenuOpened, setSubmenuOpened] = useState<boolean>(false),
        [icon, setIcon] = useState<JSX.Element>(),
        [dataSelected, setDataSelected] = useState<string>(),
        lowerCaseSource = props.source.toLowerCase(),
        convertedSource = lowerCaseSource.charAt(0).toUpperCase() + lowerCaseSource.slice(1);


    const renderIcon = () => {
        const { source } = props;
        switch (source) {
            case 'ORIGIN':
                return setIcon(<AiOutlineHome className='select__icon' size={20} />)
            case 'DEPARTURE':
                return setIcon(<FaRegCalendarAlt className='select__icon' size={20} />)
            case 'DESTINATION':
                return setIcon(<GiConvergenceTarget className='select__icon' size={20} />)
            case 'PASSENGERS':
                return setIcon(<BsFillPersonFill className='select__icon' size={20} />)
            case 'LUGGAGE':
                return setIcon(<FaLuggageCart className='select__icon' size={20} />)
        }
    }

    useEffect(() => {
        !icon && renderIcon();
    })

    const renderSubmenu = () => {
        return (
            <ul className='submenu'>
                <div className="flexContainer">
                    {icon}
                    <p className='submenu__header'>{convertedSource}</p>
                </div>
                <ListItem data='Warsaw' handleClick={closeSubmenu} />
                <ListItem data='Lodz' handleClick={closeSubmenu} />
                <ListItem data='Cracov' handleClick={closeSubmenu} />
            </ul>
        )
    }

    const closeSubmenu = (dataSelected: string) => {
        setDataSelected(dataSelected);
    }

    return (
        <>
            <div className='select' onClick={() => setSubmenuOpened(!submenuOpened)}>
                <div className='select__button'>
                    {icon}
                    {convertedSource}
                </div>
                {submenuOpened ? renderSubmenu() : null}
            </div>
        </>
    )
}

export default CustomSelect;