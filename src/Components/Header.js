import React from "react";
import axios from "axios";
import '../Styles/home.css';
import { withRouter } from "react-router-dom";
import Modal from "react-modal";
import GoogleLogin from 'react-google-login';
import { NavLink } from "react-router-dom";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        background: 'white',
        border: '1px solid'
    },
};
class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            suggesations: [],
            inputText: undefined,
            loginModalIsOpen: false,
            userName: undefined,
            isLoggedIn: false,
            createModalIsOpen: false,
            signinUpModalIsOpen: false,
            user: undefined,
            pwd: undefined,
            fn: undefined,
            ln: undefined,
            isAuthenticated: localStorage.getItem("logindata") ? true : false,
            logindata: localStorage.getItem("logindata") ? JSON.parse(localStorage.getItem("logindata")) : null
        }

    }

    handleNavigate = () => {
        this.props.history.push('/');
    }
    handleNavigateDetails = () => {
        this.props.history.push('/sort');
    }
    handleLogin = () => {
        this.setState({ loginModalIsOpen: true, signinUpModalIsOpen: false });
    }
    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
    }
    handleCaccount = () => {
        this.setState({ createModalIsOpen: true });
    }
    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleInputChange = (state, event) => {
        this.setState({ [state]: event.target.value });
    }

    handleSignup = (event) => {
        const { user, pwd, fn, ln } = this.state;
        const userObj = ({
            user: user,
            pwd: pwd,
            fn: fn,
            ln: ln
        });
        axios({
            method: "POST",
            url: "http://localhost:4578/usersignup",
            headers: {
                'Content-Type': 'application/json'
            },
            data: userObj
        })
            .then((response) => {
                this.setState({
                    createModalIsOpen: false

                });
                alert(response.data.message);

            }).catch(err => console.log(err))
        event.preventDefault();
    }

    handleSignin = (event) => {
        const { user, pwd } = this.state;
        const userObj = {
            user: user,
            pwd: pwd
        }
        axios({
            method: "POST",
            url: "http://localhost:4578/userlogin",
            headers: {
                'Content-Type': 'application/json'
            },
            data: userObj
        }).then((response) => {
            this.setState({
                userName: response.data.user,
                isLoggedIn: response.data.isAuthenticated,
                loginModalIsOpen: false

            });
            localStorage.setItem(
                "logindata", JSON.stringify(response.data.response[0])
            )
        }).catch(err => console.log(err))
        event.preventDefault();
    }
    handleSearch = (event) => {
        const inputText = event.target.value;
        const { products } = this.state;
        const suggesations = products.filter(item => item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({ suggesations, inputText });
        axios({
            method: "GET",
            url: `http://localhost:4578/product`,
            headers: { "Content-type": "application/json" },
        })
            .then((response) => {
                this.setState({ products: response.data.products });
            })
            .catch((err) => console.log(err));
    }
    selectingProducts = (proObj) => {
        this.props.history.push(`/details?product=${proObj._id}`);
    }
    showSuggesations = () => {
        const { suggesations, inputText } = this.state;

        if (suggesations.length == 0 && inputText == undefined) {
            return null;
        }
        if (suggesations.length > 0 && inputText == '') {
            return null;
        }
        if (suggesations.length == 0 && inputText) {
            return <div>
                <div className="liitem">No Products Found</div>
            </div>
        }
        return (
            <div >
                {
                    suggesations.map((item, index) => (<div className="liitem" key={index} onClick={() => this.selectingProducts(item)}>{`${item.name} - ${item.brand}`}</div>))
                }
            </div>
        );
    }
    render() {
        const { loginModalIsOpen, signinUpModalIsOpen, isLoggedIn, userName, createModalIsOpen } = this.state;
        return (
            <div>
                <div className="header">
                    <div className="logo" onClick={this.handleNavigate}><img src="./Assets/logo.svg" /></div>
                    <div className="search-box" id="notebooks">
                        <span className="bi bi-search" style={{ margin: "11px 0 0 115%", position: "absolute" }}></span>
                        <input type="text" id="query" className="search" placeholder="Search Products" onChange={this.handleSearch} />
                        {this.showSuggesations()}
                        {/* <button type="submit" className="butn" >Search</button>*/}
                    </div>

                    {!isLoggedIn ? <div className="login-group">
                        <button className="btn btn-outline-dark ms-2 " onClick={this.handleLogin}><i className="bi bi-emoji-smile me-1"></i>Login</button>
                        <button className="btn btn-outline-dark ms-2 " onClick={this.handleCaccount}><i className="bi bi-emoji-smile me-1"></i>Register</button>
                    </div> : <div className="login-group">
                        <button className="btn btn-outline-dark ms-2 " ><i className="bi bi-emoji-smile me-1"></i>{userName}</button>
                        <button className="btn btn-outline-dark ms-2 " onClick={this.handleLogout} ><i className="bi bi-emoji-smile me-1" ></i>Logout</button>
                    </div>}
                    {/*<button className="btn btn-outline-dark ms-2 "><i className="bi bi-file-text me1"></i>My Orders</button>
                           <button className="btn btn-outline-dark ms-2 "><i className="bi bi-cart me-1"></i>Cart(0)</button>*/}
                </div>
                <div className="navbarli">
                    <ul>
                        <NavLink className="btn btn-cyan-500 text-light fw-bolder " to="/sort"
                            role="button" aria-expanded="false" onClick={this.handleNavigateDetails}>
                            MEN
                        </NavLink>

                        <NavLink className="btn btn-cyan-500 text-light fw-bolder" to="/sort"
                            role="button"
                            aria-expanded="false" >
                            WOMEN
                        </NavLink>

                        <NavLink className="btn btn-cyan-500 text-light fw-bolder" to="sort" role="button" aria-expanded="false">
                            KIDS
                        </NavLink>

                    </ul>
                </div >
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div className="bi bi-file-x" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}></div>
                        <form>
                            <label className="form-label">Email</label>
                            <input type="text" className="form-control" onChange={(event) => this.handleInputChange('email', event)} />
                            <label class="form-label">Password</label>
                            <input type="password" className="form-control" onChange={(event) => this.handleInputChange('password', event)} />
                            <button className="btn btn-danger" style={{ marginTop: '25px', float: 'left' }} onClick={(event) => this.handleSignin(event)}>Login</button>

                        </form>
                        <GoogleLogin
                            clientId="832901541200-4afobklqppbthf0kk6eslhi7dj97ctg2.apps.googleusercontent.com"
                            buttonText="Login with Google" className="glogin"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />

                    </div>
                </Modal>
                <Modal
                    isOpen={createModalIsOpen}
                    style={customStyles}

                >
                    <div>
                        <div className="bi bi-file-x" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('createModalIsOpen', false)}></div>
                        <form>
                            <label className="form-label">First Name</label>
                            <input style={{ width: '100%' }} type="text" class="form-control" onChange={(event) => this.handleInputChange('fn', event)} />
                            <label className="form-label">Last Name</label>
                            <input style={{ width: '100%' }} type="text" class="form-control" onChange={(event) => this.handleInputChange('ln', event)} />
                            <label className="form-label">Email</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChange('user', event)} />
                            <label className="form-label">Password</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChange('pwd', event)} />
                            <label className="form-label">Confirm Password</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChange('pwd', event)} />
                            <button className="btn btn-danger" style={{ marginTop: '25px', float: 'left' }} onClick={this.handleSignup}>Sign Up</button>

                        </form>
                        <GoogleLogin
                            clientId="832901541200-4afobklqppbthf0kk6eslhi7dj97ctg2.apps.googleusercontent.com"
                            buttonText="Login with Google" className="glogin"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </Modal>
                <Modal
                    isOpen={signinUpModalIsOpen}
                    style={customStyles}

                >
                    <div>
                        <h3>Account is created</h3>
                        <button className="btn btn-danger" onClick={this.handleLogin}>Login</button>
                    </div>
                </Modal>
            </div >
        )
    }
}
export default withRouter(Header);