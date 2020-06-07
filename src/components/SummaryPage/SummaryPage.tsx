import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AiOutlineHome } from 'react-icons/ai';
import { FaLuggageCart, FaRegCalendarAlt } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiConvergenceTarget } from 'react-icons/gi';
import { toast } from 'react-toastify';

import { toastProps } from '../Toast.tsx/Toast';
import { FlightData } from '../MainPage/MainPage';
import Airplane from '../Airplanes/Airbus-A320';

interface Props {
    flightData: FlightData,
    loginState: boolean,
    forceOpeningHeaderBox: () => void;
}

const SummaryPage: React.FunctionComponent<Props> = (props: Props) => {
    const { flightData } = props,
        [passengers, setPassengers] = useState<number>(),
        [chosenSeats, setChosenSeats] = useState<string[]>([]),
        seatsOccupied = ['seat-2', 'seat-9', 'seat-24', 'seat-60', 'seat-93', 'seat-94', 'seat-95', 'seat-96', 'seat-97', 'seat-98', 'seat-99', 'seat-109', 'seat-120', 'seat-121', 'seat-139', 'seat-153'],
        [occupiedState, setOccupiedState] = useState<boolean>(false);

    useEffect(() => {
        !passengers && formatPassengers();
        !occupiedState && handleOccupiedSeats();
    });

    const formatPassengers = () => {
        setPassengers(
            parseInt(flightData.passengers.adults)
            + parseInt(flightData.passengers.children)
            + parseInt(flightData.passengers.babies)
        );
    };

    const handleOccupiedSeats = () => {
        // Exceptional hack for forcing occupied seats
        const seats = document.querySelectorAll('path');
        for (let i = 0; i < seats.length; i++) {
            seatsOccupied.filter(id => id === seats[i].id).length !== 0
                && seats[i].setAttribute('fill', '#E36363');
        }
        setOccupiedState(true);
    };

    const handleSvgClick = (e: any) => {
        const fill = e.target.getAttribute('fill');
        let localChosenSeats = chosenSeats,
            newColor: string;

        if (fill === '#AFAFAF') {
            if ((chosenSeats && passengers) && chosenSeats.length >= passengers) {
                toast.error('You chose all seats you selected', toastProps);
                return;
            }
            newColor = '#4ED38C';
            chosenSeats
                ? setChosenSeats([...chosenSeats, e.target.id])
                : setChosenSeats(e.target.id);
        } else {
            newColor = '#AFAFAF';
            localChosenSeats = localChosenSeats.filter(element => element !== e.target.id);
            setChosenSeats(localChosenSeats);
        }
        e.target.setAttribute('fill', newColor);
    };

    const handleOrder = () => {
        if (!props.loginState) {
            props.forceOpeningHeaderBox();
            toast.error('You have to be logged in to submit your order', toastProps);
        } else if (props.loginState && chosenSeats.length !== passengers) {
            toast.error('You have to choose all your seats first', toastProps);
        } else {
            toast.error('That\'s the end of the road! You just booked a flight!', toastProps);
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
                    <p className="summary__selected">Seats selected {chosenSeats.length} / {passengers}</p>
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