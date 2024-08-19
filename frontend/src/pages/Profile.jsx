import useAuth from "../hooks/useAuth";

const Profile = () => {
	const { id, firstname } = useAuth();
	return (
		<div>
			<h1>Profile</h1>
            <p>Id: {id}</p>
            <p>First Name: {firstname}</p>
		</div>
	);
};

export default Profile;
