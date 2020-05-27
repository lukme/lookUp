import React, { useState, useEffect } from 'react';
import Logo from '../Logo/Logo';
import { GiAirplane } from 'react-icons/gi';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FaDoorOpen } from 'react-icons/fa';
import { ToastWrapper, toastProps } from '../Toast.tsx/Toast';
import { toast } from 'react-toastify';


interface Props {
    setGlobalLoginState: (arg0: boolean) => void,
}

const Header: React.FunctionComponent<Props> = (props: Props) => {
    const [airplaneClassName, setAirplaneClassName] = useState<string>('header__icon'),
        [headerBoxOpened, setHeaderBoxOpened] = useState<boolean>(false),
        [headerClassName, setHeaderClassName] = useState<string>('header__loginBtn box--closed'),
        [login, setLogin] = useState<string>(),
        [password, setPassword] = useState<string>(),
        [localLoginState, setLocalLoginState] = useState<boolean>();

    const handleAirplaneClass = (state: string) => {
        if (window.innerWidth > 830) {
            switch (state) {
                case 'mouseOver':
                    setAirplaneClassName('header__icon header__icon--center')
                    break;
                case 'mouseOut':
                    setAirplaneClassName('header__icon header__icon--right')
                    break;
            }
        }
    }

    useEffect(() => {
        handleHeaderClass();
        localLoginState && setTimeout(() => {
            props.setGlobalLoginState(false);
            setLocalLoginState(false);
        }, 3000);
    }, [headerBoxOpened, localLoginState])

    const handleHeaderClass = () => {
        headerBoxOpened
            ? setHeaderClassName('header__loginBtn box--opened')
            : setHeaderClassName('header__loginBtn box--closed')
    }

    const triggerLogin = () => {
        console.log(login, password)
        toast.error('sdfasdfsaf fsdafs dfssdf afds fsdfsdfs dfsfdsfs dfsdf sdfsd fsdfsd sdfd', toastProps);
        setLocalLoginState(true);
        props.setGlobalLoginState(true);
        setHeaderBoxOpened(false)
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
            <ReactCSSTransitionGroup transitionName='appear'>
                {headerBoxOpened && (
                    <div className="login-box">
                        <div className="login-box__content">
                            <div className="flex-container">
                                <FaDoorOpen
                                    size={50}
                                    color='#fff'
                                    className='login-box__image'
                                />
                                <h2 className="login-box__header">
                                    {localLoginState ? 'Dupa' : 'Login'}
                                </h2>
                            </div>
                            <input
                                className='login-box__input'
                                type="text"
                                placeholder='Username'
                                onChange={(event) => setLogin(event.target.value)}
                            />
                            <input
                                className='login-box__input'
                                type="password"
                                placeholder='Password'
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <button
                                className="button login-box__button"
                                onClick={triggerLogin}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                )}
            </ReactCSSTransitionGroup>
            <ToastWrapper />
        </>
    )
}

export default Header;