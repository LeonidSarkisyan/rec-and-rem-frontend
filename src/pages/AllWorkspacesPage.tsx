import React from 'react';
import ControlSide from "../components/workspace/control/ControlSide";
import FeatureSide from "../components/feature/FeatureSide";
import './AllWorkspacesPage.css'


const AllWorkspacesPage = () => {
    return (
        <div className="all__workspace__page">
            <ControlSide/>
            <FeatureSide/>
        </div>
    );
};

export default AllWorkspacesPage;