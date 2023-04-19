import React from 'react';
import TeaCard from './TeaCard';

export default function TeaList(props) {

    const teaElements = props.tealist.map((tea) => {
        return (
            <TeaCard tea={tea} />
        )
    })

    return (
        <div className="container-fluid">
            <h2 className="text-center mb-3">{props.listname}</h2>
            <ul style={{display: "flex", justifyContent: "center", listStyle: "none", gap: "5px"}}>
                {teaElements}
            </ul>
        </div>
    )
}