import ProfileForm from "../components/ProfileForm";
import Image from 'next/image'
import withRedux from "../helpers/withRedux";
import withAuth from "../helpers/withAuth";
import {useDispatch, useSelector} from "react-redux";
import {updateProfileAsync} from "../store/profile/action";
import {useState} from "react";
import Button from "../components/Button";

export default function SettingsPage() {
    const dispatch = useDispatch();
    const userProfile = useSelector((state) => state.profile.userProfile);
    const [firstname, lastname] = userProfile.full_name.split(' ');
    const [editing, setEditing] = useState(false);
    const handleCancelEdit = () => setEditing(!editing);
    const handleUpdateProfile = async (profileData) => {
        await dispatch(updateProfileAsync(profileData));
        setEditing(!editing);
    }
    const avatar = <Image src={userProfile.avatar} width={300} height={300}/>
    const content = editing ? (
            <ProfileForm
                profile={{firstname, lastname}} onCancelEdit={handleCancelEdit} onSubmit={handleUpdateProfile}>
                {avatar}
            </ProfileForm>
        )
        :
        (
            <div className="row">
                <div className="col-7">
                    {avatar}
                </div>
                <div className="col-4">
                    <div className="row p-3">
                        <span className="col-6 h3">Firstname:</span>
                        <span className="col-6 h1">{firstname}</span>
                    </div>

                    <div className="row p-3">
                        <span className="col-6 h3">Lastname:</span>
                        <span className="col-6 h1">{lastname}</span>
                    </div>

                    <div className="row p-3">
                        <span className="col-6 h3">Username:</span>
                        <span className="col-6 h1">{userProfile.username}</span>
                    </div>

                    <div className="row p-3">
                        <span className="col-6 h3">Email:</span>
                        <span className="col-6 h1">{userProfile.email}</span>
                    </div>

                    <Button
                        onClick={() => setEditing(!editing)}
                        className="btn btn-primary" text={'Edit'}/>
                </div>
            </div>
        )

    return (
        <div className="container">
                {content}
        </div>
    );
};

export const getServerSideProps = withRedux(withAuth());