import React, { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { FaLuggageCart, FaRegCalendarAlt } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiConvergenceTarget } from 'react-icons/gi';

interface Props {
    source: 'ORIGIN' | 'DEPARTURE' | 'DESTINATION' | 'PASSENGERS' | 'LUGGAGE',
}

const CustomSelect: React.FunctionComponent<Props> = (props: Props) => {
    const lowerCaseSource = props.source.toLowerCase(),
        convertedSource = lowerCaseSource.charAt(0).toUpperCase() + lowerCaseSource.slice(1);

    const renderIcon = () => {
        const { source } = props;
        switch (source) {
            case 'ORIGIN':
                return <AiOutlineHome className='select__icon' size={20} />
            case 'DEPARTURE':
                return <FaRegCalendarAlt className='select__icon' size={20} />
            case 'DESTINATION':
                return <GiConvergenceTarget className='select__icon' size={20} />
            case 'PASSENGERS':
                return <BsFillPersonFill className='select__icon' size={20} />
            case 'LUGGAGE':
                return <FaLuggageCart className='select__icon' size={20} />
        }
    }

    return (
        <div className='select'>
            <div className='select__button'>
                {renderIcon()}
                {convertedSource}
            </div>
        </div>
    )
}

export default CustomSelect;