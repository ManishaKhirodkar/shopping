import React from "react";
import axios from "axios";
import queryString from 'query-string';
import '../Styles/orders.css';

class Orders extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            subTotal: 0,
            product: []
        }
    }
    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);
        const { product } = qs;
        axios({
            method: 'GET',
            url: `http://localhost:4578/products/${product}`,
            headers: { 'Content-type': 'application/json' }
        })
            .then(response => {
                this.setState({ product: response.data.product })
            })
            .catch(err => console.log(err));
    }
   
    render() {
        const { products,subTotal,product } = this.state;
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <h2 className="tct"> Orders Details </h2>
                        {products.map(item=>{
                            return <div><h5 className="card-title">Product Name :{item.name}</h5></div>
                        })}

                        {/* {products.map((item) => {
                            return 
                           <div className="card mb-3 cardo" >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={`./${item.image}`} className="img-fluid rounded-start" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body" style={{ margin: "16px 0 0 62px;" }}>
                                            <h5 className="card-title">Product Name :{item.name}</h5>
                                            <p className="card-text">SubTotal : {item.price}</p>
                                            <button className="btn btn-success"> Pay Now</button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        
                        })}*/}

                    </div>
                </div>
            </div>
        )
    }
}

export default Orders;