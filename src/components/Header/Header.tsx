import React, { useState, useEffect } from 'react';
import { GiAirplane } from 'react-icons/gi';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { FaDoorOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { ToastWrapper, toastProps } from '../Toast.tsx/Toast';
import Logo from '../Logo/Logo';


interface Props {
    resetFlightData: () => void,
    setGlobalLoginState: (arg0: boolean) => void,
    loginConflict: boolean,
    resetLoginConflict: () => void;
}

export type FetchState = 'NotFetched' | 'IsFetching' | 'ErrorFetching' | 'Fetched';

const Header: React.FunctionComponent<Props> = (props: Props) => {
    const [airplaneClassName, setAirplaneClassName] = useState<string>('header__icon'),
        [headerBoxOpened, setHeaderBoxOpened] = useState<boolean>(false),
        [headerClassName, setHeaderClassName] = useState<string>('header__loginBtn box--closed'),
        [login, setLogin] = useState<string>(),
        [password, setPassword] = useState<string>(),
        [localLoginState, setLocalLoginState] = useState<boolean>(),
        [loginUserName, setLoginUserName] = useState<string | null>(),
        fetchUsersUrl = 'https://api.jsonbin.io/b/5edb8db51f9e4e5788186775';

    const handleAirplaneClass = (state: string) => {
        if (window.innerWidth > 830) {
            switch (state) {
                case 'mouseOver':
                    setAirplaneClassName('header__icon header__icon--center');
                    break;
                case 'mouseOut':
                    setAirplaneClassName('header__icon header__icon--right');
                    break;
                default:
                    return null;
            }
        }
    };

    useEffect(() => {
        handleHeaderClass();
        localLoginState && setTimeout(() => {
            props.setGlobalLoginState(false);
            setLocalLoginState(false);
            setLoginUserName(null);
            toast.error('You have been logged out', toastProps);
        }, 180000);
        (props.loginConflict && !localLoginState) && setHeaderBoxOpened(true);
    }, [headerBoxOpened, localLoginState, props.loginConflict]);

    const handleHeaderClass = () => {
        headerBoxOpened
            ? setHeaderClassName('header__loginBtn box--opened')
            : setHeaderClassName('header__loginBtn box--closed');
    };

    const triggerLogin = () => {
        props.resetLoginConflict();
        if (login && password) {
            checkCredits();
        } else {
            toast.error('You have to pass both login and password', toastProps);
        }
    };

    const checkCredits = () => {
        fetch(fetchUsersUrl)
            .then(response => response.json())
            .then(response => {
                let isAuthenticated = false;
                for (const user in response) {
                    if (!loginUserName
                        && response[user].login === login && response[user].password === password) {
                        setLoginUserName(response[user].login);
                        setHeaderBoxOpened(false);
                        setLocalLoginState(true);
                        props.setGlobalLoginState(true);
                        isAuthenticated = true;
                    }
                    isAuthenticated && props.resetLoginConflict();
                }
                !isAuthenticated && toast.error('Wrong creditentials', toastProps);
            })
            .catch(error => {
                console.warn(error);
            });
    };

    return (
        <>
            <div className='header'>
                <div onClick={props.resetFlightData}>
                    <Logo />
                </div>
                <button
                    className={headerClassName}
                    onMouseOver={() => handleAirplaneClass('mouseOver')}
                    onMouseOut={() => handleAirplaneClass('mouseOut')}
                    onClick={() => {
                        setHeaderBoxOpened(!headerBoxOpened);
                        setLogin('');
                        setPassword('');
                        props.resetLoginConflict();
                    }}
                >
                    {!loginUserName
                        ? 'Login'
                        : loginUserName}
                    {window.innerWidth > 1024 && (
                        <GiAirplane
                            color='#fff'
                            size={20}
                            className={airplaneClassName}
                        />
                    )}
                </button>
            </div>
            <ReactCSSTransitionGroup
                transitionName='appear'
                transitionEnterTimeout={0}
                transitionLeaveTimeout={0}
            >
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
                                    Login
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
    );
};

export default Header;