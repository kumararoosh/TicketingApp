import React, {Component} from 'react';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            callback: this.props.setToken
        }
    }

    loginUser = async (credentials) => {
        return fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
        .then(data => data.json())
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const token = await this.loginUser({
            "username": this.state.username,
            "password": this.state.password
        });

        this.props.setToken(token);
        this.props.setLocalToken(token);
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
              <label>
                <p>Username</p>
                <input type="text" onChange={e => this.setState({username: e.target.value})}/>
              </label>
              <label>
                <p>Password</p>
                <input type="password" onChange={e => this.setState({password: e.target.value})}/>
              </label>
              <div>
                <button type="submit">Submit</button>
              </div>
            </form>
          )
    }
    
}