import React from 'react';

interface Props {
    handleClick: (arg0: string) => void;
    data: string;
}

const ListItem: React.FunctionComponent<Props> = (props: Props) => {
    return (
        <li
            key={props.data}
            onClick={() => props.handleClick(props.data)}
            className='list-item'
        >
            {props.data}
        </li>
    );
}

export default ListItem;