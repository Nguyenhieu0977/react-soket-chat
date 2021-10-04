import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import { Container } from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Container>
                <h1>Home</h1>
                <p>
                    <Link to="/login/">Login</Link>
                </p>
                <p>
                    <Link to="/signup">Sign up</Link>
                </p>
                <p>
                    <Link to="/dashboard">Dashboard</Link>
                </p>
                <p>
                    <Link to="/event">Events</Link>
                </p>
            </Container>
        )
    }
}

export default withRouter(Home);