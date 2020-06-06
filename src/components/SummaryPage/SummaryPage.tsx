import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AiOutlineHome } from 'react-icons/ai';
import { FaLuggageCart, FaRegCalendarAlt } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiConvergenceTarget } from 'react-icons/gi';
import { toast } from 'react-toastify';

import { toastProps } from '../Toast.tsx/Toast';
import { FlightData } from '../MainPage/MainPage';
import Airplane from '../Airplanes/Airplane';


interface Props {
    flightData: FlightData,
    loginState: boolean,
}

const SummaryPage: React.FunctionComponent<Props> = (props: Props) => {
    const { flightData } = props,
        [passengers, setPassengers] = useState<number>(),
        [chosenSeats, setChosenSeats] = useState<number>();

    useEffect(() => {
        !passengers && formatPassengers();
    });

    const formatPassengers = () => {
        setPassengers(
            parseInt(flightData.passengers.adults)
            + parseInt(flightData.passengers.children)
            + parseInt(flightData.passengers.babies)
        );
    };

    const handleSvgClick = (e: any) => {
        const fill = e.target.getAttribute('fill'),
            newColor = fill === '#AFAFAF' ? '#4ED38C' : '#AFAFAF';
        e.target.setAttribute('fill', newColor);
        setChosenSeats(e.target.id);
    };

    const handleOrder = () => {
        if (!props.loginState) {
            toast.error('You have to be logged in to submit your order', toastProps);
        }
    };

    return (
        <>
            <div className="summary">
                <div className="summary__options">
                    <div className="summary__option">
                        <div className="summary__subtitle--container">
                            <AiOutlineHome size={20} />
                            <h3 className="summary__subtitle">
                                Origin
                            </h3>
                            <div className="underline" />
                        </div>
                        <p className="summary__data">
                            {flightData.origin}
                        </p>
                    </div>
                    <div className="summary__option">
                        <div className="summary__subtitle--container">
                            <GiConvergenceTarget size={20} />
                            <h3 className="summary__subtitle">
                                Destination
                            </h3>
                            <div className="underline" />
                        </div>
                        <p className="summary__data">
                            {flightData.destination}
                        </p>
                    </div>
                    <div className="summary__option">
                        <div className="summary__subtitle--container">
                            <FaRegCalendarAlt size={20} />
                            <h3 className="summary__subtitle">
                                Departure
                            </h3>
                            <div className="underline" />
                        </div>
                        <p className="summary__data">
                            {flightData.departure}
                        </p>
                    </div>
                    <div className="summary__option">
                        <div className="summary__subtitle--container">
                            <BsFillPersonFill size={20} />
                            <h3 className="summary__subtitle">
                                Passengers
                            </h3>
                            <div className="underline" />
                        </div>
                        <p className="summary__data">
                            {passengers}
                        </p>
                    </div>
                    <div className="summary__option">
                        <div className="summary__subtitle--container">
                            <FaLuggageCart size={20} />
                            <h3 className="summary__subtitle">
                                Luggage
                            </h3>
                            <div className="underline" />
                        </div>
                        <p className="summary__data">
                            {flightData.luggage}
                        </p>
                    </div>
                    <button
                        className="button button--order"
                        onClick={handleOrder}
                    >
                        Order
                    </button>
                </div>
                <div className="summary__airplane">
                    <TransformWrapper>
                        <TransformComponent>
                            <Airplane handleSeatSelection={handleSvgClick} />
                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <div className="summary__options summary__options--aesthetical" />
            </div>
        </>
    );
};

export default SummaryPage;