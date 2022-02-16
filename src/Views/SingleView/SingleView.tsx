import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, ButtonProps, Card, Image } from "semantic-ui-react";
import styled from "styled-components";
import { deleteSingleUser, getSingleUser } from "../../Api";
import ButtonComponent from "../../Components/ButtonComponent";
import { UsersOrganizations } from "../../redux/UsersOrganizations";

export const SingleViewStyled = styled.div`
  padding: 2rem;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  & .userView_card {
    width: 60%;
    margin: auto;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    & .ui.card > .image {
      padding-top: 1rem;
      background: none;
      border-radius: 50% !important;
    }
    & .ui.card > .content,
    .ui.card > .extra {
      border-top: none;
    }
  }
`;

const SingleView: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);
  const [userInfo, setUserInfo] = React.useState<IUser>({
    login: "",
    id: 0,
    node_id: "",
    avatar_url: "",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "User",
    site_admin: false,
    name: "",
    company: "",
    blog: "",
    location: "",
    email: null,
    hireable: null,
    bio: null,
    twitter_username: "",
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: "",
    updated_at: "",
  });
  const idParam = window.location.pathname;
  const [isDeleted, setIsDeleted] = React.useState(false);

  const visitHomepage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    navigate(`/`);
  };

  const sections = [
    { key: "Homepage", content: "Homepage", href: "/" },
    { key: "User details", content: "User details", active: true },
  ];
  const deleteUser = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    data: ButtonProps
  ) => {
    deleteSingleUser(idParam.slice(1));
    setIsDeleted(true);
  };

  React.useEffect(() => {
    getSingleUser(idParam.slice(1)).then(
      (result) => setUserInfo(result),
      () => navigate(`/not/Found`) // I guess this is not exactly how this should be handled but couldn't think of anything else
    );
  }, [idParam, navigate]);
  React.useEffect(() => {
    userInfo?.login && userInfo.login.length !== 0
      ? setLoading(false)
      : setLoading(true);
  }, [userInfo]);

  return (
    <SingleViewStyled className="userView">
      <Breadcrumb icon="right angle" sections={sections} />
      <div className="userView_card">
        {!isDeleted ? (
          <Card fluid>
            <Image
              className="userView_image"
              centered
              size="medium"
              src={userInfo.avatar_url}
            />
            <Card.Content>
              <Card.Header textAlign="center">{userInfo.login}</Card.Header>
              <Card.Meta textAlign="center">{userInfo.name}</Card.Meta>
              <Card.Description textAlign="center">
                Bio: {userInfo.bio}
              </Card.Description>
              <Card.Description textAlign="center">
                Location: {userInfo.location}
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <a href={userInfo.blog} target="_blank" rel="noreferrer">
                {userInfo.blog}
              </a>
              <UsersOrganizations user={idParam.slice(1)} />
            </Card.Content>
            <Card.Content textAlign="center">
              <ButtonComponent
                loading={loading}
                isIcon
                iconName="trash"
                buttonText="Delete user"
                buttonColor="red"
                isBasic
                onButtonClick={(e, data) => deleteUser(e, data)}
              />
            </Card.Content>
          </Card>
        ) : (
          <Card fluid>
            <Card.Content textAlign="center">User is DELETED</Card.Content>
            <Card.Content textAlign="center">
              <ButtonComponent
                loading={loading}
                isIcon
                iconName="home"
                buttonText="Back to Homepage"
                buttonColor="blue"
                isBasic
                onButtonClick={(e, data) => visitHomepage(e, data)}
              />
            </Card.Content>
          </Card>
        )}
      </div>
    </SingleViewStyled>
  );
};

export default SingleView;
