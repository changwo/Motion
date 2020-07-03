import React from "react";
import {DefaultAvaSmall, PlaceholderS} from "../../../style/images";
import {Link} from "react-router-dom";
import {UserPostAvaDiv} from "../../../style/userPost";
import styled from "styled-components";

const AvaLink = styled(Link)``

const Avatar = props => {

    const {first_name, last_name, avatar, is_from_logged_in_user, id} = props
    return (
        <UserPostAvaDiv>
            {avatar ? (
                <AvaLink to={`${is_from_logged_in_user ? "/profile" : `/user/${id}`}`}>
                    <DefaultAvaSmall src={avatar}/>
                </AvaLink>
            ) : (
                <Link to={`/profile`}>
                    <PlaceholderS>
                        {first_name ? first_name[0].toUpperCase() : "?"}
                        {last_name ? last_name[0].toUpperCase() : null}
                    </PlaceholderS>
                </Link>
            )}
        </UserPostAvaDiv>

    )
}

export default Avatar;