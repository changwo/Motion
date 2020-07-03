import React, {useEffect} from "react";


import {connect} from "react-redux";
import {GET_ALL_USERS} from "../../store/types";
import {
    ProfilesContainer,

} from "../../style/profileModuleContainer";
import ProfileCard from "../ProfileCard";
import PurpleSpinner from "../../spinners";
import {getProfilesAction} from "../../store/actions/profileAction";

const SearchContainer = (props) => {
    const {
        profileReducer: {allUsersList},
        userReducer: {id},
        dispatch,
    } = props;


    useEffect(() => {

        console.log("in the use effect");
        dispatch(getProfilesAction(GET_ALL_USERS))
    }, [])

    let renderAllUsersList;
    if (allUsersList) {
        renderAllUsersList = allUsersList.map((profile, index) => {
            if (profile.id !== id) {
                return <ProfileCard key={index} profile={profile} type={'allUsersList'}/>;
            }
        });
    }


    return (
        <ProfilesContainer>
            {allUsersList ? renderAllUsersList : <PurpleSpinner/>}
        </ProfilesContainer>
    );
};

const mapStateToProps = (state) => {
    console.log("state", state);
    return {

        searchReducer: state.searchReducer,
        userReducer: state.userReducer,
        profileReducer: state.profileReducer,
    };
};
export default connect(mapStateToProps)(SearchContainer);
