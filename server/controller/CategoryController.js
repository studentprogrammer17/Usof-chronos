import status from '../settings/response.js'
import Category from '../models/Category.js';

class CategoryController {
    async select_all(req, res, next) {
        try{
            const result = await Category.select_all();
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async select_by_id(req, res, next) {
        try{
            var category_id = req.params.category_id;
            const result = await Category.select_by_id(category_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }
    
    async create(req, res, next) {
        try{
            const result = await Category.create(req.body);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }

    async delete_by_id(req, res, next) {
        try{
            var category_id = req.params.category_id;
            const result = await Category.delete_by_id(category_id);
            status(200, {result}, res);
        }
        catch(err){
            next(err);
        }
    }
}

export default new CategoryController();