import React from 'react';

export default function TeaCard(props) {

    return (
        <div className="card mr-2 border border-dark rounded" style={{backgroundColor: "peachpuff", width: "18rem"}}>
            {/* <% if (props.tea.img.data) { %>
                <img class="card-img-top" src="data:image/<%= props.tea.img.contentType%>;base64,
                <%= props.img.data.toString('base64') %>" alt="tea-image" />
            <% } else { %> */}
                <img className="card-img-top" src="" alt="tea-image" />
            {/* <% } %> */}
            <div className="card-body">
                <li><h5><a style={{textDecoration: "none", color: "black"}} href={props.tea.url}> {props.tea.name}</a></h5></li> 
                <li>Type: {props.tea.type} </li> 
                <li>Brand: {props.tea.brand} </li> 
                <li>Rating(out of 10): {props.tea.rating} </li> 
                <li>Notes: {props.tea.notes} </li> 
                <li>Added on: {props.tea.created_on.toDateString()} </li>
            </div>
        </div>
    )
}