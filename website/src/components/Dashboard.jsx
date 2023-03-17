import React, {Component} from 'react';
import { fetchData } from './AwsFunctions';

export default class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    setStateCallback = (val) => {
        this.setState(val);
    }

    updateUsersList = async (e) => {
        e.preventDefault();
        await fetchData("TicketingAppUsers", this.setStateCallback);

    }

    render() {

        console.log(this.state)

        let list = [];

        this.state.users.forEach(val => list.push(<li key={val.id}>{val.name}</li>))

        return (
            <h2>
                Dashboard
                <button onClick={this.updateUsersList}>Update list</button>
                <ul>
                    {list}
                </ul>
            </h2>
        );
    }
}