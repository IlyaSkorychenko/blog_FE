import withAuth from "../helpers/withAuth";
import withRedux from "../helpers/withRedux";

export default function IndexPage() {
    return <></>
}

export const getServerSideProps = withRedux(withAuth(async ({reduxStore}) => {
    const {profile: {userProfile}} = reduxStore.getState();
    return {
        redirect: {
            destination: `/${userProfile.username}`,
            permanent: false,
        }
    }
}));

