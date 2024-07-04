/// <reference types="cypress" />

describe("app works", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");
  });
});

describe("form validations", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  // Bu testin geçmemesi lazım
  it("form doldurulunca buton aktif oluyor", () => {
    cy.get('input[name="name"]').type("asd");
    cy.get('input[name="surname"]').type("Özdemir");
    cy.get('input[name="email"]').type("admin@test.com");
    cy.get('input[name="password"]').type("123456Qa!");
    cy.get('[data-cy="terms"]').check();
    cy.get("button").should("not.be.disabled");
  });
});
