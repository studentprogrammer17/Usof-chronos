import status from '../settings/response.js'
import Calendar from '../models/Calendar.js';

class CalendarController {
    async select_all(req, res, next) {
        try{
            const result = await Calendar.select_all();
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async select_by_id(req, res, next) {
        try{
            var calendar_id = req.params.calendar_id;
            const result = await Calendar.select_by_id(calendar_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }
    
    async select_by_user_id(req, res, next) {
        try{
            var user_id = req.params.user_id;
            const result = await Calendar.select_by_user_id(user_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async create(req, res, next) {
        try{
            const result = await Calendar.create(req.body);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async delete_by_id(req, res, next) {
        try{
            var calendar_id = req.params.calendar_id;
            const result = await Calendar.delete_by_id(calendar_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }
            
    async update(req, res, next) {
        try {
            var calendar_id = req.params.calendar_id;
            const result = await Calendar.update(req.body, calendar_id);
            status(200, {result}, res);
        } catch (err) {
            next(err);
        }
    }
}

export default new CalendarController();