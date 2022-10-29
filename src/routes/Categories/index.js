import CategoriesController from '../../app/controllers/CategoriesController';

// Validators
import CreateValidation from '../../app/validators/Categories/CategoryCreate';
import EditValidation from '../../app/validators/Categories/CategoryEdit.js';

export default (routes, auth) => {
  routes.get('/categories/get/all', CategoriesController.getAllCategories);

  routes.get(
    '/categories/get/name/:name',
    CategoriesController.getCategoryByName
  );

  routes.get('/categories/get/id/:id', CategoriesController.getCategoryByID);

  routes.post(
    '/categories/new',
    CreateValidation,
    CategoriesController.createNewCategory
  );

  routes.delete('/categories/delete/:id', CategoriesController.deleteCategory);

  routes.put(
    '/categories/edit/:id',
    EditValidation,
    CategoriesController.editCategory
  );
};
