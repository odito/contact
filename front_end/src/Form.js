import React, { Component } from 'react';
import axios from 'axios';


export default class Form extends Component {


state={
    name:'',
    lastname:'',
    email:'',
    message:'',
    sent:false,
    buttonText: 'Send Message',

}


// handle inputs 

handleName = (e)=>{
this.setState({
  name:e.target.value
})
}

handleLastname = (e)=>{
  this.setState({
    lastname:e.target.value
  })
  }

handleEmail = (e)=>{
  this.setState({
    email:e.target.value
  })
  }

handleMessage = (e)=>{
  this.setState({
    message:e.target.value
  })
  }

// end of handle inputs





formSubmit=(e)=>{
  e.preventDefault();
 
 
  
  let data = {
    name:this.state.name,
    lastname:this.state.lastname,
    email:this.state.email,
    message:this.state.message
  }



  
  axios.post('/api/forma',data)
  .then(res=>{
    this.setState({
      sent:true,
    },this.resetForm())
  })
  .catch(()=>{
    console.log('message not send');
    
  })
  
 
 }

// for reseting the form data
resetForm=()=>{
  this.setState({
    name:'',
    lastname:'',
    message:'',
    email:'',
  
  })

  setTimeout(()=>{
    this.setState({
      sent:false,
    
    

    })
  },3000)
}








    render() {
        return (
            <div className="container">
            <form onSubmit={this.formSubmit}>
            
            <div className="singleItem">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" className="name" value={this.state.name} onChange={this.handleName} placeholder="your name..." />
            </div>
      
            <div className="singleItem">
              <label htmlFor="lastname">Lastname</label>
              <input type="text" name="lastname" className="lastname" value={this.state.lastname} onChange={this.handleLastname} placeholder="your lastname..." />
            </div>
      
            <div className="singleItem">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" className="email" value={this.state.email} onChange={this.handleEmail} placeholder="your email..." required />
            </div>
      
            <div className="textArea singleItem">
            <label htmlFor="message">Message</label>
              <textarea name="message" value={this.state.message} id="" cols="30" rows="5" placeholder="your message..." onChange={this.handleMessage}></textarea>
            </div>
      
             
             <div className={this.state.sent?'msg msgAppear':'msg'}>Message has been sent</div>
            <div className="btn">
            <button type="submit">Submit</button>
            </div>
      
      
           </form>
          </div>
        )
    }
}
