import React, { useState } from 'react';
import Logo from '../Logo/Logo';
import { GiAirplane } from 'react-icons/gi';

const Header = () => {
    const [airplaneClassName, setAirplaneClassName] = useState<string>('header__icon');

    const handleAirplaneClass = (state: string) => {
        switch (state) {
            case 'mouseOver':
                setAirplaneClassName('header__icon header__icon--center')
                break;
            case 'mouseOut':
                setAirplaneClassName('header__icon header__icon--right')
                break;
        }
    }

    return (
        <div className='header'>
            <Logo />
            <button
                className='header__loginBtn'
                onMouseOver={() => handleAirplaneClass('mouseOver')}
                onMouseOut={() => handleAirplaneClass('mouseOut')}
            >
                Login
                <GiAirplane
                    color='#fff'
                    size={20}
                    className={airplaneClassName}
                />
            </button>
        </div>
    )
}

export default Header;