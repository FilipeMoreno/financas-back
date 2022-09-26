module.exports = {
  up: async (queryInterface) =>
    queryInterface.bulkInsert('accounts_types', [
      {
        name: 'Conta Corrente',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Carteira',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Poupança',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Investimentos',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Outros',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]),
  down: async (queryInterface) =>
    queryInterface.bulkDelete('accounts_types', null, {}),
};
