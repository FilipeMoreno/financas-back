import BanksController from '../../app/controllers/BanksController';

// Validators
import CreateValidation from '../../app/validators/Banks/BankCreate';
import EditValidation from '../../app/validators/Banks/BankEdit';

export default (routes, auth) => {
  routes.get('/banks/get/all', auth, BanksController.getAllBanks);

  routes.get('/banks/get/name/:name', auth, BanksController.getBankByName);

  routes.get('/banks/get/id/:id', auth, BanksController.getBankByID);

  routes.post(
    '/banks/new',
    auth,
    CreateValidation,
    BanksController.createNewBank
  );

  routes.delete('/banks/delete/:id', auth, BanksController.deleteBank);

  routes.put('/banks/edit/:id', auth, EditValidation, BanksController.editBank);
};
