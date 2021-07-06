import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD1xfrFF0EMq0AaKcOoZOS2NgcvkdJ5hG4",
    authDomain: "reactemail-bf771.firebaseapp.com",
    projectId: "reactemail-bf771",
    storageBucket: "reactemail-bf771.appspot.com",
    messagingSenderId: "532365125095",
    appId: "1:532365125095:web:4f2fbc7379b115f81a0942",
    measurementId: "G-D00Y03H3QL"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig); 
export default class SignUp extends Component {

    constructor(props) {
        super(props);
       this.state =  {
          FirstName:"",
          LastName:"",
          Email:"",
          Password:"",
          loading: false,
          created: false
        }
        
    }

    onSubmitHandler = (e)=>{
        e.preventDefault();
        console.log(this.state);

        this.setState({loading: true});

var emailcollection =  this.state.Email;
        var db = firebase.firestore();
        db.collection(`users`).doc(`${emailcollection}`).set({
         //   db.collection(`users/${emailcollection}/${emailcollection}`).add({
            FirstName: this.state.FirstName,
            LastName: this.state.LastName,
            Email: this.state.Email,
            Password:this.state.Password,
        })
        .then((docRef) => {
            this.setState({loading: false, created:true});
            console.log("Document written with ID: ", docRef.id);
            
 
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });


    }



    onChangeHandler1 = (e)=>{
        this.setState({ FirstName :e.target.value});
    }
    onChangeHandler2 = (e)=>{
        this.setState({ LastName :e.target.value});
    }
    onChangeHandler3 = (e)=>{
        this.setState({ Email:e.target.value});
    }
    onChangeHandler4 = (e)=>{
        this.setState({ Password:e.target.value});
    }
    render() {
        if(this.state.loading){
        return <h1>Please wait as we process your registration request!...</h1>
        }else if(this.state.created){
return ( <div class="alert alert-success hidden" role="alert">
account creation was successfull please log in to continue sending emails!!

<Link className="navbar-brand btn btn-success" to={"/sign-in"}>Continue to your account</Link>
</div>);
        }else{

            return (
         
            <form onSubmit={this.onSubmitHandler}>
                <h3>Register</h3>
                

                


                <div className="form-group">
                    <label>First name</label>
                    <input   onChange={this.onChangeHandler1}required  name="firstname" value={this.state.FirstName}type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input  onChange={this.onChangeHandler2} required name="lastname" value={this.state.LastName} type="text" className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input  onChange={this.onChangeHandler3} required name="email" value={this.state.Email}type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input onChange={this.onChangeHandler4} required  name="password"value={this.state.Password} type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" name="registerBtn" className="btn btn-dark btn-lg btn-block">Register</button>
                <p className="forgot-password text-right">
                    Already registered <a href="#">log in?</a>
                </p>
            </form>);
        
        
    }
}}