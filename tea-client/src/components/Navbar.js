import React from 'react';
import LoginForm from './LoginForm';

export default function Navbar(props) {

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "turquoise"}}>
            <div className="collapse navbar-collapse" id="navbarsupportedcontent">
                <ul className="navbar-nav">
                    {props.currentuser ? 
                    <li class="nav-item active"><a class="nav-link" href="/teas">{props.currentuser.username}</a></li> :
                    <li className="nav-item"><a className="nav-link" href="/user/create">Sign up</a></li>
                    }
                    <li className="nav-item"><a className="nav-link" href="/teas/tealist">Teas</a></li>
                    <li className="nav-item"><a className="nav-link" href="/teas/create">Add New Tea</a></li>
                    {props.currentuser ? 
                    <li className="nav-item"><a className="nav-link" href="<%= currentuser.url %>">Profile</a></li>:
                    <li>
                        <li className="nav-item"><a className="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginmodal">Log in</a></li>
                        <div className="modal fade" id="loginmodal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header text-centered">
                                        <h3>Log in to your account!</h3>
                                        <button className="btn-close" data-bs-dismiss="modal" data-bs-target="#loginmodal"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div>
                                            <LoginForm />
                                        </div>
                                    </div>
                                </div>
                            </div>                        
                        </div>
                    </li>
                    }
                    <li class="nav-item"><a class="nav-link" href="/user/userlist">Friends</a></li>
                </ul>
            </div>
      </nav>
    )
}