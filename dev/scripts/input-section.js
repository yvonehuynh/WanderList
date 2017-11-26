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
        // default states
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
                opacity: 1,
                defaultChecked: true,
                checked: true
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
        this.setState({
            [e.target.name]: e.target.value,
        })
    }   

// Submit Form
    addTravels(e){
        e.preventDefault();
        // update the state with what was inputted
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
        // empty the form when submitted 
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
            showForm: false,
            checked: true
        })

        const usersRef = firebase.database().ref();
        usersRef.push(newTrip)
        this.state.photo = ''
    }

    // delete entries
    removeEntry(key){
        const removeMe = firebase.database().ref(key);
        removeMe.remove();
    }

    // upload photos
    uploadPhoto(e) {
        this.setState({
            showImage: true
        })
        let image = e.target.files[0];
        const storageRef = firebase.storage().ref('photos/' + image.name);
        const imageLink = storageRef.put(image).then(() => {
            const urlObject = storageRef.getDownloadURL().then((data) => {
                this.setState({
                    photo: data
                })
            })
        });
    }

    // Show Travel Details
    showMemories() {
        this.setState({
            showForm: true,
        })
    }

    // Show Form
    showInputs(){
        this.setState({
            showForm: false,
            opacity: 1,
        })
    }

    // Styles
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
                        <input name="location" type="text" id="location-travelled" maxLength="26" value={this.state.location} onChange={this.handleChange} />
                        <label htmlFor="date-travelled">Date</label>
                        <input type="date" name="date" required="true" value={this.state.date} onChange={this.handleChange} />
                    </fieldset>

                    <fieldset className="group-mates-input">
                        <label htmlFor="travel-mates">Who did you go with?</label>
                        <input name="group" type="text" id="travel-mates" value={this.state.group} onChange={this.handleChange} />
                    </fieldset>

                    <fieldset className="places-input">
                        <label htmlFor="places-visited">Places You Visited</label>
                        <input name="places" type="text" id="places-visited1" maxLength="40" value={this.state.places} onChange={this.handleChange} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="places-visited-textarea1">Places Description</label>
                        <textarea name="placesDescription" id="places-visited-textarea1" maxLength="200" value={this.state.placesDescription} onChange={this.handleChange}></textarea>
                    </fieldset>

                    <fieldset className="restaurants-input">
                        <label htmlFor="res-visited">Restuarants / Food Tried</label>
                        <input name="restaurants" type="text" id="res-visited" maxLength="26" value={this.state.restaurants} onChange={this.handleChange} />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="res-textarea">Restaurant Descirption</label>
                        <textarea name="resDescription" id="res-textarea" maxLength="200" value={this.state.resDescription} onChange={this.handleChange}></textarea>
                    </fieldset>

                    <fieldset className="highlights-input">
                        <label htmlFor="highlights">Highlights of Trip</label>
                        <textarea name="highlights" id="highlight-textarea" maxLength="200" value={this.state.highlights} onChange={this.handleChange}></textarea>
                        <input type="file" accept="image/*" onChange={this.uploadPhoto} />
                    </fieldset>
                </div>
         
                <input type="submit" />
            </form>
        );
        let contentDisplay = (
            <div className="contents-container" style={{ styles, opacity: this.state.opacity }}>
                {Object.keys(this.state.allTrips).map((travels, i) => {
                    const allTravels = this.state.allTrips[travels];
                    return (

                        <details>
                            <summary>
                                <h2>{allTravels.location} {allTravels.date}</h2>
                            </summary>
                            <div className="summary-content">
                                <div className="controls">
                                    <h2>{allTravels.location} {allTravels.date}</h2>
                                    <button className="delete-button" onClick={() => this.removeEntry(travels)}>Delete</button> 
                                </div>
                                <div className="travel-info">
                                    <div className="travel-summary">
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
                                    </div>
                                    <div className="image-holder">:
                                        <img src={allTravels.photo} alt="" />
                                    </div>
                                </div>
                               
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
                    <input name="view" type="radio" id="view" onChange={this.showInputs} defaultChecked={this.state.checked}/> 
                    <label htmlFor="add">Add memories</label>
                    <input name="view" type="radio" id="add" onChange={this.showMemories}/>
                </form>
                {this.state.showForm ? contentForm : contentDisplay}
            </div>
        );
    }
}

