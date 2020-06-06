import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AiOutlineHome } from 'react-icons/ai';
import { FaLuggageCart, FaRegCalendarAlt } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { GiConvergenceTarget } from 'react-icons/gi';

import { FlightData } from '../MainPage/MainPage';

interface Props {
    flightData: FlightData,
    loginState: boolean,
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
            + parseInt(flightData.passengers.children)
            + parseInt(flightData.passengers.babies)
        );
    };

    const handleSvgClick = (e: any) => {
        const stroke = e.target.getAttribute('stroke'),
            newColor = stroke === '#ff00ff' ? '#12345C' : '#ff00ff';
        e.target.setAttribute('stroke', newColor);
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
                    <button className="button button--order">
                        Order
                    </button>
                </div>
                <div className="summary__airplane">
                    <TransformWrapper>
                        <TransformComponent>
                            {/* AIRPLANE PLACEHOLDER */}
                            <svg width="100%" height="100%" viewBox="0 0 252 252" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="126" cy="126" r="126" fill="white" />
                                <path d="M26 199C89.5574 194.036 219.138 159.286 229 60" stroke="#4392F1"/>
                                <path d="M73 238C121.842 231.571 221.421 186.571 229 58" stroke="#4392F1"/>
                                <path d="M1 127C72.6977 124.679 218.874 108.429 230 62" stroke="#4392F1"/>
                                <path d="M9 166C77.8799 162.286 218.312 136.286 229 62" stroke="#4392F1"/>
                                <path d="M27.0061 158.178L35.0184 142.954L71.0735 150.967L95.1103 138.147L56.6515 110.905V106.899L60.6576 102.092H68.6698L125.557 125.327L178.438 99.6881L191.257 97.2844L199.27 99.6881L203.276 106.899V115.713L194.462 125.327L146.389 147.762L121.551 223.077L114.34 226.282L107.129 223.077L111.936 166.991L54.2478 192.63L47.0367 176.606L56.6515 171.798L27.0061 158.178Z" fill="white" fill-opacity="0.95" />
                                <path d="M27.9076 157.18L28.9819 155.235L34.5853 145.092L35.3312 143.742L36.8266 144.12L69.7728 152.457L69.7813 152.46C70.0395 152.526 70.3127 152.503 70.5611 152.39C70.5635 152.389 70.5658 152.387 70.5682 152.386L177.614 101.423C182.216 99.1135 187.399 98.2676 192.484 99.0002C196.428 99.3881 199.92 101.714 201.852 105.204L201.89 105.271L201.921 105.341C203.653 109.126 202.702 113.491 200.391 117.243C198.056 121.033 194.173 124.506 189.365 126.79C189.365 126.79 189.365 126.79 189.364 126.79L152.268 144.516L148.028 146.543L149.508 142.082L151.76 135.295C151.76 135.293 151.76 135.292 151.761 135.291C151.997 134.559 151.594 133.811 150.944 133.591C150.309 133.377 149.581 133.715 149.347 134.433L149.345 134.44L122.839 214.834L122.835 214.848L122.83 214.861C122.004 217.251 121.04 219.272 119.921 220.813C118.813 222.34 117.43 223.56 115.727 224.018L115.66 224.036L115.592 224.049C113.725 224.416 111.797 224.04 110.2 223.017L109.173 222.36L109.287 221.147L115.728 152.209L27.9076 157.18ZM27.9076 157.18L29.9541 158.045M27.9076 157.18L29.9541 158.045M29.9541 158.045L58.7524 170.213C59.1787 170.412 59.478 170.861 59.478 171.385C59.478 171.915 59.1721 172.369 58.7359 172.565L58.7151 172.574L58.6945 172.584L49.6146 176.916L47.8334 177.766L48.6594 179.558L53.1978 189.407L54.0448 191.245L55.8726 190.376L111.139 164.114L112.165 163.627L112.272 162.496L113.269 151.959L113.269 151.957C113.339 151.209 113.972 150.729 114.609 150.791L114.612 150.792M29.9541 158.045L114.612 150.792M114.612 150.792C115.26 150.854 115.797 151.457 115.728 152.208L114.612 150.792ZM52.4584 193.428L52.4542 193.418L45.2179 177.584C44.9402 176.923 45.2384 176.183 45.8261 175.899C45.8277 175.898 45.8293 175.897 45.831 175.896L51.2621 173.343L55.3267 171.433L51.1872 169.69L25.8415 159.02L25.8182 159.01L25.7947 159.001C25.4728 158.875 25.2082 158.609 25.0812 158.257L25.0796 158.252C24.9518 157.9 24.9794 157.509 25.1516 157.182L33.6729 141.546C33.6738 141.544 33.6747 141.543 33.6755 141.541C33.9566 141.039 34.5042 140.816 35.0062 140.939C35.008 140.94 35.0098 140.94 35.0117 140.941L69.2327 149.801L69.9425 149.985L70.6029 149.667L91.0199 139.818L94.0921 138.336L91.2987 136.379L55.6557 111.404C55.6547 111.403 55.6537 111.402 55.6526 111.401C55.3357 111.176 55.1306 110.804 55.1145 110.389C55.0548 106.916 56.5466 103.616 59.1497 101.414C62.0431 99.3181 66.4733 99.0294 72.8378 101.47L125.77 122.574L126.584 122.898L127.374 122.521L176.617 98.9841L176.632 98.9767L176.647 98.9691C181.729 96.433 187.444 95.5371 193.034 96.3971L193.065 96.4019L193.096 96.4057C197.808 96.9806 201.951 99.9113 204.127 104.247C205.971 108.283 205.575 112.999 203.163 117.517C200.743 122.053 196.326 126.293 190.386 129.118C190.386 129.118 190.386 129.118 190.386 129.118L147.714 149.407L146.943 149.774L146.674 150.585L125.134 215.599C125.134 215.602 125.133 215.604 125.132 215.607C122.872 222.229 119.77 225.492 116.279 226.424C115.621 226.594 114.949 226.682 114.274 226.685C111.641 226.59 109.107 225.615 107.062 223.903C106.784 223.637 106.631 223.244 106.668 222.831C106.668 222.83 106.669 222.829 106.669 222.828L111.627 169.98L111.956 166.473L108.776 167.987L54.0387 194.048C53.8783 194.121 53.7124 194.155 53.5513 194.154L53.5425 194.154H53.5337C53.4014 194.154 53.268 194.13 53.1414 194.084C52.8489 193.971 52.5988 193.739 52.4584 193.428ZM57.7345 108.53L57.5691 109.74L58.571 110.44L95.8015 136.439L96.7555 137.105L97.8062 136.605L119.321 126.363L123.46 124.392L119.2 122.698L72.0502 103.953L72.0371 103.948L72.0238 103.943C69.6731 103.047 67.5067 102.502 65.6064 102.392C63.7211 102.282 61.8979 102.592 60.4668 103.642L60.4099 103.684L60.3561 103.729C58.9195 104.947 57.9899 106.66 57.7345 108.53Z" fill="#C4C4C4" stroke="#12345C" stroke-width="4" />
                                <circle cx="126" cy="126" r="122" stroke="#12345C" id='out-circle' onClick={(e: any) => handleSvgClick(e)}/>
                            </svg>

                        </TransformComponent>
                    </TransformWrapper>
                </div>
                <div className="summary__options summary__options--aesthetical" />
            </div>
        </>
    );
};

export default SummaryPage;