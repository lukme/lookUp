import React, { useState, useRef } from 'react';
import ListItem from './ListItem';
import { AiFillInfoCircle } from 'react-icons/ai';
import { IoIosClose } from 'react-icons/io';
import { Passengers } from '../MainPage/MainPage';
import useOutsideHandler from '../useOutsideHandler/useOutsideHandler';
import { ToastWrapper, toastProps } from '../Toast.tsx/Toast';
import { toast } from 'react-toastify';

interface Props {
    handleClick: (arg0: string | Passengers) => void;
    convertedSource: string;
    icon: JSX.Element | undefined;
    submenuOptions?: string[],
    closeSubmenu: () => void,
}

const Submenu: React.FunctionComponent<Props> = (props: Props) => {
    const { icon, convertedSource, handleClick } = props,
        [adults, setAdults] = useState<string>('0'),
        [children, setChildren] = useState<string>('0'),
        [babies, setBabies] = useState<string>('0'),
        submenuRef = useRef(null);

        useOutsideHandler(props.closeSubmenu, submenuRef);

    const convertPassengers = () => {
        const passengers = parseInt(adults) + parseInt(children) + parseInt(babies);
        if (parseInt(adults) + parseInt(children) + parseInt(babies) !== 0) {
            if (parseInt(adults) + parseInt(children) === 0 && parseInt(babies) !== 0) {
                return toast.error('Babies cannot fly on their own!', toastProps);
            } else if (passengers > 9) {
                return toast.error('You cannot select more than 9 passengers', toastProps);
            }
            return handleClick({
                adults,
                children,
                babies,
            });
        } else {
            return toast.error('You have to choose at least one passenger', toastProps);
        }
    }

    const renderPassengerOptions = () => {
        const options: JSX.Element[] = [];
        // const passengers = parseInt(adults) + parseInt(children) + parseInt(babies),
        // for (let i = 0; i < 10 - passengers; i++) { // TODO: when reached max - values are being affected
        for (let i = 0; i < 10; i++) {
            options.push(<option key={i} value={i}>{i}</option>)
        }
        return options;
    }

    const renderListItems = () => {
        const { submenuOptions } = props,
            listElements: JSX.Element[] = [];
        if (submenuOptions) {
            submenuOptions.forEach(el => {
                listElements.push(<ListItem data={el} handleClick={handleClick} />)
            });
        }
        return listElements;
    }

    return (
        convertedSource === 'Passengers'
            ? (
                <div ref={submenuRef} className="submenu submenu--passengers">
                    <div className="flex-container submenu__header-container">
                        {icon}
                        <p className='submenu__header'>{convertedSource}</p>
                        <IoIosClose
                            color='#88878B'
                            size={26}
                            className='submenu__close'
                            onClick={() => props.closeSubmenu()}
                        />
                    </div>
                    <div className='passenger'>
                        <div>
                            <p className='passenger__title'>
                                Adults
                            </p>
                            <p className='passenger__subtitle'>
                                &gt;16 years old
                            </p>
                        </div>
                        <select
                            name="adults"
                            id="adults"
                            value={adults}
                            onChange={(event) => setAdults(event.target.value)}
                        >
                            {renderPassengerOptions()}
                        </select>
                    </div>
                    <div className='passenger'>
                        <div>
                            <p className='passenger__title'>
                                Children
                            </p>
                            <p className='passenger__subtitle'>
                                1-16 years old
                            </p>
                        </div>
                        <select
                            name="children"
                            id="children"
                            value={children}
                            onChange={(event) => setChildren(event.target.value)}
                        >
                            {renderPassengerOptions()}
                        </select>
                    </div>
                    <div className='passenger'>
                        <div>
                            <p className='passenger__title'>
                                Babies
                            </p>
                            <p className='passenger__subtitle'>
                                &lt;1 year old
                            </p>
                        </div>
                        <select
                            name="babies"
                            id="babies"
                            value={babies}
                            onChange={(event) => setBabies(event.target.value)}
                        >
                            {renderPassengerOptions()}
                        </select>
                    </div>
                    <button
                        className='button'
                        onClick={convertPassengers}
                    >
                        Accept
                    </button>
                    <div className="flex-container submenu__info-container">
                        <AiFillInfoCircle
                            className='select__icon'
                            color='#4392F1'
                            size={20}
                        />
                        <p className='submenu__info'>
                            Note
                        </p>
                    </div>
                    <p className='submenu__subtext'>
                        You can choose up to 9 passengers
                    </p>
                    <p className='submenu__subtext'>
                        Babies travel free of charge
                    </p>
                    <ToastWrapper />
                </div>
            )
            : (
                <ul ref={submenuRef} className='submenu'>
                    <div className="flex-container submenu__header-container">
                        {icon}
                        <p className='submenu__header'>{convertedSource}</p>
                        <IoIosClose
                            color='#88878B'
                            size={26}
                            className='submenu__close'
                            onClick={() => props.closeSubmenu()}
                        />
                    </div>
                    {renderListItems()}
                    <ToastWrapper />
                </ul>
            )
    );
}

export default Submenu;