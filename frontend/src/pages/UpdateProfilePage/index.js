import React from "react";

import FeedNav from "../../components/FeedNav";
import { UpdatePageContainer } from "../../style/updatePage";
import UpdateProfileBox from "../../components/UpdateProfileBox";

const UpdateProfilePage = () => {
  return (
    <UpdatePageContainer>
      <FeedNav />
      <UpdateProfileBox/>
    </UpdatePageContainer>
  );
};

export default UpdateProfilePage;
