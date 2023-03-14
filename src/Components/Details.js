import React from "react";
import queryString from 'query-string';
import axios from "axios";
import Modal from "react-modal";
import '../Styles/details.css';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'aliceblue',
        overflow: 'auto',
        border: '1px solid'
    },
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            product: [],
            formsModalIsOpen: false,
            subTotal: 0,
            name: undefined,
            email: undefined,
            contact: undefined,
            address: undefined
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
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }
    handleInputChange = (state, event) => {
        this.setState({ [state]: event.target.value });
    }
    isDate(val) {
        // Cross realm comptatible
        return Object.prototype.toString.call(val) === '[object Date]'
    }

    isObj = (val) => {
        return typeof val === 'object'
    }

    stringifyValue = (val) => {
        if (this.isObj(val) && !this.isDate(val)) {
            return JSON.stringify(val)
        } else {
            return val
        }
    }

    buildForm = ({ action, params }) => {
        const form = document.createElement('form')
        form.setAttribute('method', 'post')
        form.setAttribute('action', action)

        Object.keys(params).forEach(key => {
            const input = document.createElement('input')
            input.setAttribute('type', 'hidden')
            input.setAttribute('name', key)
            input.setAttribute('value', this.stringifyValue(params[key]))
            form.appendChild(input)
        })
        return form
    }

    post = (details) => {
        const form = this.buildForm(details)
        document.body.appendChild(form)
        form.submit()
        form.remove()
    }

    getData = (data) => {
        return fetch(`http://localhost:4578/payment`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).catch(err => console.log(err))
    }

    handlePayment = (event) => {

        const { subTotal, email } = this.state;

        if (!email) {
            alert('Please fill this field and then Proceed...');
        }
        else {
            // Payment API Call 
            const paymentObj = {
                amount: subTotal,
                email: email
            };

            this.getData(paymentObj).then(response => {
                var information = {
                    action: "https://securegw-stage.paytm.in/order/process",
                    params: response
                }
                this.post(information)
            })
        }
        event.preventDefault();
    }
    render() {
        const { product, formsModalIsOpen, subTotal } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="rectangle">
                                {/* <img src={`./${product.image}`} height="400px" alt="" />*/}
                               
                                        <Carousel
                                            showIndicators={false}
                                            showThumbs={false}
                                            infiniteLoop={true}
                                            autoPlay={true}
                                            dynamicHeight={true}
                                        >

                                            {product && product.thumb && product.thumb.map(item => {
                                                return <div className="car_img">
                                                    <img height="450px" width="100%" className="carl_img"
                                                        src={`./${item}`} />
                                                </div>
                                            })}
                                        </Carousel>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="rectangle1">
                                <h2 className="ms-3"> {product.name}</h2>
                                <p className="ms-3 fw-bolder">Rating ({product.aggregate_rating})<i className="bi bi-star-fill"></i></p>
                                <div className="price">₹ {product.price}</div>
                                <div className="text">Inclusive of all taxes</div>
                                <button className="btn btn-danger ms-4" onClick={() => {
                                    this.handleModal('formsModalIsOpen', true);
                                }} >Place Online Order</button>
                                <p className="ms-4 mt-4">{product.product_details}</p>

                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={formsModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="bi bi-file-x" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('formsModalIsOpen', false)}></div>
                        <form>
                            <label className="form-label">Name</label>
                            <input style={{ width: '100%' }} type="text" className="form-control" onChange={(event) => this.handleInputChange('name', event)} />
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" onChange={(event) => this.handleInputChange('email', event)} />
                            <label className="form-label">Contact Number</label>
                            <input type="text" className="form-control" onChange={(event) => this.handleInputChange('contact', event)} />
                            <label className="form-label">Address</label>
                            <input type="text" className="form-control" onChange={(event) => this.handleInputChange('address', event)} />
                            <button className="btn btn-danger" style={{ marginTop: '20px', float: 'right' }} onClick={this.handlePayment}>Proceed</button>
                        </form>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default Details;
