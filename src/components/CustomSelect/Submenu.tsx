import React, { useState } from 'react';
import ListItem from './ListItem';
import { AiFillInfoCircle } from 'react-icons/ai';
import { Passengers } from '../MainPage/MainPage';

interface Props {
    handleClick: (arg0: string | Passengers) => void;
    convertedSource: string;
    icon: JSX.Element | undefined;
    submenuOptions?: string[],
}

const Submenu: React.FunctionComponent<Props> = (props: Props) => {
    const { icon, convertedSource, handleClick } = props,
        [adults, setAdults] = useState<string>('0'),
        [children, setChildren] = useState<string>('0'),
        [babies, setBabies] = useState<string>('0');

    const convertPassengers = () => {
        const passengers = parseInt(adults) + parseInt(children) + parseInt(babies);
        if (parseInt(adults) + parseInt(children) + parseInt(babies) !== 0) {
            if (parseInt(adults) + parseInt(children) === 0 && parseInt(babies) !== 0) {
                return alert('Babies cannot fly on their own!')
            } else if (passengers > 9) {
                return alert('You cannot select more than 9 passengers')
            }
            return handleClick({
                adults,
                children,
                babies,
            });
        } else {
            return alert('You have to choose at least one passenger');
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
        // for (let i = 0; i < submenuOptions.length; i++) {
        //     listElements.push(<ListItem data='Cracov' handleClick={handleClick} />)
        // }
        // @ts-ignore
        submenuOptions.forEach(el => {
            listElements.push(<ListItem data={el} handleClick={handleClick} />)
        });
        return listElements;
    }

    return (
        convertedSource === 'Passengers'
            ? (
                <div className="submenu submenu--passengers">
                    <div className="flex-container">
                        {icon}
                        <p className='submenu__header'>{convertedSource}</p>
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
                </div>
            )
            : (
                <ul className='submenu'>
                    <div className="flex-container">
                        {icon}
                        <p className='submenu__header'>{convertedSource}</p>
                    </div>
                    {/* <ListItem data='Warsaw' handleClick={handleClick} />
                    <ListItem data='Lodz' handleClick={handleClick} />
                    <ListItem data='Cracov' handleClick={handleClick} /> */}
                    {props.submenuOptions ? renderListItems() : null}
                </ul>
            )
    );
}

export default Submenu;