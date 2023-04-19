import React from 'react';


export default function TeaForm(props) {


    return (
        <form method="POST" action="/teas/create" className="teaform" id="newteaform" encType="multipart/form-data">
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                    <input type="text" id="teaname" className="form-control" name="teaname" placeholder="Tea" required="required" maxLength="50"></input>
                    <label htmlFor="teaname" className="form-label">Tea Name</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="text" id="brand" className="form-control" name="brand" placeholder="Brand" maxLength="30"></input>
                        <label htmlFor="brand" className="form-label">Brand</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6 mb-3">
                    <div className="form-floating">
                        <select className="form-select" id="type" aria-label="new tea type" name="type">
                            <option value="Green">Green</option>
                            <option value="Black">Black</option>
                            <option value="Oolong">Oolong</option>
                            <option value="Herbal">Herbal</option>
                            <option value="White">White</option>
                            <option value="Unknown">Unknown</option>
                        </select>
                        <label htmlFor="type" className="form-label">Type of Tea</label>
                    </div>
                </div>
                <div className="form-group col-md-6 mb-3">
                    <div className="form-floating">
                        <select className="form-select" id="rating" name="rating" aria-label="new tea rating">
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                        </select>
                        <label htmlFor="rating" className="form-label">Rating</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <textarea className="form-control" style={{height: "220px"}} id="notes" placeholder="Notes about this tea" name="notes" maxLength="400" ></textarea>
                        <label htmlFor="notes" className="form-label">Notes on Tea</label>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="form-group col-lg-12 mb-3">
                    <div className="form-floating">
                        <input type="file" className="form-control" id="teaimg" name="teaimg"></input>
                        <label htmlFor="teaimg" className="form-label">Upload Picture</label>
                    </div>
                </div>
            </div>
            <button className="btn btn-info" type="submit">Submit</button>
        </form>
    )
}
