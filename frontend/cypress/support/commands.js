// comando para reutilizar a navegação para a página inicial
Cypress.Commands.add("visitHome", () => {

  // acessa a rota raiz da aplicação (home)
  cy.visit("/");
});
