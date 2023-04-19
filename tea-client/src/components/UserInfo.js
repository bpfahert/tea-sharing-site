import React from 'react';
import Navbar from './Navbar';
import TeaList from './TeaList';

export default function UserInfo(props) {
    let user = {
        username: "denny",
        url: "/denny",
        favorite_teas: [{name: "new tea", brand: "david's tea", type: "green", rating: 8, notes: "good tea", created_on: new Date()}],
        teas_added: [{name: "my tea", brand: "david's tea", type: "herbal", rating: 9, notes: "great tea", created_on: new Date()}]
      }

    return (
        <div>
            <Navbar />
            <h1>{props.title}</h1>
            <div className="userinfodiv">
                {/* TODO: Fix user image display */}
                {/* {props.user.img.data ?  
                <img src={`data:image/${props.user.img.contentType};base64,
                ${props.user.img.data.toString('base64')}`} /> : */}
                <p>This user does not have an avatar</p>
                {/* } */}
                <p>Username: {user.username}</p>
                <p>Favorite Type of Tea: {user.favorite_tea_type}</p>
                <p>Favorite Teas: </p>
                <TeaList tealist={user.favorite_teas} />
                <p>Teas Added: </p>
                <TeaList tealist={user.teas_added} />
            </div>
        </div>
    )

}