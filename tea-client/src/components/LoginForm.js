import React from 'react';

export default function LoginForm (props) {

    return (
        <form method="POST" action="/userlogin" className="loginform" id="loginform">
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="text" id="username" className="form-control" name="username" required="required"></input>
                        <label for="username" className="form-label">Username</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="password" id="password" name="password" required="required" className="form-control"></input>
                        <label for="password" className="form-label">Password</label>
                    </div>
                </div>
            </div>
            <button className="btn btn-info" type="submit">Log in</button>
        </form>
    )
}