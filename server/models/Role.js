import db from '../db/db.js';

class Role {
    async select_all() {
        try {
            var sql = "SELECT * FROM `roles`";
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_id(id) {
        try {
            var sql = `SELECT * FROM roles WHERE id = ${id}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    
    async create(body) {
        try {
            var sql = `INSERT INTO roles (title) VALUES (${body.title}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    
    async delete_by_id(id) {
        try {
			var sql = `DELETE FROM roles WHERE id = ${id}`;
			const [row] = await db.execute(sql);
            return row;
        } catch (e) {
            console.log(e);
        }
	}
}
export default new Role();