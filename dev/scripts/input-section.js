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
/*                 location: '',
                date: '',
                group: '',
                places: '',
                restaurants: '',
                highlights: '',
                allTrips: {} */
                location: '',
                date: '',
                group: '',
                places: '',
                places2: '',
                restaurants: '',
                highlights: '',
                allTrips: {}
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTravels = this.addTravels.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
    }
    componentDidMount(){
        const dbRef = firebase.database().ref();
        
        dbRef.on("value",(firebaseData) => {
            console.log(firebaseData.val());

            const travelArray = [];
            const travelData = firebaseData.val();

            for (let travelKey in travelData) {
                travelArray.push({
                });
            }
            this.setState({
                allTrips: travelData,
            })
        })
    }
    handleChange(e){
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        })
    }   
    addTravels(e){
        e.preventDefault();
/*         const newState = Object.assign(this.state) */
        const newTrip = {
/*             location: this.state.location,
            date: this.state.date,
            group: this.state.group,
            places: this.state.places,
            restaurants: this.state.restaurants,
            highlights: this.state.highlights */
            location: this.state.location,
            date: this.state.date,
            group: this.state.group,
            places: this.state.places,
            places2: this.state.places2,
            restaurants: this.state.restaurants,
            highlights: this.state.highlights

        }
        const travelDate = this.state["date"];  
         /* -------- */
        this.setState({
/*             location: '',
            date: '',
            group: '',
            places: '',
            restaurants: '',
            highlights: '' */
            location: '',
            date: '',
            group: '',
            places: '',
            places2: '',
            restaurants: '',
            highlights: '',
        })

        const usersRef = firebase.database().ref();

        usersRef.push(newTrip)
        /* -------- */
    }

    removeEntry(key){
        console.log(key)
// ref to location of that object in the database
// call the remove method
        const removeMe = firebase.database().ref(key);
        removeMe.remove();
    }
    render() {
        return (
            <div className="main-input-container">
                <form action="" className="form-input" onSubmit={this.addTravels}>
                    <fieldset className="date-location-input">
                        <label htmlFor="location-travelled">Location Travelled</label>
                        <input name="location" type="text" id="location-travelled" value={this.state.location} onChange={this.handleChange}/>
                        <label htmlFor="date-travelled">Date</label>
                        <input type="date" name="date" required="true" value={this.state.date} onChange={this.handleChange}/>
                    </fieldset>

                    <fieldset className="group-mates-input">
                        <label htmlFor="travel-mates">Who did you go with?</label>
                        <input name="group" type="text" id="travel-mates" value={this.state.group} onChange={this.handleChange}/>
                    </fieldset>

                    <fieldset className="places-input">
                        <label htmlFor="places-visited">Places You Visited</label>
                        <input name="places" type="text" id="places-visited1" value={this.state.places} onChange={this.handleChange}/>
                        <textarea name="places2" id="places-visited-textarea1" value={this.state.places2} onChange={this.handleChange}></textarea>
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
                    <div>
                     {Object.keys(this.state.allTrips).map((travels, i) => {

                            console.log(this.state.allTrips[travels].group, "hello")
                            const allTravels = this.state.allTrips[travels];
                            return (
                                <div key={allTravels}>
                                    <h2>{allTravels.date}</h2>
                                    <p>Places Visited: {allTravels.places}</p>
                                    <p>Went With: {allTravels.group}</p>
                                    <p>Restaurants Tried: {allTravels.restaurants}</p>
                                    <p>HIghlights of Trip: {allTravels.highlights}</p>
                                    <p>Places2: {allTravels.places2}</p>
                                    <button onClick={()=>this.removeEntry(travels)}>Delete</button>
                                </div>
                            )

                            })} 
                    </div>
                </div>
            </div>
        );
    }
}

