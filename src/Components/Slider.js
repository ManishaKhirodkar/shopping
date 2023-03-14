import React from "react";
import {withRouter} from 'react-router-dom';

class Slider extends React.Component {
    handleNavigate=()=>{
        this.props.history.push('./sort');
    }
    render() {
        return (
            <div>
                <div id="demo" className="carousel slide" data-bs-ride="carousel">

                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="./Assets/women15.jpg" alt="no image" className="d-block w-100" onClick={this.handleNavigate}/>
                        </div>
                        <div className="carousel-item">
                            <img src="./Assets/TSHIRT.jpg" alt="no image" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src="./Assets/HB4_BhuwalFashion_W_SYM_06April22.jpg" alt="no image" className="d-block w-100" />
                        </div>
                        <div className="carousel-item">
                            <img src="./Assets/kids13.jpg" alt="no image" className="d-block w-100" />
                        </div>
                    </div>


                    <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter(Slider);