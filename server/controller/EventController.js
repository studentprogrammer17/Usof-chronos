import status from '../settings/response.js'
import Event from '../models/Event.js';

class EventController {
    async select_all(req, res, next) {
        try{
            const result = await Event.select_all();
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async select_by_id(req, res, next) {
        try{
            var event_id = req.params.event_id;
            const result = await Event.select_by_id(event_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }
    
    async select_by_calendarid(req, res, next) {
        try{
            var calendar_id = req.params.calendar_id;
            const result = await Event.select_by_calendarid(calendar_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async select_by_user(req, res, next) {
        try{
            const {user_id} = req.params;
            // console.log(user_id);
            const result = await Event.select_by_user(user_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async create(req, res, next) {
        try{
            const result = await Event.create(req.body);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async delete_by_id(req, res, next) {
        try{
            var event_id = req.params.event_id;
            const result = await Event.delete_by_id(event_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }
        
    async update(req, res, next) {
        try {
            var event_id = req.params.event_id;
            const result = await Event.update(req.body, event_id);
            status(200, {result}, res);
        } catch (err) {
            next(err);
        }
    }
}

export default new EventController();