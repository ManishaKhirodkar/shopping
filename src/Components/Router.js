import { BrowserRouter, Route } from "react-router-dom";

import Home from "./Home";
import Sort from "./Sort";
import Details from "./Details";
import Orders from "./Orders";
import Header from "./Header";

function Router() {
    return (
        <BrowserRouter>
        <Header/>
            <Route exact path="/" component={Home } />
            <Route path="/sort" component={Sort } />
            <Route path="/details" component={Details } />
            <Route path="/orders" component={Orders } />
        </BrowserRouter>
    )
}
export default Router;
