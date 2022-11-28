import db from '../db/db.js';

class Calendar {
    async select_all() {
        try {
            var sql = "SELECT * FROM `calendars`";
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_id(id) {
        try {
            var sql = `SELECT * FROM calendars WHERE id = ${id}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    
    async select_by_user_id(id) {
        try {
            var sql = `SELECT * FROM calendars WHERE user_id = ${id}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    
    async create(body) {
        try {
            var sql = `INSERT INTO calendars (title, user_id) VALUES ('${body.title}', ${body.user_id})`;
            const [row] = await db.execute(sql);
   
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    
    async delete_by_id(id) {
        try {
			var sql = `DELETE FROM calendars WHERE id = ${id}`;
			const [row] = await db.execute(sql);
            return row;
        } catch (e) {
            console.log(e);
        }
	}

    async update(body, id) {
		try {
			var sql = `UPDATE calendars SET title = '${body.title}' WHERE id = '${id}'`;
			const [row] = await db.execute(sql);
            return row;
		} catch (e) {
			console.log(e);
		}
	}
}
export default new Calendar();