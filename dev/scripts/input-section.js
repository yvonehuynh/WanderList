// Main Inputs Page
// inputs include:
/* 
- date
- location
- people you went with
- restaurants visited
- places visited- food tried
- highlights
- photos (?)
 */

import React from "react";
import reactDOM from "react-dom";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyD9UKxhSseeO292lJA84A8gugZ3VkgUofs",
    authDomain: "wanderlist-b1a09.firebaseapp.com",
    databaseURL: "https://wanderlist-b1a09.firebaseio.com",
    projectId: "wanderlist-b1a09",
    storageBucket: "wanderlist-b1a09.appspot.com",
    messagingSenderId: "1077024295721"
};
firebase.initializeApp(config);


export default class Inputs extends React.Component {
    constructor(){
        super();
        this.state ={
                location: '',
                date: '',
                group: '',
                places: '',
                restaurants: '',
                highlights: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTravels = this.addTravels.bind(this);
    }
    componentDidMount(){
        
    }
    handleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }   
    addTravels(e){
        e.preventDefault();
        const newState = Object.assign(this.state)
        /* -------- */
        this.setState({
                location: '',
                date: '',
                group: '',
                places: '',
                restaurants: '',
                highlights: ''
        })
        const dbRef = firebase.database().ref();
        dbRef.push(newState)
        /* -------- */
    }
    render() {
        return (
            <div className="main-input-container">
                <form action="" className="form-input" onSubmit={this.addTravels}>
                    <fieldset className="date-location-input">
                        <label htmlFor="location-travelled">Location Travelled</label>
                        <input name="location" type="text" id="location-travelled" value={this.state.location} onChange={this.handleChange}/>
                        <label htmlFor="date-travelled">Date</label>
                        <input name="date" type="date" id="date-travelled" value={this.state.date}/>
                    </fieldset>

                    <fieldset className="group-mates-input">
                        <label htmlFor="travel-mates">Who did you go with?</label>
                        <input name="group" type="text" id="travel-mates" value={this.state.group} onChange={this.handleChange}/>
                    </fieldset>

                    <fieldset className="places-input">
                        <label htmlFor="places-visited">Places You Visited</label>
                        <input name="places" type="text" id="places-visited1" value={this.state.places} onChange={this.handleChange}/>
                        <textarea name="places" id="places-visited-textarea1" cols="30" rows="10"></textarea>
                    </fieldset>

                    <fieldset className="restaurants-input">
                        <label htmlFor="res-visited">Restuarants / Food Tried</label>
                        <input name="restaurants" type="text" id="res-visited" value={this.state.restaurants} onChange={this.handleChange}/>
                        <textarea name="restaurants" id="res-textarea" cols="30" rows="10"></textarea>
                    </fieldset>
                    <fieldset className="highlights-input">
                        <label htmlFor="highlights">Highlights of Trip</label>
                        <textarea name="highlights" id="highlight-textarea" cols="30" rows="10" value={this.state.highlights} onChange={this.handleChange}></textarea>
                    </fieldset>
                    <input type="submit"/>
                </form>
                <div className="contents-container">
                    <ul>
                        {Object.keys(this.state).map((travels) => {
                            const myTravel = this.state[travels]
                            return (
                            <li key={travels}>
                                : {myTravel}
                            </li>)
                    })}
                    </ul>
                </div>
            </div>
        );
    }
}






{/*                     {this.state.map((travels) => {
                        return 
                            <li key={travels.date}>
                              Summary: {travels}
                            </li>
                                <li key={travels.date}>
                             Location: {travels.location}
                            </li>
                            <li key={travels.date}>
                              Date:  {travels.date}
                            </li>
                            <li key={travels.date}>
                             Who you went with:   {travels.groups}
                            </li>
                            <li key={travels.date}>
                             Places Visited   {travels.places}
                            </li>
                            <li key={travels.date}>
                             Restuarants tried:   {travels.restaurants}
                            </li>
                            <li key={travels.date}>
                                HIghlights: {travels.highlights}
                            </li>
                    })}; */}