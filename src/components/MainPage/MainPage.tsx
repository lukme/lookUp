import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { CustomSelect, SingleData, formatMaxDate } from '../CustomSelect/CustomSelect';
import { ToastWrapper, toastProps } from '../Toast.tsx/Toast';

export interface FlightData {
    origin: string,
    departure: string,
    destination: string,
    passengers: Passengers,
    luggage: string,
}

export interface Passengers {
    adults: string,
    children: string,
    babies: string,
}

interface Props {
    passDataBackwards: (arg0: FlightData) => void,
}

export const MainPage: React.FunctionComponent<Props> = (props: Props) => {
    const [origin, setOrigin] = useState<string>(),
        [departure, setDeparture] = useState<string>(),
        [destination, setDestination] = useState<string>(),
        [passengers, setPassengers] = useState<Passengers>(),
        [luggage, setLuggage] = useState<string>();

    const convertFlightData = (singleData: SingleData) => {
        switch (singleData.convertedSource) {
            case 'Origin':
                setOrigin(singleData.dataSelected);
                break;
            case 'Departure':
                setDeparture(singleData.dataSelected);
                break;
            case 'Destination':
                setDestination(singleData.dataSelected);
                break;
            case 'Passengers':
                setPassengers(singleData.dataSelected);
                break;
            case 'Luggage':
                setLuggage(singleData.dataSelected);
                break;
            default:
                console.error('Wrong data selected');
        }
    };

    // extra protection - build-in input's max/min date prop does not work correctly if date was inserted by hand
    const checkDate = (localDeparture: string) => {
        const today = new Date(),
            dateSelected = new Date(localDeparture),
            maxDate = new Date(formatMaxDate());
        return (dateSelected <= maxDate && dateSelected >= today);
    };

    const handleAccept = () => {
        if (departure && !checkDate(departure)) {
            return toast.error('You have chosen wrong flight date.', toastProps);
        }
        if (origin && departure && destination && passengers && luggage) {
            const localFlightData = {
                origin,
                departure,
                destination,
                passengers,
                luggage,
            };
            props.passDataBackwards(localFlightData);
        } else {
            toast.error('You have to choose all flight options', toastProps);
        }
    };

    return (
        <div className="main">
            <div className="main__banner">
                <div className="main__image"></div>
                <div className="main__textbox">
                    <p>
                        Conveniently synthesize cost effective.
                    </p>
                </div>
            </div>
            <div className="main__selectContainer">
                <CustomSelect passData={convertFlightData} source='ORIGIN' />
                <CustomSelect passData={convertFlightData} source='DEPARTURE' />
                <CustomSelect passData={convertFlightData} source='DESTINATION' />
                <CustomSelect storedPassengers={passengers} passData={convertFlightData} source='PASSENGERS' />
                <CustomSelect passData={convertFlightData} source='LUGGAGE' />
                <div className="main__button">
                    <button
                        className='button'
                        onClick={handleAccept}
                    >
                        Accept
                    </button>
                </div>
            </div>
            <ToastWrapper />
        </div>
    );
};