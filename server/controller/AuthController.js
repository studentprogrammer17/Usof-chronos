
import jwt from 'jsonwebtoken'
import checkPass from 'check-password-strength'
import EmailValidator from 'email-deep-validator'

import status from '../settings/response.js'
import Auth from '../models/Auth.js'
import User from '../models/User.js'
import sendMail from '../utils/sendMail.js'
import hash_password from '../utils/hash_password.js';

class AuthController {
    async register(req, res, next) {
        try{
            const {
                login,
                password,
                passwordConfirmation,
                fullName,
                email
            } = req.body;

            if(!login || !password || !passwordConfirmation || !fullName || !email) {
                return status(400, {message: `Fill in all fields`}, res);
            }
            if(password !== passwordConfirmation) {
                return status(400, {message: `Passwords do not match`}, res);
            }
            else if(await User.isLoginExist(login)){
                return status(409, {message:`User with login - ${login} already exist`}, res);
            }
            else if(await User.isEmailExist(email)){
                return status(409, {message:`User with email - ${email} already exist`}, res);
            }
            else if(login.indexOf(' ') >= 0){
                return status(400, {message: 'The login cannot have spaces'}, res);
            }
            else if(checkPass.passwordStrength(password).value === 'Too weak' || checkPass.passwordStrength(password).value === 'Weak'){
                return status(400, {message: 'The password is too easy'}, res);
            }
            const emailValidator = new EmailValidator();
            const { wellFormed, validDomain, validMailbox } = await emailValidator.verify(email);
            if(wellFormed && validMailbox && validDomain){
                const encryptedPass = await hash_password(password);
                try {
                    const token = jwt.sign({
                        login,
                        password: encryptedPass,
                        fullName, 
                        email
                    }, "jwt-key", {expiresIn: '15m'});
                    sendMail.send(email, token, 'activate');
                    status(200, {message:`Confirmation for ${login} send on email`}, res);
                }
                catch (err) {
                    status(500, {message: `${err}`}, res);
                }
            } else {
                status(400, {message: `Email - ${email} invalid`}, res)
            }
        }
        catch(err){
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const {login, password} = req.body;
            const isExistUser = await User.isLoginExist(login);
            if (!isExistUser) {
                return status(409, {message:`User with login - ${login} does not exist`}, res);
            }
            const userData = await Auth.login(login);
            const hash = await hash_password(password);
            if ((hash == userData[0].password)) {
                const token = jwt.sign({
                    userId: userData[0].id,
                    login: userData[0].login,
                    role: userData[0].title
                }, "jwt-key", {expiresIn: '30d'});
                status(200, {token: `${token}`, role: userData[0].title, userId: userData[0].id}, res)
            }
            else {
                status(422, {message: `Passwords do not match`}, res);
            }
        }
        catch(err) {
            next(err);
        }
    }

    async logout(req, res, next) {
        try{
            const {token} = req.params;
            const result = jwt.verify(token, "jwt-key");
            status(200, {message: `User with login ${result.login} logged out`}, res);
        }
        catch(err){
            next(err);
        }
    }

    async activeEmail(req, res, next) {
        const {token} = req.params;
        try{
            const userData = jwt.verify(token, "jwt-key");
            await Auth.register(userData);
            status(201, {message:`User ${userData.login} registered`}, res);
        }
        catch (e){
            status(500, {message: `${e}`}, res);
        }
    }

    async passwordReset(req, res, next) {
        try{
            const {email} = req.body;
            if(await User.isEmailExist(email)){
                try {
                    const [{id, login}] = await User.initUser(email);
                    const token = jwt.sign({
                        id, login
                    }, "jwt-key", {expiresIn: '15m'});
                    sendMail.send(email, token);
                    status(200, {message:`Reset link for ${email} send on email`}, res);
                }
                catch (e){
                    status(500, {message: `${e}`}, res);
                }
            } else{
                status(409, {message:`User with email - ${email} does not exist`}, res);
            }
        }
        catch (e){
            status(500, {message: `${e}`}, res);
        }
    }

    async passwordResetWithConfirmToken(req, res, next) {
        try{
            const {password, confirmPassword} = req.body;
            const {confirm_token} = req.params;
            
            if(password === confirmPassword){
                if(checkPass.passwordStrength(password).value === 'Too weak' || checkPass.passwordStrength(password).value === 'Weak'){
                    return status(400, {message: 'The password is too easy'}, res);
                }
                const encryptedPass = await hash_password(password);
                try{ 
                    const userData = jwt.verify(confirm_token, "jwt-key"); 
                    await User.updateValues('password', encryptedPass, userData.id)
                    status(200, {message:`Password updated`}, res);
                }
                catch(e) {
                    status(500, {message: `${e}`}, res);
                }
            }
            else{
                status(422, {message: `Passwords do not match`}, res);
            }
        }
        catch (e){
            status(500, {message: `${e}`}, res);
        }
    }

}

export default new AuthController();

