import db from '../db/db.js';
import toSQLDate from 'js-date-to-sql-datetime';

class Event {
    async select_all() {
        try {
            var sql = "SELECT * FROM `events`";
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_user(user_id) {
        try {
            var sql = `SELECT events.id, events.title, events.startAt, events.endAt, events.description, events.allDay, events.email, events.category_id, calendars_events.calendar_id FROM events 
            INNER JOIN calendars_events ON events.id = calendars_events.event_id
            INNER JOIN calendars ON calendars.id = calendars_events.calendar_id WHERE calendars.user_id = ${user_id}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_id(id) {
        try {
            var sql = `SELECT * FROM events WHERE id = ${id}`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async select_by_calendarid(id) {
        try {
            var sql = `SELECT * FROM events INNER JOIN calendars_events ON calendars_events.calendar_id = ${id} AND events.id = calendars_events.event_id;`;
            const [row] = await db.execute(sql);
            return row;
        } catch (err) {
            console.log(err);
        }
    }

    async create(body) {
        try {
            const date1 = toSQLDate(new Date(body.startAt));
            const date2 = toSQLDate(new Date(body.endAt));
            var sql = `INSERT INTO events (title, startAt, endAt, description, allDay, email, category_id) VALUES ('${body.title}', '${date1}', '${date2}', '${body.description}', ${body.allDay}, '${body.email}', ${body.category_id})`; 
            const [row] = await db.execute(sql); 
            var sql1 = `INSERT INTO calendars_events (calendar_id, event_id) VALUES (${body.calendar_id}, ${row.insertId})`; 
            const [row1] = await db.execute(sql1); 
            return row;
        } catch (err) {
            console.log(err);
        }
    }
    
    async delete_by_id(id) {
        try {
			var sql = `DELETE FROM events WHERE id = ${id}`;
			const [row] = await db.execute(sql);
            return row;
        } catch (e) {
            console.log(e);
        }
	}
    
    async update(body, id) {
		try {
            const date1 = toSQLDate(new Date(body.startAt));
            const date2 = toSQLDate(new Date(body.endAt));
			let sql = `UPDATE events SET title = '${body.title}', startAt = '${date1}', endAt = '${date2}', description = '${body.description}', email = '${body.email}', category_id = '${body.category_id}' WHERE id = '${id}'`;
			const [row] = await db.execute(sql);
            let sql1 = `UPDATE calendars_events (calendar_id, event_id) VALUES ('${body.calendar_id}', '${row.insertId}')`; 
            const [row1] = await db.execute(sql1); 
            return row;
		} catch (e) {
			console.log(e);
		}
	}
}
export default new Event();