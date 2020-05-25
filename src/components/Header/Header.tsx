import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import { GiAirplane } from 'react-icons/gi';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FaDoorOpen } from 'react-icons/fa';

interface Props {
    setGlobalLoginState: () => void,
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
    const [airplaneClassName, setAirplaneClassName] = useState<string>('header__icon'),
        [headerBoxOpened, setHeaderBoxOpened] = useState<boolean>(false),
        [headerClassName, setHeaderClassName] = useState<string>('header__loginBtn box--closed')

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

    useEffect(() => {
        handleHeaderClass();
    }, [headerBoxOpened])

    const handleHeaderClass = () => {
        headerBoxOpened
            ? setHeaderClassName('header__loginBtn box--opened')
            : setHeaderClassName('header__loginBtn box--closed')
    }

    return (
        <>
            <div className='header'>
                <Logo />
                <button
                    className={headerClassName}
                    onMouseOver={() => handleAirplaneClass('mouseOver')}
                    onMouseOut={() => handleAirplaneClass('mouseOut')}
                    onClick={() => setHeaderBoxOpened(!headerBoxOpened)}
                >
                    Login
                <GiAirplane
                        color='#fff'
                        size={20}
                        className={airplaneClassName}
                    />
                </button>
            </div>
            <ReactCSSTransitionGroup
                transitionName='slide'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
            >
                {headerBoxOpened && (
                    <div className="login-box">
                        <div className="login-box__content">
                            <div className="flex-container">
                                <FaDoorOpen size={50} color='#fff' />
                                <h2 className="login-box__header">
                                    Login
                                </h2>
                            </div>
                            <input className='login-box__input' type="text" placeholder='Username' />
                            <input className='login-box__input' type="password" placeholder='Password' />
                            <button className="button login-box__button">
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </ReactCSSTransitionGroup>
        </>
    )
}

export default Header;