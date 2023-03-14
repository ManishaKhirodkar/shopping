import React from "react";
import { withRouter } from 'react-router-dom';

class QuicksearchItems extends React.Component {

    handleNavigate = (shoptypeId) => {
        this.props.history.push(`/sort?shoptype=${shoptypeId}`);
    }
    render() {
        const { qsData } = this.props;
        return (
            <div className="col-lg-4 col-md-6 col-sm-12" onClick={() => this.handleNavigate(qsData.shop_type)}>
                <div className="item">
                    <img src={`./${qsData.image}`} alt="no image found" style={{ borderRadius: "0 0 20px 20px" }} height="350"
                        width="100%" /><h2 style={{margin: "11px 0 0 0" , textAlign: "center"}}>{qsData.name}</h2>

                </div>
            </div>
        )
    }
}

export default withRouter(QuicksearchItems);