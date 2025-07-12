const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { MSG_CONST, STATUS_CONST } = require('../constants/statusMessage.contants');
const { SALT_ROUNDS, STR_CONST } = require('../constants/shared.constants');

const registerUser = async (req, res) => {
    try {
        const { email, password, mobile, role } = req.body;
        if (!email || !password) {
            return res.status(MSG_CONST.data_missing_error).json({ message: MSG_CONST.missing_fileds_error });
        }

        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            const hashPassword = await bcrypt.hash(String(password), SALT_ROUNDS);
            await User.create({ email, password: hashPassword, mobile: mobile ?? null, role: role ?? STR_CONST.attendee });
            res.status(STATUS_CONST.success_create).json({ message: MSG_CONST.success_create });
        } else {
            res.status(STATUS_CONST.failure_create).json({ message: MSG_CONST.failure_duplicate_create });
        }

    } catch {
        return res.status(STATUS_CONST.failure_create).json({ message: MSG_CONST.failure_create });
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(MSG_CONST.data_missing_error).json({ message: MSG_CONST.missing_fileds_error });
        const user = await User.findOne({ where: { email: email } });
        if (!user) return res.status(STATUS_CONST.not_found_error).json({ message: MSG_CONST.invalid_cred_error });
        const isMatchPass = await bcrypt.compare(password, user.password);
        if (!isMatchPass) return res.status(STATUS_CONST.not_found_error).json({ message: MSG_CONST.invalid_cred_error });

        const payload = { email, role: user.role, id: user.id }
        const token = await jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '4h' });

        res.status(STATUS_CONST.success).json({
            message: MSG_CONST.success,
            data: payload,
            token
        })
    } catch {
        res.status(STATUS_CONST.data_missing_error).json({ message: MSG_CONST.failure });
    }

}

module.exports = { registerUser, loginUser };