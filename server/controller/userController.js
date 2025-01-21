import userModel from "../models/userModel.js";

const getUserDetails = async (req, res) => {
    let { userId } = req.body;
    try {
        let userDetails = await userModel.findById(userId);
        if (!userDetails) {
            return res.json({ status: false, message: 'user not found' })
        }
        res.json({
            success: true,
            userInfo: {
                name: userDetails.name,
                isAccountVerified: userDetails.isAccountVerified,
                email: userDetails.email
            }
        })
    } catch (error) {
        return res.json({
            status: false,
            message: error.message
        })
    }
}

export default getUserDetails;