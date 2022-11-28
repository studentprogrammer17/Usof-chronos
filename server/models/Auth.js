
import db from '../db/db.js';
import User from '../models/User.js';

class Auth {
    async register(body) {
        try {
           const data = {
                    login: body.login,
                    password: body.password,
                    confirm_password: body.password,
                    full_name: body.fullName,
                    photo: "default_avatar.png",
                    email: body.email,
                    role_id: 2,
                };
            return await User.create(data);
        } catch (err) {
            console.log(err);
        }
    }

    async login(login) {
        try {
            const sql = `SELECT users.id, users.login, users.password, roles.title FROM users, roles WHERE users.login = '${login}' AND users.role_id = roles.id`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async logout() {
        try {

        } catch (err) {
            console.log(err);
        }
    }
}
export default new Auth();