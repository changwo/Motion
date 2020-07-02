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
        searchReducer: {searchList},
        profileReducer: {allUsersList},
        authReducer: {token},
        userReducer: {id, email, first_name, last_name, avatar},
        postReducer: {userPosts, friendPosts, followingPosts},
        dispatch,
        currentList,
    } = props;

    // let renderSearchList;
    // if (searchList) {
    //     renderSearchList = searchList.map((profile, index) => {
    //         return <ProfileCard key={index} profile={profile} type={'allUsersList'}/>;
    //     });
    // }
    // useEffect(() => {
    //     dispatch(getProfilesAction(GET_ALL_USERS))
    // }, [])

    let renderAllUsersList;
    if (allUsersList) {
        renderAllUsersList = allUsersList.map((profile, index) => {
            return <ProfileCard key={index} profile={profile} type={'allUsersList'}/>;
        });
    }

    // const handleRefresh = () => {
    //     dispatch({
    //         type: CLEAR_LIST,
    //     });
    //     dispatch(getRandomProfiles(token));
    // };

    return (
        <>
            {/*<RefreshButton onClick={handleRefresh}>REFRESH</RefreshButton>*/}
            <ProfilesContainer>
                {allUsersList ? renderAllUsersList : <PurpleSpinner/>}
            </ProfilesContainer>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        searchReducer: state.searchReducer,
        userReducer: state.userReducer,
        registration: state.registrationReducer,
        postReducer: state.postReducer,
        profileReducer: state.profileReducer,
    };
};
export default connect(mapStateToProps)(SearchContainer);
