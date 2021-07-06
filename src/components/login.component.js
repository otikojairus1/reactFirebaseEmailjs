import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import emailjs from 'emailjs-com';
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
// const firebaseConfig = {
//     apiKey: "AIzaSyD1xfrFF0EMq0AaKcOoZOS2NgcvkdJ5hG4",
//     authDomain: "reactemail-bf771.firebaseapp.com",
//     projectId: "reactemail-bf771",
//     storageBucket: "reactemail-bf771.appspot.com",
//     messagingSenderId: "532365125095",
//     appId: "1:532365125095:web:4f2fbc7379b115f81a0942",
//     measurementId: "G-D00Y03H3QL"
//   };
  
  // Initialize Firebase
//   firebase.initializeApp(firebaseConfig); 


export default class Login extends Component {

    constructor(props) {
        super(props);
       this.state =  {
        
          Email:"",
          Password:"",
          loading: false,
          created: false,
          message:"",
          resume:"",
          receiverEmail:"",
          responce: ""
        }
        
    }


    messagehandler = (e)=>{
        console.log("messageHandler");
        this.setState({ resume :e.target.value});
    }

    emailHandler = (e) => {
        this.setState({ receiverEmail :e.target.value});
    }
    sendEmail = (e)=>{
        e.preventDefault();
        //console.log("sent email");

        emailjs.sendForm('service_da4nvzg', 'contact_form', e.target, 
        'user_0hscdH5UMFEEYgxJlIpM')
        .then((result) => {
            console.log(result.text);
            this.setState({responce: "your email was sent successfully!!"});
        }, (error) => {
            console.log(error.text);
        });
        //this.setState({ Email :e.target.value});
    }

    onChangeHandler3 = (e)=>{
        this.setState({ Email :e.target.value});
    }
    onChangeHandler4 = (e)=>{
        this.setState({ Password :e.target.value});
    }

    onSubmitHandler = (e)=>{
        e.preventDefault();
        //console.log(this.state);
        this.setState({loading:true});

        var docRef = firebase.firestore().collection(`users`).doc(`${this.state.Email}`);

        docRef.get().then((doc) => {
            if (doc.exists) {
                console.log("Document data:", doc.data().Password);
                if(doc.data().Password !== this.state.Password ){
                    this.setState({loading:false, created:false, message:"incorrect password"});
                }else{
                this.setState({loading:false, created:true, message:""});
                }

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                if(doc.data() == undefined){
                    this.setState({loading:false, message: "incorrect user credentials, try again!!"});
                }
                
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });




    }
   
    render() {

if(this.state.loading){
return <h1>Logging in!</h1>
}else if(this.state.created){
    return(
    
    
    
    
        <form onSubmit={this.sendEmail}>
            <h1>Send your Resume to your friend's email address</h1>

            {this.state.responce}
        <div class="form-group">
          <label for="exampleInputEmail1">Receiver's Email address</label>
          <input type="email"value={this.state.receiverEmail} onChange={this.emailHandler} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
          <small id="emailHelp" class="form-text text-muted">make sure the receiver's email is a valid one.</small>
        </div>
        <div className="form-group">
        <textarea className="form-control" value={this.state.resume}onChange={this.messagehandler}placeholder="type your resume here"></textarea>
        </div>
   
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    
    
    
    
    
    
    
    
    
    
    );

}else{

        return (
            <form onSubmit={this.onSubmitHandler}>

                <h3>Log in</h3>

{this.state.message}
                <div className="form-group">
                    <label>Email</label>
                    <input   onChange={this.onChangeHandler3}required  name="firstname" value={this.state.Email}type="text" className="form-control" placeholder="Email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input  onChange={this.onChangeHandler4} required name="lastname" value={this.state.Password} type="text" className="form-control" placeholder="Password" />
                </div>

                <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
        );
    }}
}
