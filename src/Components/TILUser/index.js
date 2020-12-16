import React from 'react';
import  UserContext from "../../UserContext";

class TILUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            learner: [],
            usernameState: ""
        }
    }

    componentDidMount() {
        let usernameX = localStorage.getItem('username') ;
        console.log(`localStorage on TILUser usernameX is: ${usernameX}`);
        const queryString = `
            query {
                user(username: "${usernameX}") {
                    _id
                    email
                    username
                    password
                    bio
                }
            }
            `;

        //fetch one user
        fetch('http://localhost:4005/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({query: queryString})
        }).
        then((response) => {
            console.log('theres json')
            return response.json()
        })
            .then((dataObject) => {
                console.log('inside AllLearners then stmt, value of dataObject.data:  ')
                // console.log(dataObject.data);
                // console.log('before setting state')
                // console.log(this.state.learners)
                this.setState({
                    learners: dataObject.data.user,
                    usernameState: usernameX,
                    bioState: dataObject.data.user.bio
                })
                console.log('after setting state and before bio')
                console.log(this.state.learners.bio)
                console.log('before this.props ')
                console.log(this.props)
            })
    }

    render() {

        return (

                    <div className="bodyContent">
                        <h1 className="usernameHeader">@{this.state.usernameState}</h1>
                        {/*<h1 className="usernameHeader">@{this.state.learners.username}</h1>*/}
                        <div className="bioContentContainer">
                            <h3 className="bioHeader">Bio:</h3>
                            <p className="bioContent">
                            {/*    {this.state.learners.bio}*/}
                                {this.state.bioState}
                            </p>
                        </div>
                    </div>
        )
                }

}

export default TILUser;