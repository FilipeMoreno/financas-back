import Categories from '../models/Categories';
import Subcategorias from '../models/Subcategorias';

class CategoriesController {
  // Busca todas as categorias cadastradas
  async getAllCategories(req, res) {
    try {
      const categories = await Categories.findAll({
        include: {
          model: Subcategorias,
          as: 'subcategorias',
        },
      });
      if (categories.length === 0) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Category.Get.All.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Categoria não encontrada.',
          instance: '/categories/get/all',
        });
      }
      return res.json(categories);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Categories.Get.All.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao buscar registros.',
        details: e.message,
        instance: '/categories/get/all',
      });
    }
  }

  // Busca uma categoria pelo Nome
  async getCategoryByName(req, res) {
    const { name } = req.params;
    try {
      const getCategory = await Categories.findOne({ where: { name } });

      if (!getCategory) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Category.Get.Name.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Categoria não encontrada.',
          instance: '/categories/get/name',
        });
      }
      return res.json(getCategory);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Categories.Get.Name.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao buscar registros.',
        details: e.message,
        instance: `/categories/get/name/${name}`,
      });
    }
  }

  // Busca uma categoria pelo ID
  async getCategoryByID(req, res) {
    const { id } = req.params;
    try {
      const getCategory = await Categories.findByPk(id);

      if (!getCategory) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Category.Get.ID.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Categoria não encontrada.',
          instance: `/categories/get/id/${id}`,
        });
      }
      return res.json(getCategory);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Categories.Get.ID.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao buscar registros.',
        details: e.message,
        instance: `/categories/get/name/${id}`,
      });
    }
  }

  // Cadastra uma nova categoria
  async createNewCategory(req, res) {
    try {
      const { name, color, icon_url } = req.body;
      const newCategory = await Categories.create({ name, color, icon_url });
      return res.json(newCategory);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Categories.Create.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao criar o registro.',
        details: e.message,
        instance: '/categories/new',
      });
    }
  }

  // Deletar uma categoria pelo ID
  async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const getCategory = await Categories.findByPk(id);

      if (!getCategory) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Category.Delete.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Categoria não encontrada.',
          instance: `/categories/delete/${id}`,
        });
      }
      await Categories.destroy({ where: id });
      return res.json({
        status: 200,
        success: true,
        type: 'Category.Deleted.Successfully',

        message: 'Categoria deletada com sucesso.',
        instance: `/categories/delete/${id}`,
      });
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Categories.Delete.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao deletar o registro.',
        details: e.message,
        instance: `/categories/delete/${id}`,
      });
    }
  }

  // Editar uma categoria pelo ID
  async editCategory(req, res) {
    const { id } = req.params;
    try {
      const { name, color, icon_url } = req.body;
      const getCategory = await Categories.findByPk(id);

      if (!getCategory) {
        return res.status(404).json({
          status: 404,
          success: false,
          type: 'Category.Edit.NotFound',
          error: 'Ocorreu um erro durante a execução.',
          message: 'Categoria não encontrada.',
          instance: `/categories/edit/${id}`,
        });
      }
      const categoryEdited = await getCategory.update({
        name,
        color,
        icon_url,
      });
      return res.json(categoryEdited);
    } catch (e) {
      return res.status(400).json({
        status: 400,
        success: false,
        type: 'Categories.Edit.Unexpected.Error',
        error: 'Ocorreu um erro durante a execução.',
        message: 'Ocorreu um erro ao editar o registro.',
        details: e.message,
        instance: `/categories/edit/${id}`,
      });
    }
  }
}
export default new CategoriesController();
