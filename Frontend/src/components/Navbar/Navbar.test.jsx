import React from "react";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import { MemoryRouter } from "react-router-dom";
import { Navbar } from "./Navbar"; // Assurez-vous que c'est un composant fonctionnel
import i18n from "../Multilingue/i18n"; // Assurez-vous que votre fichier i18n est bien configuré

test("handles user login and displays user name", () => {
  localStorage.setItem("first_name", "John");
  localStorage.setItem("family_name", "Doe");

  render(
    <I18nextProvider i18n={i18n}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </I18nextProvider>
  );

  const userName = screen.getByText("John Doe");
  expect(userName).toBeInTheDocument();
});

