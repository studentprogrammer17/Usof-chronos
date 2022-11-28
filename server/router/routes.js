import express from 'express'

import UserController from '../controller/UserController.js'
import RoleController from '../controller/RoleController.js'
import CategoryController from '../controller/CategoryController.js'
import AuthController from '../controller/AuthController.js'
import CalendarController from '../controller/CalendarController.js'
import EventController from '../controller/EventController.js'

import upload_Avatar_Image from '../utils/upload_Avatar_Image.js';

const router = express.Router();


//auth
router.post('/auth/register', AuthController.register);                                                         //Register
router.post('/auth/login', AuthController.login);                                                               //Login
router.post('/auth/logout/:token', AuthController.logout);                                                      //Logout
router.get('/auth/active/:token', AuthController.activeEmail);                                                  //Activate email and user add

//users
router.get('/users', UserController.select_all);
router.get('/users/:user_id', UserController.select_by_id);
router.get('/users/check-token/:token', UserController.checkToken);
router.post('/users', UserController.create);
router.patch('/users/avatar/:token', upload_Avatar_Image.single('image'), UserController.update_avatar);        //User avatar add
router.delete('/users/:user_id', UserController.delete_by_id);
router.patch('/users/:user_id/:token', UserController.update);

//roles
router.get('/roles', RoleController.select_all);
router.get('/roles/:role_id', RoleController.select_by_id);
router.post('/roles', RoleController.create);
router.delete('/roles/:role_id', RoleController.delete_by_id);

//categories
router.get('/categories', CategoryController.select_all);
router.get('/categories/:category_id', CategoryController.select_by_id);
router.post('/categories', CategoryController.create);
router.delete('/categories/:category_id', CategoryController.delete_by_id);

//events
router.get('/events', EventController.select_all);                                                              //Select all from events
router.get('/events/bycalendar/:calendar_id/:token', EventController.select_by_calendarid);                     //Select event by calendar_id
router.get('/events/usersEvents/:user_id', EventController.select_by_user);                                     //Select event by user_id
router.get('/events/:event_id/:token', EventController.select_by_id);                                           //Select events by id
router.post('/events', EventController.create);                                                                 //Create event
router.delete('/events/:event_id', EventController.delete_by_id);                                               //Delete event by id
router.patch('/events/:event_id/', EventController.update);                                                     //Update event

//calendars
router.get('/calendars', CalendarController.select_all);                                                        //Select all from calendars
router.get('/calendars/users/:user_id', CalendarController.select_by_user_id);                                  //Select calendar by user_id
router.get('/calendars/:calendar_id', CalendarController.select_by_id);                                         //Select calendar by id
router.post('/calendars', CalendarController.create);                                                           //Create calendar
router.delete('/calendars/:calendar_id', CalendarController.delete_by_id);                                      //Delete calendar by id
router.patch('/calendars/:calendar_id/', CalendarController.update);                                            //Update calendar by id

export default router;