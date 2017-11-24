import React from 'react';
import $ from 'jquery';
// import Modal from './modal.js';
import {
    BrowserRouter as Router,
    Route, Link
} from 'react-router-dom';


// const dbRef = firebase.database().ref('/');
const display = {
    display: 'block'
};
const hide = {
    display: 'none'
};


export default class ImageUpload extends React.Component {
    constructor() {
        super();
        this.state = {
            currentImage: 'https://s10.postimg.org/juk46hpop/img_Placeholder.png',
            contrast: '100',
            brightness: '100',
            saturate: '100',
            sepia: '0',
            invert: '0',
            toggle: false
        }
        this.handleFile = this.handleFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
        this.saveChange = this.saveChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }
    handleFile(e) {
        this.setState({
            value: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        var file = this.file.files[0]
        console.log(file)
        const imgUrl = this.state.value

        var storageRef = firebase.storage().ref();
        //create a space for the image in the storageRef.child in firebase.
        const mainImage = storageRef.child(this.file.files[0].name)
        this.setState({
            currentImage: '../../../assets/loader.gif'
        })
        //upload file
        mainImage.put(file).then((snapshot) => {

            //get url from uploaded image
            mainImage.getDownloadURL().then((url) => {
                console.log(url);
                this.setState({
                    //add url to current image to put onto the page
                    currentImage: url
                })
            })
        });
    }
    resetFilters(e) {
        e.preventDefault();
        this.setState({
            contrast: '100',
            brightness: '100',
            saturate: '100',
            sepia: '0',
            invert: '0'
        })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    saveChange(e) {
        e.preventDefault();
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));

        const photoEdit = {
            url: this.state.currentImage,
            contrast: this.state.contrast,
            brightness: this.state.brightness,
            saturate: this.state.saturate,
            sepia: this.state.sepia,
            invert: this.state.invert,
        }
        firebase.database().ref('/').push(photoEdit);
        console.log('its been saved!');


        //show modal here ///////////////////

    }
    toggle(e) {
        e.preventDefault();
        this.setState(prevState => ({
            toggle: !prevState.toggle
        }));
    }
    // for in over each object, display image on the page
    render() {
        var modal = [];
        modal.push(
            <div className="modal" style={this.state.toggle ? display : hide}>
                <div className="modal-content">

                    <a href="" className="close" onClick={this.toggle}></a>
                    <h3>Your photo looks great!</h3>
                </div>
                <div className="modalFooter">
                    <a className="btn" href="https://filtergram-62c8d.firebaseapp.com/view">View Your Post</a>
                    <h2>OR</h2>
                    <a className="btn" href="https://filtergram-62c8d.firebaseapp.com/" >Edit Another Photo</a>
                </div>
            </div>
        );
        return (
            <div className="canvas">
                {modal}
                <div className="imgContainer">
                    <img
                        src={this.state.currentImage}
                        alt=""
                        style={{
                            WebkitFilter:
                                `contrast(${this.state.contrast}%)` +
                                `brightness(${this.state.brightness}%)` +
                                `saturate(${this.state.saturate}%)` +
                                `sepia(${this.state.sepia}%)` +
                                `invert(${this.state.invert}%)`
                        }}
                    />
                </div>

                <div className="sideBar">
                    <div className="uploadImage" >
                        <form onSubmit={this.handleSubmit}>
                            <input type="file" ref={(ref) => { this.file = ref }} />
                            <input className="uploadBtn" type="submit" value="upload" />
                        </form>
                    </div>
                    <form className="filters">
                        <div>
                            <h2>Contrast:</h2>
                            <input
                                type="range"
                                name="contrast"
                                value={this.state.contrast}
                                min="0"
                                max="200"
                                onChange={this.handleChange}
                            />
                            <h2>Brightness:</h2>
                            <input
                                type="range"
                                name="brightness"
                                value={this.state.brightness}
                                min="0"
                                max="200"
                                onChange={this.handleChange}
                            />
                            <h2>Saturation:</h2>
                            <input
                                type="range"
                                name="saturate"
                                value={this.state.saturate}
                                min="0"
                                max="200"
                                onChange={this.handleChange}
                            />
                        </div>
                        <div>
                            <h2>Sepia:</h2>
                            <input
                                type="range"
                                name="sepia"
                                value={this.state.sepia}
                                min="0"
                                max="100"
                                onChange={this.handleChange}
                            />

                            <h2>Invert:</h2>
                            <input
                                type="range"
                                name="invert"
                                value={this.state.invert}
                                min="0"
                                max="100"
                                onChange={this.handleChange}
                            />
                        </div>
                    </form>

                    <div className="buttonContainer">
                        <form className="resetForm" onSubmit={this.resetFilters}>
                            <input type="submit" value="RESET" className="resetBtn" />
                        </form>
                        <form className="saveForm" onSubmit={this.saveChange}>
                            <input type="submit" value="Save Image" className="saveBtn" />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
