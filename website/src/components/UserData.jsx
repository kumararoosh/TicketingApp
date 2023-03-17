import React, {Component} from 'react';
import { addUserData } from './AwsFunctions.jsx';
import uuid from 'react-uuid';

export default class UserData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const input = {
            id: uuid().toString(),
            name: this.state.name
        }

        addUserData("TicketingAppUsers", input);
    }

    render() {
        return (
            <div>
                <h1>UserData</h1>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>Name</p>
                        <input type="text" onChange={e => this.setState({name: e.target.value})}/>
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}