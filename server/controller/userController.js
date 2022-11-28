import status from '../settings/response.js'
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

class UserController {
    async select_all(req, res, next) {
        try{
            const result = await User.select_all();
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async select_by_id(req, res, next) {
        try{
            var user_id = req.params.user_id;
            const result = await User.select_by_id(user_id);
            // console.log(result);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async create(req, res, next) {
        try{
            req.body.password = await hash_password(req.body.password);
            const result = await User.create(req.body);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async delete_by_id(req, res, next) {
        try{
            var user_id = req.params.user_id;
            const result = await User.delete_by_id(user_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async update_avatar(req, res, next) { 
        const pathFile = req.file.filename;
        const token = req.params.token;  
        try {
            const userData = jwt.verify(token, "jwt-key");
            const result = await User.update_avatar(pathFile, userData.userId);
            status(200, {result}, res);
        } catch (err) {
            next(err);
        }
    }

    async checkToken(req, res, next){
        const token = req.params.token;
        try{
            jwt.verify(token, 'jwt-key');
            status(200, {message:`token alive`}, res);
        }
        catch(err){
            console.log(err);
            status(401, {message:`token dead`}, res);
            next(err);
           
        }
    }
    
    async update(req, res, next) {
        const id = req.params.user_id;
        const token = req.params.token;
        const userData = jwt.verify(token, 'jwt-key');
        if(+id !== userData.userId){
            return status(403, {message:"Access denied"}, res)
        }
        const {login, email} = await User.select_by_id(userData.userId);
        const isLogin = await User.isLoginExist(req.body.login);
        const isEmail = await User.isEmailExist(req.body.email);
        if(isLogin && login !== req.body.login){
            return status(409, {message:`User with login - ${req.body.login} already exist`}, res);

        }
        else if(isEmail && email !== req.body.email){
            return status(409, {message:`User with email - ${req.body.email} already exist`}, res);
        }
        try{
            await User.update(req.body, req.params.user_id);
            status(200, {message:`Values changed`}, res);
        }
        catch (e){
            console.log(e)
            status(500, {message: `${e}`}, res);
        }
    }
}
export default new UserController();