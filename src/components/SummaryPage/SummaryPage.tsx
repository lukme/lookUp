import React, { useState, useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AiOutlineHome } from 'react-icons/ai';
import { FaLuggageCart, FaRegCalendarAlt } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiConvergenceTarget } from 'react-icons/gi';
import { MdAccessTime } from 'react-icons/md';
import { RiWalletLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Loader from 'react-loader-spinner';

import { toastProps } from '../Toast.tsx/Toast';
import { FlightData } from '../MainPage/MainPage';
import Airbus320 from '../Airplanes/Airbus-A320';
import Airbus350 from '../Airplanes/Airbus-A350';
import EmbraerE145 from '../Airplanes/Embraer-E145';
import { FetchState } from '../Header/Header';

interface Props {
    flightData: FlightData,
    loginState: boolean,
    forceOpeningHeaderBox: () => void;
}

type Flight = {
    origin: string;
    destination: string;
    time: string;
    airplane: string;
    adultSeatCost: string;
    childrenSeatCost: string;
    babiesSeatCost: string;
    trolleyCost: string;
}

type AirplaneSize = 'SMALL' | 'MEDIUM' | 'LARGE';

const SummaryPage: React.FunctionComponent<Props> = (props: Props) => {
    const { flightData } = props,
        [passengers, setPassengers] = useState<number>(),
        [chosenSeats, setChosenSeats] = useState<string[]>([]),
        seatsOccupied = ['seat-2', 'seat-9', 'seat-24', 'seat-28', 'seat-35', 'seat-36', 'seat-40', 'seat-49', 'seat-60', 'seat-71', 'seat-72', 'seat-86', 'seat-93', 'seat-94', 'seat-95', 'seat-96', 'seat-97', 'seat-98', 'seat-99', 'seat-109', 'seat-120', 'seat-121', 'seat-139', 'seat-151', 'seat-153', 'seat-253', 'seat-260', 'seat-269', 'seat-281', 'seat-286', 'seat-295', 'seat-296', 'seat-299'],
        [occupiedState, setOccupiedState] = useState(false),
        [fetchState, setFetchState] = useState<FetchState>(),
        [fetchedFlight, setFetchedFlight] = useState<Flight>(),
        [cost, setCost] = useState(0),
        fetchFlightsUrl = 'https://api.jsonbin.io/b/5edfe2712f5fd957fda70142',
        optionsButtonRef = useRef<any>(),
        smallLoader = (
            <Loader
                type="BallTriangle"
                color="#4392F1"
                height={20}
                width={20}
            />
        );

    useEffect(() => {
        !passengers && formatPassengers();
        (!occupiedState && fetchedFlight) && handleOccupiedSeats(); // FIXME: airplaneSelected
        fetchState !== 'Fetched' && fetchData();
        chosenSeats.length === passengers && optionsButtonRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
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
        const seats = document.querySelectorAll(fetchedFlight?.airplane === 'Embraer E145' ? 'rect' : 'path');
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
            if (passengers && chosenSeats.length >= passengers) {
                toast.error('You chose all seats you selected', toastProps);
                return;
            }
            newColor = '#4ED38C';
            chosenSeats
                ? setChosenSeats(prevState => [...prevState, e.target.id])
                : setChosenSeats(e.target.id);
        } else if (fill === '#E36363') {
            return;
        } else {
            newColor = '#AFAFAF';
            localChosenSeats = localChosenSeats.filter(element => element !== e.target.id);
            setChosenSeats(localChosenSeats);
        }
        e.target.setAttribute('fill', newColor);
    };

    const handleOrder = () => {
        const { loginState, forceOpeningHeaderBox } = props;
        if (!loginState) {
            forceOpeningHeaderBox();
            toast.error('You have to be logged in to submit your order', toastProps);
        } else if (loginState && chosenSeats.length !== passengers) {
            toast.error('You have to choose all your seats first', toastProps);
        } else {
            toast.error('That\'s the end of the road! You just booked a flight!', toastProps);
        }
    };

    const fetchData = () => {
        let currentFlightData: Flight;
        setFetchState('IsFetching');
        fetch(fetchFlightsUrl)
            .then(response => response.json())
            .then(response => {
                setFetchState('Fetched');
                handleFetchedData(response.flights);
                currentFlightData = response.flights.filter((flight: Flight) => flight.destination === flightData.destination)[0];
                setFetchedFlight(currentFlightData);
            })
            .catch(error => {
                console.warn(error);
                setFetchState('NotFetched');
            });
    };

    const handleFetchedData = (airplaneData: Flight[]) => {
        const currentFlightData = airplaneData.filter((flight) => flight.destination === flightData.destination)[0];

        // Calculate cost
        const luggageCost = flightData.luggage === 'Carry-on' ? 0 : parseInt(currentFlightData.trolleyCost),
            seatsCost = parseInt(flightData.passengers.adults) * parseInt(currentFlightData.adultSeatCost)
                + parseInt(flightData.passengers.children) * parseInt(currentFlightData.childrenSeatCost);
        setCost(luggageCost + seatsCost);
    };

    const renderAirplane = () => {
        switch (fetchedFlight?.airplane) {
            case 'Embraer E145':
                return <EmbraerE145 handleSeatSelection={handleSvgClick} />;
            case 'Airbus A320':
                return <Airbus320 handleSeatSelection={handleSvgClick} />;
            case 'Airbus A350':
                return <Airbus350 handleSeatSelection={handleSvgClick} />;
            default:
                return null;
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
                            {fetchState !== 'Fetched' ? smallLoader : flightData.origin}
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
                            {fetchState !== 'Fetched' ? smallLoader : flightData.destination}
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
                            {fetchState !== 'Fetched' ? smallLoader : flightData.departure}
                        </p>
                    </div>
                    <div className="summary__option">
                        <div className="summary__subtitle--container">
                            <MdAccessTime size={20} />
                            <h3 className="summary__subtitle">
                                Time
                            </h3>
                            <div className="underline" />
                        </div>
                        <p className="summary__data">
                            {fetchState !== 'Fetched' ? smallLoader : fetchedFlight?.time}
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
                            {fetchState !== 'Fetched' ? smallLoader : passengers}
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
                            {fetchState !== 'Fetched' ? smallLoader : flightData.luggage}
                        </p>
                    </div>
                    <div className="summary__option">
                        <div className="summary__subtitle--container">
                            <RiWalletLine size={20} />
                            <h3 className="summary__subtitle">
                                Cost
                            </h3>
                            <div className="underline" />
                        </div>
                        <p className="summary__data">
                            {fetchState !== 'Fetched' ? smallLoader : `${cost}$`}
                        </p>
                    </div>
                    <button
                        className="button button--order"
                        onClick={handleOrder}
                        ref={optionsButtonRef}
                    >
                        Order
                    </button>
                </div>
                <div className="summary__airplane">
                    {fetchState !== 'Fetched' && !fetchedFlight
                        ? (
                            <div className="summary__loader">
                                <Loader
                                    type="BallTriangle"
                                    color="#4392F1"
                                    height={70}
                                    width={70}
                                />
                            </div>
                        )
                        : (
                            <>
                                <p className="summary__selected">
                                    Seats selected {chosenSeats.length} / {passengers}
                                    <br />
                                    <span className="summary__airplane--name">
                                        {fetchedFlight?.airplane}
                                    </span>

                                </p>
                                <TransformWrapper>
                                    <TransformComponent>
                                        {renderAirplane()}
                                    </TransformComponent>
                                </TransformWrapper>
                            </>
                        )
                    }
                </div>
                <div className="summary__options summary__options--aesthetical" />
            </div>
        </>
    );
};

export default SummaryPage;