import CategoriesController from '../../app/controllers/CategoriesController';

// Validators
import CreateValidation from '../../app/validators/Categories/CategoryCreate';
import EditValidation from '../../app/validators/Categories/CategoryEdit.js';

export default (routes, auth) => {
  routes.get(
    '/categories/get/all',
    auth,
    CategoriesController.getAllCategories
  );

  routes.get(
    '/categories/get/name/:name',
    auth,
    CategoriesController.getCategoryByName
  );

  routes.get(
    '/categories/get/id/:id',
    auth,
    CategoriesController.getCategoryByID
  );

  routes.post(
    '/categories/new',
    auth,
    CreateValidation,
    CategoriesController.createNewCategory
  );

  routes.delete(
    '/categories/delete/:id',
    auth,
    CategoriesController.deleteCategory
  );

  routes.put(
    '/categories/edit/:id',
    auth,
    EditValidation,
    CategoriesController.editCategory
  );
};
