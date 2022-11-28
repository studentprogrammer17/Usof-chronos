import db from '../db/db.js';

class Category {
    async select_all() {
        try {
            var sql = "SELECT * FROM `categories`";
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_id(id) {
        try {
            var sql = `SELECT * FROM categories WHERE id = ${id}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    async create(body) {
        try {
            var sql = `INSERT INTO categories (title) VALUES (${body.title}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    
    async delete_by_id(id)
	{
        try {
			var sql = `DELETE FROM categories WHERE id = ${id}`;
			const [row] = await db.execute(sql);
            return row;
        } catch (e) {
            console.log(e);
        }
	}
}
export default new Category();