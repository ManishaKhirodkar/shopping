import React from "react";
import '../Styles/home.css';
import axios from "axios";
import Slider from "./Slider";
import Quicksearch from "./Quicksearch";

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            shoptypes:[]
        }
    }
    componentDidMount() {
        
        axios({
            method: 'GET',
            url: 'http://localhost:4578/shoptype',
            headers: { 'Content-type': 'application/json' }
        })
            .then(response => {
                this.setState({ shoptypes: response.data.shoptypes })
            })
            .catch(err => console.log(err));
    }
    render() {
        const { shoptypes} = this.state;
        return (
            <div>
                <Slider />
                <Quicksearch shoptypesData={shoptypes}/>

            </div>
        )
    }
}
export default Home;