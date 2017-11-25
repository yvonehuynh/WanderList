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
import ViewContent from "./view-contents";

const styles = {
    transition: 'opacity 2.3s ease-out'
}

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
                placesDescription: '',
                restaurants: '',
                resDescription: '',
                highlights: '',
                photo: '',
                allTrips: {},
                showForm: '',
                opacity: 1
        }
        this.handleChange = this.handleChange.bind(this);
        this.addTravels = this.addTravels.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
        this.uploadPhoto = this.uploadPhoto.bind(this);
        this.showMemories = this.showMemories.bind(this);
        this.showInputs = this.showInputs.bind(this);
        this.onHide = this.onHide.bind(this);
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
            [e.target.name]: e.target.value,
        })
    }   
    addTravels(e){
        e.preventDefault();
        const newTrip = {
            location: this.state.location,
            date: this.state.date,
            group: this.state.group,
            places: this.state.places,
            placesDescription: this.state.placesDescription,
            restaurants: this.state.restaurants,
            resDescription: this.state.resDescription,
            highlights: this.state.highlights,
            photo: this.state.photo

        }
        const travelDate = this.state["date"];  
         /* -------- */
        this.setState({
            location: '',
            date: '',
            group: '',
            places: '',
            placesDescription: '',
            restaurants: '',
            resDescription: '',
            highlights: '',
            photo: '',
            showForm: false
        })

        const usersRef = firebase.database().ref();


        usersRef.push(newTrip)
        this.state.photo = ''
        /* -------- */


    }

    removeEntry(key){
        console.log(key)
// ref to location of that object in the database
// call the remove method
        const removeMe = firebase.database().ref(key);
        removeMe.remove();
        const removePhoto = firebase.storage.ref();
        removePhoto.remove();
    }

    ///////////////

    uploadPhoto(e) {
        console.log('photo upload begin')
        this.setState({
            show: true
        })
        let file = e.target.files[0];
        const storageRef = firebase.storage().ref('photos/' + file.name);
        const task = storageRef.put(file).then(() => {
            const urlObject = storageRef.getDownloadURL().then((data) => {
                console.log('photo upload DONE')
                this.setState({
                    photo: data,
                })
            })
        });

    }
    showMemories() {
        console.log("HELLO THERE");
        this.setState({
            showForm: true,
        })
    }

    showInputs(){
        console.log("I AM HERE");
        this.setState({
            showForm: false,
            opacity: 1
        })
    }
    //////////////

    onHide(){
        this.setState={
            opacity: 0
        }
    }
    render() {
        let contentForm = (
            <form action="" className="form-input" onSubmit={this.addTravels} style={{styles, opacity: this.state.opacity}}>
                <div className="form-container">
                    <fieldset className="date-location-input">
                        <label htmlFor="location-travelled">Destination</label>
                        <input name="location" type="text" id="location-travelled" value={this.state.location} onChange={this.handleChange} />
                        <label htmlFor="date-travelled">Date</label>
                        <input type="date" name="date" required="true" value={this.state.date} onChange={this.handleChange} />
                    </fieldset>

                    <fieldset className="group-mates-input">
                        <label htmlFor="travel-mates">Who did you go with?</label>
                        <input name="group" type="text" id="travel-mates" value={this.state.group} onChange={this.handleChange} />
                    </fieldset>

                    <fieldset className="places-input">
                        <label htmlFor="places-visited">Places You Visited</label>
                        <input name="places" type="text" id="places-visited1" value={this.state.places} onChange={this.handleChange} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="places-visited-textarea1">Places Description</label>
                        <textarea name="placesDescription" id="places-visited-textarea1" value={this.state.placesDescription} onChange={this.handleChange}></textarea>
                    </fieldset>

                    <fieldset className="restaurants-input">
                        <label htmlFor="res-visited">Restuarants / Food Tried</label>
                        <input name="restaurants" type="text" id="res-visited" value={this.state.restaurants} onChange={this.handleChange} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="res-textarea">Restaurant Descirption</label>
                        <textarea name="resDescription" id="res-textarea" value={this.state.resDescription} onChange={this.handleChange}></textarea>
                    </fieldset>

                    <fieldset className="highlights-input">
                        <label htmlFor="highlights">Highlights of Trip</label>
                        <textarea name="highlights" id="highlight-textarea" cols="30" rows="10" value={this.state.highlights} onChange={this.handleChange}></textarea>
                        {/* ------------------- */}
                        <input type="file" accept="image/*" onChange={this.uploadPhoto} />
                        {/* -------------------- */}
                    </fieldset>
                </div>
                <input type="submit" />
            </form>
        );
        let contentDisplay = (
            <div className="contents-container" style={{ styles, opacity: this.state.opacity }}>
                {Object.keys(this.state.allTrips).map((travels, i) => {

                    console.log(this.state.allTrips[travels].group, "hello")
                    const allTravels = this.state.allTrips[travels];
                    return (

                        <details>
                            <summary>
                                <h2>{allTravels.date}</h2>
                            </summary>
                            <div className="summary-content">
                                <h3 className="sub-heading">Places Visited:</h3>
                                <p className="para">{allTravels.places}</p>
                                <h3 className="sub-heading">Description</h3>
                                <p className="para">{allTravels.placesDescription}</p>
                                <h3 className="sub-heading">Went With</h3>
                                <p className="para">{allTravels.group}</p>
                                <h3 className="sub-heading">Restaurants Tried</h3>
                                <p className="para">{allTravels.restaurants}</p>
                                <h3 className="sub-heading">Description</h3>
                                <p className="para">{allTravels.resDescription}</p>
                                <h3 className="sub-heading">HIghlights</h3>
                                <p className="para">{allTravels.highlights}</p>
                                <div>Photos:
                                    <img src={allTravels.photo} alt="" />
                                </div>
                                <button onClick={() => this.removeEntry(travels)}>Delete</button> 
                            </div>
                        </details>
                    )
                })}
            </div>
        )
        return (
            <div className="main-input-container">
                <form className="greeting-container">
                    <label htmlFor="view">View memories</label>
                    <input name="view" type="radio" id="view" onChange={this.showInputs}/> 
                    <label htmlFor="add">Add memories</label>
                    <input name="view" type="radio" id="add" onChange={this.showMemories}/>
                </form>
                {this.state.showForm ? contentForm : contentDisplay}
            </div>
        );
    }
}

// app needs a method that is reponsible for setting the state is true or false

// this method should be called on change, of radio buttons that live in the viewcontent

// pass the method as a prop to the view content compoenent
// inside viewcontent, we have an onchange listener on the forms, that calls this prop and passes the of what input is currently selected to the method which is on the app

