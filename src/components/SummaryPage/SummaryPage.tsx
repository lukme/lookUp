import React from 'react';
import { FlightData } from '../MainPage/MainPage';

interface Props {
    flightData: FlightData;
}

const SummaryPage: React.FunctionComponent<Props> = (props: Props) => {
    const { flightData } = props;

    console.log(flightData)

    return (
        <>
            <div className="summary">
                <div className="summary__options">
                    dupa
                </div>
                <div className="summary__airplane">
                    <img src="/airplane_wing.jpg" alt="wing"/>
                </div>
                <div className="summary__options summary__options--aesthetical" />
            </div>
        </>
    );
}

export default SummaryPage;