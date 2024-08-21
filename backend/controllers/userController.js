import { User, Submission } from "../model/index.js";

const getAllUsers = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user._id);
		if (!currentUser.isAdmin()) {
			return res.status(403).send("Unauthorized access");
		}

		const allUsers = await User.find({});
		res.status(200).send(allUsers);
	} catch (error) {
		console.error("Error fetching users:", error);
		res.status(500).send("Internal server error");
	}
};

const getUserById = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user._id);

		if (!currentUser.isAdmin() && !currentUser.idCheck(req)) {
			return res.status(403).send("Unauthorized access");
		}

		const getUser = await User.findById(req.params.id);
		if (!getUser) {
			return res.status(404).send("User not found");
		}
		res.status(200).send(getUser);
	} catch (error) {
		console.error("Error fetching user:", error);
		res.status(500).send("Internal server error");
	}
};

const updateUserById = async (req, res) => {
	try {
		const { currentPassword, newPassword } = req.query;
		const { firstname, lastname, email, role } = req.body;

		const currentUser = await User.findById(req.user._id);
		// Check if user is admin or user is trying to update their own info
		if (!currentUser.isAdmin() && !currentUser.idCheck(req)) {
			return res.status(403).send("Unauthorized access");
		}

		const user = await User.findById(req.params.id);
		if (!user) {
			return res.status(404).send("User not found");
		}

		// Check if user is trying to update email or password
		if (email || (currentPassword && newPassword)) {
			if (!currentUser.isAdmin()) {
				if (!currentPassword) {
					return res
						.status(403)
						.send(
							"Please provide current password to update email"
						);
				}
				user.comparePassword(currentPassword, async (err, isMatch) => {
					if (!isMatch) {
						return res.status(403).send("Invalid password");
					}
				});
			}
			if (email) {
				user.email = email;
			}
			if (newPassword) {
				user.password = newPassword;
			}
		}

		if (firstname) {
			user.firstname = firstname;
		}
		if (lastname) {
			user.lastname = lastname;
		}
		if (role && currentUser.isAdmin()) {
			user.role = role;
		}

		await user.save();
		return res.status(200).send(user);
	} catch (error) {
		console.error("Error updating user:", error);
		res.status(500).send("Internal server error");
	}
};

const deleteUserById = async (req, res) => {
	try {
		const currentUser = await User.findById(req.user._id);
		if (!currentUser.isAdmin()) {
			return res.status(403).send("Unauthorized access");
		}

		const user = await User.findByIdAndDelete(req.params.id);
		if (!user) {
			return res.status(404).send("User not found");
		}

		await Submission.deleteMany({ user: req.params.id });
		res.status(200).send("User deleted");
	} catch (error) {
		console.error("Error deleting user:", error);
		res.status(500).send("Internal server error");
	}
};

export { getAllUsers, getUserById, updateUserById, deleteUserById };