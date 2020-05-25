import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AiOutlineHome } from 'react-icons/ai';
import { FaLuggageCart, FaRegCalendarAlt } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiConvergenceTarget } from 'react-icons/gi';

import { FlightData } from '../MainPage/MainPage';

interface Props {
    flightData: FlightData;
}

const SummaryPage: React.FunctionComponent<Props> = (props: Props) => {
    const { flightData } = props,
        [passengers, setPassengers] = useState<number>();

    useEffect(() => {
        !passengers && formatPassengers();
    });

    const formatPassengers = () => {
        setPassengers(
            parseInt(flightData.passengers.adults)
            + parseInt(flightData.passengers.adults)
            + parseInt(flightData.passengers.babies)
        )
    }

    return (
        <>
            <div className="summary">
                <div className="summary__options">
                    <div className="summary__option">
                        <h3 className="summary__subtitle--container">
                            <AiOutlineHome size={20} />
                            <h3 className="summary__subtitle">
                                Origin
                            </h3>
                            <div className="underline" />
                        </h3>
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
                            {flightData.origin}
                        </p>
                    </div>
                    <button className="button button--order">
                        Order
                    </button>
                    <p className='summary__warning'>You have to be logged in to finalize your order</p>
                </div>
                <div className="summary__airplane">
                    <TransformWrapper>
                        <TransformComponent>
                            {/* AIRPLANE PLACEHOLDER */}
                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <div className="summary__options summary__options--aesthetical" />
            </div>
        </>
    );
}

export default SummaryPage;