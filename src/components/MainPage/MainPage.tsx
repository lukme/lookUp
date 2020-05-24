import React, { useState } from 'react';
import { CustomSelect, SingleData } from '../CustomSelect/CustomSelect';

interface FlightData {
    origin: string | Passengers | undefined,
    departure: string | Passengers | undefined,
    destination: string | Passengers | undefined,
    passengers: string | Passengers | undefined,
    luggage: string | Passengers | undefined,
}

export interface Passengers {
    adults: string,
    children: string,
    babies: string,
}

export const MainPage: React.FunctionComponent = () => {
    const [flightData, setFlightData] = useState<FlightData>(),
        [origin, setOrigin] = useState<string | Passengers>(),
        [departure, setDeparture] = useState<string | Passengers>(),
        [destination, setDestination] = useState<string | Passengers>(),
        [passengers, setPassengers] = useState<string | Passengers>(), // TODO: change type
        [luggage, setLuggage] = useState<string | Passengers>();

    const convertFlightData = (singleData: SingleData) => {
        switch (singleData.convertedSource) {
            case 'Origin':
                setOrigin(singleData.dataSelected);
                break
            case 'Departure':
                setDeparture(singleData.dataSelected);
                break
            case 'Destination':
                setDestination(singleData.dataSelected);
                break
            case 'Passengers':
                setPassengers(singleData.dataSelected);
                break
            case 'Luggage':
                setLuggage(singleData.dataSelected);
                break
            default:
                console.error('Wrong data selected')
        }
    }

    const handleAccept = () => {
        if (origin && departure && destination && passengers && luggage) {
            const localFlightData = {
                origin,
                departure,
                destination,
                passengers,
                luggage,
            };
            setFlightData(localFlightData)
            console.log(localFlightData)
        } else {
            alert('You have to choose all flight options');
        }
    }

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
                <CustomSelect passData={convertFlightData} source='PASSENGERS' />
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
        </div>
    )
}