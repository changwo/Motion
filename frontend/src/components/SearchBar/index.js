import React from "react";

import {
  OuterSearch,
  InnerSearch,
  MagDiv,
  SearchDiv,
  LikeDiv,
  FriendDiv,
  FollowDiv,
  Mag,
  Search,
  SearchBlackP,
  SearchGreyP,
  Tab,
} from "../../style/searchBar";
import { useDispatch, connect } from "react-redux";
import { changeRightPostModule } from "../../store/actions/postAction";

const SearchBar = (props) => {
  const dispatch = useDispatch();

  const {postReducer: {indexOfPostTypes}} = props


  const handleModuleChange = (e) => {
    const index = Number(e.currentTarget.id);
    dispatch(changeRightPostModule(index));
  };

  return (
    <OuterSearch>
      <InnerSearch>
        <MagDiv>
          <Mag/>
        </MagDiv>
        <SearchDiv>
          <Search placeholder="Search Posts..." />
        </SearchDiv>
        <Tab onClick={handleModuleChange} active={indexOfPostTypes === 0} id="0" >
          <LikeDiv>
            <SearchBlackP>Liked</SearchBlackP>
          </LikeDiv>
        </Tab>
        <Tab onClick={handleModuleChange} active={indexOfPostTypes === 1} id="1" >
          <FriendDiv>
            <SearchGreyP>Friends</SearchGreyP>
          </FriendDiv>
        </Tab>
        <Tab onClick={handleModuleChange} active={indexOfPostTypes === 2} id="2" >
          <FollowDiv>
            <SearchGreyP>Follow</SearchGreyP>
          </FollowDiv>
        </Tab>
      </InnerSearch>
    </OuterSearch>
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
export default connect(mapStateToProps)(SearchBar);

