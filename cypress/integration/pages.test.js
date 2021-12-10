/// <reference types="cypress" />

beforeEach(() => {
  cy.request("POST", "/api/v1/initialize");
});

it("表示確認", () => {
  // ホーム画面
  cy.visit("/");
  cy.get(":nth-child(1) > .pb-4 > .flex-grow > .leading-relaxed").should(
    "have.text",
    "このアニメ、タイトルなんだっけ...懐かしい気がするんだけど..."
  );
  cy.get(":nth-child(1) > .relative > .bg-gray-300").should("be.visible");

  // 個人ページ
  cy.get(":nth-child(3) > .flex > .flex-grow-0 > .block > img").click();
  cy.get(".text-2xl").should("have.text", "Higa Takashi");

  // 個別投稿画面
  cy.visit("/posts/01EXS42Q9GYM0WGGKJBCS3DB05");
  cy.get(".pt-2 > .text-gray-800").should(
    "have.text",
    "このアニメ、タイトルなんだっけ...懐かしい気がするんだけど..."
  );

  // 利用規約ページ
  cy.contains("利用規約").click();
  cy.get(".text-3xl").should("have.text", "利用規約");

  // サインイン
  cy.contains("サインイン").click();
  cy.get(".flex > .text-2xl").should("have.text", "サインイン");

  // サインアップ
  cy.get(".text-green-600").click();
  cy.get(".flex > .text-2xl").should("have.text", "新規登録");
  cy.get(".mt-8 > .block > .mt-2 > .border-b").type("user");
  cy.get(":nth-child(4) > .block > .mt-2 > .border-b").type("name");
  cy.get(":nth-child(5) > .block > .mt-2 > .border-b").type("password");
  cy.get(":nth-child(7) > .block > span").click();

  // マイページ
  cy.contains("マイページ").click();
  cy.get(".text-2xl").should("have.text", "name");
  cy.contains("投稿する").click();
  cy.get(".placeholder-gray-300").type("test post");
  cy.get(":nth-child(3) > .block > span").click();
  cy.get(".pt-2 > .text-gray-800").should("have.text", "test post");
});
