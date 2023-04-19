import React from 'react';
import Navbar from './Navbar';
import TeaList from './TeaList';

export default function UserInfo(props) {
    let user = {
        username: "denny",
        url: "/denny",
        favorite_teas: [{name: "new tea", brand: "david's tea", type: "green", rating: 8, notes: "good tea", created_on: new Date()}],
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
            </div>
        </div>
    )

}


//   <% if(user.favorite_teas[0]) { %>
//     <div class="tealist">
//       <div class="container-fluid">
//         <h2 class="text-center mb-3">Teas Added:</h2>
//         <ul style="display:flex;justify-content:center;list-style: none;gap: 5px;">
//           <% for(let i = 0; i < user.favorite_teas.length; i++) { %>
//               <div class="card mr-2 border border-dark rounded" style="background-color:peachpuff;width: 18rem;">
//                 <% if (user.favorite_teas[i].img.data) { %>
//                   <img class="card-img-top" src="data:image/<%= user.favorite_teas[i].img.contentType%>;base64,
//                   <%= user.favorite_teas[i].img.data.toString('base64') %>" alt="tea-image">
//                 <% } else { %>
//                   <img class="card-img-top" src="" alt="tea-image">
//                 <% } %>
//                 <div class="card-body">
//                   <li><h5><a style="text-decoration:none;color:black;" href='<%= user.favorite_teas[i].url %>'> <%= user.favorite_teas[i].tea_name %> </a></h5></li> 
//                   <li>Type: <%= user.favorite_teas[i].type %> </li> 
//                   <li>Brand: <%= user.favorite_teas[i].brand %> </li> 
//                   <li>Rating(out of 10): <%= user.favorite_teas[i].rating %> </li> 
//                   <li>Notes: <%= user.favorite_teas[i].notes %> </li> 
//                   <li>Added on: <%= user.favorite_teas[i].created_on.toDateString() %></li>
//                 </div>
//               </div>
//           <% } %>
//         </ul>
//       </div>
//   <% } %>
//   <% if(user.teas_added) { %>
//     <div class="container-fluid">
//       <h2 class="text-center mb-3">Teas Added:</h2>
//       <ul style="display:flex;justify-content:center;list-style: none;gap: 5px;">
//         <% for(let i = 0; i < user.teas_added.length; i++) { %>
//             <div class="card mr-2 border border-dark rounded" style="background-color:peachpuff;width: 18rem;">
//               <% if (user.teas_added[i].img.data) { %>
//                 <img class="card-img-top" src="data:image/<%= user.teas_added[i].img.contentType%>;base64,
//                 <%= user.teas_added[i].img.data.toString('base64') %>" alt="tea-image">
//               <% } else { %>
//                 <img class="card-img-top" src="" alt="tea-image">
//               <% } %>
//               <div class="card-body">
//                 <li><h5><a style="text-decoration:none;color:black;" href='<%= user.teas_added[i].url %>'> <%= user.teas_added[i].tea_name %> </a></h5></li> 
//                 <li>Type: <%= user.teas_added.type %> </li> 
//                 <li>Brand: <%= user.teas_added.brand %> </li> 
//                 <li>Rating(out of 10): <%= user.teas_added[i].rating %> </li> 
//                 <li>Notes: <%= user.teas_added[i].notes %> </li> 
//                 <li>Added on: <%= user.teas_added[i].created_on.toDateString() %></li>
//               </div>
//             </div>
//         <% } %>
//       </ul>
//     </div>
//   <% } %>
// </div>