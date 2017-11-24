import React from "react";
import reactDOM from "react-dom";

export default class FileInput extends React.Component {
    constructor(){
        super();
        this.state({

        })
        this.uploadPhoto = this.uploadPhoto.bind(this);
    }
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
    render(){
        return (
            <input type="file" accept="image" name="imageFile" onChange={this.uploadPhoto}/>
        )
    }
}