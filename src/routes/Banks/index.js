import BanksController from '../../app/controllers/BanksController';

// Validators
import CreateValidation from '../../app/validators/Banks/BankCreate';
import EditValidation from '../../app/validators/Banks/BankEdit';

export default (routes, auth) => {
  routes.get('/banks/get/all', BanksController.getAllBanks);

  routes.get('/banks/get/name/:name', BanksController.getBankByName);

  routes.get('/banks/get/id/:id', BanksController.getBankByID);

  routes.post(
    '/banks/new',

    CreateValidation,
    BanksController.createNewBank
  );

  routes.delete('/banks/delete/:id', BanksController.deleteBank);

  routes.put('/banks/edit/:id', EditValidation, BanksController.editBank);
};
