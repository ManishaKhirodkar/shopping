import React from "react";
import QuicksearchItems from "./QuicksearchItems";

class Quicksearch extends React.Component {
    render() {
        const { shoptypesData } = this.props;
        return (
            <div>
                <div className="container">
                    <div className="heading1">Find Your Items</div>
                    <div className="row mt-5">
                        {shoptypesData.map(item => {
                            return <QuicksearchItems qsData={item} />
                        })}

                    </div>
                </div>
            </div>
        )
    }
}

export default Quicksearch;