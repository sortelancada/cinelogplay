// executa este bloco antes de cada teste individual
beforeEach(() => {

  // limpa o localStorage do navegador para garantir isolamento entre testes
  cy.clearLocalStorage();
});