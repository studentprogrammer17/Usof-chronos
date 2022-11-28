import db from '../db/db.js';
import hash_password from '../utils/hash_password.js';

class User {
    async select_all() {
        try {
            let sql = "SELECT * FROM `users`";
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_id(id) {
        try {
            let sql = `SELECT * FROM users WHERE id = ${id}`;
            const [row] = await db.execute(sql);
            return row[0];
        } catch (err) {
            console.log(err);
        }
    }

    async create(body) {
        try {
            var sql = `INSERT INTO users (login, password, full_name, photo, email, role_id) VALUES ('${body.login}', '${body.password}', '${body.full_name}', '${body.photo}', '${body.email}', ${body.role_id})`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    
    async delete_by_id(id) {
        try {
			var sql = `DELETE FROM users WHERE id = ${id}`;
			const [row] = await db.execute(sql);
            return row;
        } catch (e) {
            console.log(e);
        }
	}

    async update_avatar(path, user_id) {
        try {
			var sql = `UPDATE users SET photo = '${path}' WHERE id = ${user_id}`;
            const [row] = await db.execute(sql);
            const jsonContent = JSON.stringify(row);
			return jsonContent;
        } catch (e) {
            console.log(e);
        }
	}
    
    async isLoginExist(login) {
        var sql = `SELECT * FROM users WHERE login = '${login}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }

    async isEmailExist(email) {
        var sql = `SELECT * FROM users WHERE email = '${email}'`;
        const [row] = await db.execute(sql);
        return row.length !== 0;
    }

    async update(body, user_id) {
        try{
            if(Object.entries(body).length === 0){
                throw 'Incorrect values';
            }
            await Object.entries(body).filter(([key, value]) => value).map(([key, value]) => db.execute(`UPDATE users SET ${key} = '${value}' WHERE id = ${user_id}`))
        }
        catch(e) {
           throw e;
        }
	}
}
export default new User();