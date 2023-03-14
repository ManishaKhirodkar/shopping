import React from "react";
import '../Styles/sort.css';
import queryString from 'query-string';
import axios from "axios";

class Sort extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            shoptype: undefined,
            lcost: undefined,
            hcost: undefined,
            brand: undefined,
            occasion: [],
            sort: 1,
            page: 1,
            pageCount: []
        }
    }
    componentDidMount = () => {
        const qs = queryString.parse(this.props.location.search); // parse the string to the object qs , to capture the value which coming in querystring
        const { shoptype } = qs;

        const sortObj = {
            shoptype: Number(shoptype)
        }
        axios({
            method: 'POST',
            url: 'http://localhost:4578/filter',
            headers: { 'Content-type': 'application/json' },
            data: sortObj
        })
            .then(response => {
                this.setState({
                    products: response.data.products,
                    shoptype,
                    pageCount: response.data.pageCount
                })
            })
            .catch(err => console.log(err));
    }
    handleSort = (sort) => {
        const { shoptype, lcost, hcost, occasion, brand, page } = this.state;

        const sortObj = {
            shoptype: Number(shoptype),
            lcost,
            hcost,
            occasion: occasion.length == 0 ? undefined : occasion,
            brand,
            page,
            sort: sort
        }
        axios({
            method: 'POST',
            url: 'http://localhost:4578/filter',
            headers: { 'Content-type': 'application/json' },
            data: sortObj
        })
            .then(response => {
                this.setState({
                    products: response.data.products,
                    sort,
                    pageCount: response.data.pageCount
                })
            })
            .catch(err => console.log(err));
    }

    handleCost = (lcost, hcost) => {
        const { shoptype, occasion, brand, sort, page } = this.state;

        const sortObj = {
            shoptype: Number(shoptype),
            lcost, hcost,
            occasion: occasion.length == 0 ? undefined : occasion,
            brand, page,
            sort
        }
        axios({
            method: 'POST',
            url: 'http://localhost:4578/filter',
            headers: { 'Content-type': 'application/json' },
            data: sortObj
        })
            .then(response => {
                this.setState({ products: response.data.products, lcost, hcost, pageCount: response.data.pageCount })
            })
            .catch(err => console.log(err));
    }
    handleOccasions = (occasionId) => {
        const { shoptype, brand, occasion, lcost, hcost, sort, page } = this.state;

        const index = occasion.indexOf(occasionId);
        if (index >= 0) {
            occasion.splice(index, 1);
        } else {
            occasion.push(occasionId);
        }

        const sortObj = {
            shoptype: Number(shoptype),
            lcost,
            hcost,
            brand,
            page,
            occasion: occasion.length == 0 ? undefined : occasion,
            sort
        }
        axios({
            method: 'POST',
            url: 'http://localhost:4578/filter',
            headers: { 'Content-type': 'application/json' },
            data: sortObj
        })
            .then(response => {
                this.setState({ products: response.data.products, occasion, pageCount: response.data.pageCount })
            })
            .catch(err => console.log(err));

    }
    handleBrand = (event) => {
        const { brand } = event.target.value;
        const { shoptype, occasion, lcost, hcost, sort, page } = this.state;

        const sortObj = {
            shoptype: Number(shoptype),
            lcost, hcost,
            occasion: occasion.length == 0 ? undefined : occasion,
            brand, page,
            sort
        }
        axios({
            method: 'POST',
            url: 'http://localhost:4578/filter',
            headers: { 'Content-type': 'application/json' },
            data: sortObj
        })
            .then(response => {
                this.setState({ products: response.data.products, brand, pageCount: response.data.pageCount })
            })
            .catch(err => console.log(err));

    }
    handlePageChange = (page) => {
        const { shoptype, occasion, lcost, hcost, sort, brand } = this.state;

        const sortObj = {
            shoptype: Number(shoptype),
            lcost, hcost,
            occasion: occasion.length == 0 ? undefined : occasion,
            brand, page,
            sort
        }
        axios({
            method: 'POST',
            url: 'http://localhost:4578/filter',
            headers: { 'Content-type': 'application/json' },
            data: sortObj
        })
            .then(response => {
                this.setState({ products: response.data.products, page, pageCount: response.data.pageCount })
            })
            .catch(err => console.log(err));

    }
    handleNavigate = (proId) => {
        this.props.history.push(`/details?product=${proId}`);
    }

    render() {
        const { products, pageCount } = this.state; // destructuring products from state variable
        return (
            <div>
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-12">
                            <div className="filter-box">
                                <span className="Filters">Filter / Sort</span>
                                <span className="bi bi-caret-down icon" data-bs-toggle="collapse"
                                    data-bs-target="#collapseExample-1">
                                </span>
                                <div className="collapse show" id="collapseExample-1">
                                    <h5 className="Select-Location" >Select Brand</h5>
                                    <select className="selectb" onChange={this.handleBrand}>
                                        <option value={0}>Select</option>
                                        {products.map(item => {
                                            return <option value={item.shop_type}>{item.brand}</option>
                                        })}

                                    </select>
                                    <h5 className="Select-Location">Occasions</h5>
                                    <div>
                                        <input type="checkbox" onChange={() => this.handleOccasions(1)} />
                                        <span style={{ color: "#8c96ab" }}>Party Wear</span><br />
                                        <input type="checkbox" onChange={() => this.handleOccasions(2)} />
                                        <span style={{ color: "#8c96ab" }}>Casual Wear</span><br />
                                        <input type="checkbox" onChange={() => this.handleOccasions(3)} />
                                        <span style={{ color: "#8c96ab" }}>Wedding Wear</span><br />
                                        <input type="checkbox" onChange={() => this.handleOccasions(4)} />
                                        <span style={{ color: "#8c96ab" }}>Formal Wear</span><br />
                                        <input type="checkbox" onChange={() => this.handleOccasions(5)} />
                                        <span style={{ color: "#8c96ab" }}>Work Wear</span><br />
                                    </div>
                                    <br />
                                    <h5 className="Select-Location">Prices</h5>
                                    <div>
                                        <input type="radio" name="cost" onChange={() => this.handleCost(1, 499)} />
                                        <span style={{ color: "#1f1e53" }}>
                                            1 To ₹ 499</span><br />
                                        <input type="radio" name="cost" onChange={() => this.handleCost(500, 999)} />
                                        <span style={{ color: "#8c96ab" }}>
                                            ₹ 500 to ₹ 999</span><br />
                                        <input type="radio" name="cost" onChange={() => this.handleCost(1000, 1499)} />
                                        <span style={{ color: "#8c96ab" }}>
                                            ₹ 1000 to ₹ 1499</span><br />
                                        <input type="radio" name="cost" onChange={() => this.handleCost(1500, 2499)} />
                                        <span style={{ color: "#8c96ab" }}>
                                            ₹ 1500 to ₹ 2499</span><br />
                                        <input type="radio" name="cost" onChange={() => this.handleCost(2500, 100000)} />
                                        <span style={{ color: "#8c96ab" }}>₹ 2500+</span><br />
                                    </div><br />

                                    <h5 className="Select-Location">Sort</h5>
                                    <div>
                                        <input type="radio" name="sort" onChange={() => this.handleSort(1)} />
                                        <span style={{ color: "#8c96ab" }}>Price low to high</span><br />
                                        <input type="radio" name="sort" onChange={() => this.handleSort(-1)} />
                                        <span style={{ color: "#8c96ab" }}>Price high to low</span><br />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-12">
                            {products.length > 0 ? products.map(item => {
                                return <div class="item1" onClick={() => this.handleNavigate(item._id)}>
                                    <div class="row">
                                        <img src={`./${item.image}`} alt="" width="100%" height="268px" />
                                    </div>
                                    <div class="row">
                                        <span class="brand fw-bold">{item.brand}</span>
                                        <span class="text1">{item.name}</span>
                                        <span class="price1">₹{item.price}</span>
                                    </div>
                                </div>
                            })
                                : <div className="record">No Products Available...</div>}
                        </div>
                    </div>
                </div>
                {products.length > 0 ? <div className="pagination">
                    <button className='page-number'>&laquo;</button>
                    {pageCount.map(item => {
                        return <button className='page-number' onClick={() => this.handlePageChange(item)} >{item}</button>
                    })}
                    <button className='page-number'>&raquo;</button>
                </div> : null}

            </div>

        )
    }
}

export default Sort;