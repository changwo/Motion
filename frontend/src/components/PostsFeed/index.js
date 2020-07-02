import React, {useEffect} from "react";
import {connect} from "react-redux";


import {
    deletePostAction,
    getPostsAction,
} from "../../store/actions/postAction";
import {
    OutterPostsContainer,
    InnerPostsContainer,
    InnerPostsLeftUser,
    InnerPostsRightFriends,
} from "../../style/postsFeed";
import UserPrompt from "../UserPrompt";
import UserPost from "../UserPost";
import NonUserPost from "../NonUserPost";
import PurpleSpinner from "../../spinners";
import {GET_FOLLOWING_POSTS, GET_MY_FRIENDS_POSTS, GET_MY_LIKED_POSTS, GET_MY_POSTS} from "../../store/types";

const PostsFeed = (props) => {
    const {
        authReducer: {token},
        userReducer: {first_name, last_name, avatar},

        postReducer: {
            userPosts,
            friendPosts,
            followingPosts,
            likedPosts,
            indexOfPostTypes,
        },
        dispatch,
    } = props;

    const handlePostDelete = (e) => {
        const ID = Number(e.currentTarget.id);
        dispatch(deletePostAction(ID));

    };

    let renderMyPosts;

    if (userPosts) {
        renderMyPosts = userPosts.map((post, index) => {
            return (
                <UserPost
                    index={index}
                    handlePostDelete={handlePostDelete}
                    post={post}
                    key={index}
                    postTypeCode={3}
                />
            );
        });
    }

    const arrayOfPostTypes = [likedPosts, friendPosts, followingPosts];

    let renderRight;
    if (arrayOfPostTypes[indexOfPostTypes]) {
        renderRight = arrayOfPostTypes[indexOfPostTypes].map((post, index) => {
            return <NonUserPost token={token} post={post} key={index} postTypeCode={indexOfPostTypes}/>; // postTypeCode=0(likedPosts ), postTypeCode=1(friendsPosts ), postTypeCode=2(followingPosts )
        });
    }

    useEffect(() => {
        dispatch(getPostsAction(GET_MY_POSTS));
        dispatch(getPostsAction(GET_FOLLOWING_POSTS));
        dispatch(getPostsAction(GET_MY_LIKED_POSTS));
        dispatch(getPostsAction(GET_MY_FRIENDS_POSTS));
    }, [indexOfPostTypes]);

    return (
        <OutterPostsContainer>
            <InnerPostsContainer>
                <InnerPostsLeftUser>
                    {first_name ? (<UserPrompt
                        first_name={first_name}
                        last_name={last_name}
                        avatar={avatar}
                        handleCloseModal={props.handleCloseModal}
                    ></UserPrompt>) : null}
                    {userPosts ? (
                        renderMyPosts
                    ) : (
                        <PurpleSpinner/>
                    )}
                </InnerPostsLeftUser>
                <InnerPostsRightFriends>
                    {arrayOfPostTypes[indexOfPostTypes] ? (
                        renderRight
                    ) : (
                        <PurpleSpinner/>
                    )}
                </InnerPostsRightFriends>
            </InnerPostsContainer>
        </OutterPostsContainer>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer,
        userReducer: state.userReducer,
        registration: state.registrationReducer,
        postReducer: state.postReducer,
    };
};
export default connect(mapStateToProps)(PostsFeed);
