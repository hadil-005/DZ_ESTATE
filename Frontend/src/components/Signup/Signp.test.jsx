import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Signp from "./Signp";
import axios from "axios"; // Ajoutez cette ligne en haut de votre fichier
jest.mock("axios");

test("Displays error message when password does not match confirmation", () => {
  render(
    <Router>
      <Signp />
    </Router>
  );

  // Remplir seulement le champ du mot de passe
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Mot de passe/i), {
    target: { value: "password123" },
  });

  // Vérifier que le champ du mot de passe contient la valeur attendue
  expect(screen.getByPlaceholderText(/Entrer votre Mot de passe/i).value).toBe(
    "password123"
  );
});
test("Displays alert for the first empty field when multiple fields are empty", () => {
  // Espionner et simuler global.alert
  jest.spyOn(global, "alert").mockImplementation(() => {});

  render(
    <Router>
      <Signp />
    </Router>
  );

  // Laisser plusieurs champs vides
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Prénom/i), {
    target: { value: "hhhh" }, // Champ vide
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Nom/i), {
    target: { value: "" }, // Champ vide
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Email/i), {
    target: { value: "" }, // Champ vide
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Mot de passe/i), {
    target: { value: "password123" }, // Champ rempli
  });
  fireEvent.change(
    screen.getByPlaceholderText(/Confirmer votre mot de passe/i),
    {
      target: { value: "password123" }, // Champ rempli
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/Entrer votre numéro de téléphone/i),
    {
      target: { value: "1234567890" }, // Champ rempli
    }
  );

  // Simuler le clic sur le bouton
  fireEvent.click(screen.getByRole("button", { name: /Créer un compte/i }));

  // Vérifier que l'alerte est affichée pour le premier champ vide (ici, first_name)
  expect(global.alert).toHaveBeenCalledWith(
    "Veuillez remplir le champ family_name"
  );

  // Restauration de la méthode alert originale
  global.alert.mockRestore();
});

test("Displays alert for the next empty field after fixing the first empty field", () => {
  jest.spyOn(global, "alert").mockImplementation(() => {});

  render(
    <Router>
      <Signp />
    </Router>
  );

  // Remplir le premier champ mais laisser les autres vides
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Prénom/i), {
    target: { value: "John" }, // Champ rempli
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Nom/i), {
    target: { value: "hhh" }, // Champ vide
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Email/i), {
    target: { value: "" }, // Champ vide
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Mot de passe/i), {
    target: { value: "password123" }, // Champ rempli
  });
  fireEvent.change(
    screen.getByPlaceholderText(/Confirmer votre mot de passe/i),
    {
      target: { value: "password123" }, // Champ rempli
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/Entrer votre numéro de téléphone/i),
    {
      target: { value: "1234567890" }, // Champ rempli
    }
  );

  fireEvent.click(screen.getByRole("button", { name: /Créer un compte/i }));

  // Vérifier que l'alerte pour le prochain champ vide est affichée
  expect(global.alert).toHaveBeenCalledWith(
    "Veuillez remplir le champ email"
  );

  global.alert.mockRestore();
});

test("Displays alert for invalid phone number", () => {
  // Espionner et simuler global.alert
  jest.spyOn(global, "alert").mockImplementation(() => {});

  render(
    <Router>
      <Signp />
    </Router>
  );

  // Remplir les champs requis sauf le numéro de téléphone avec une valeur invalide
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Prénom/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Nom/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Email/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Mot de passe/i), {
    target: { value: "password123" },
  });
  fireEvent.change(
    screen.getByPlaceholderText(/Confirmer votre mot de passe/i),
    {
      target: { value: "password123" },
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/Entrer votre numéro de téléphone/i),
    {
      target: { value: "12345" }, // Numéro invalide
    }
  );

  // Simuler le clic sur le bouton
  fireEvent.click(screen.getByRole("button", { name: /Créer un compte/i }));

  // Vérifier que l'alerte pour un numéro de téléphone invalide est affichée
  expect(global.alert).toHaveBeenCalledWith(
    "Veuillez entrer un numéro de téléphone valide (10 chiffres)"
  );

  global.alert.mockRestore();
});

test("Accepts a valid phone number", () => {
  jest.spyOn(global, "alert").mockImplementation(() => {});

  render(
    <Router>
      <Signp />
    </Router>
  );

  // Remplir tous les champs avec des valeurs valides
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Prénom/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Nom/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Email/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Mot de passe/i), {
    target: { value: "password123" },
  });
  fireEvent.change(
    screen.getByPlaceholderText(/Confirmer votre mot de passe/i),
    {
      target: { value: "password123" },
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/Entrer votre numéro de téléphone/i),
    {
      target: { value: "1234567890" }, // Numéro valide
    }
  );

  // Simuler le clic sur le bouton
  fireEvent.click(screen.getByRole("button", { name: /Créer un compte/i }));

  // Vérifier qu'aucune alerte n'est affichée
  expect(global.alert).not.toHaveBeenCalled();

  global.alert.mockRestore();
});

test("Displays alert for invalid email format", () => {
  jest.spyOn(global, "alert").mockImplementation(() => {});

  render(
    <Router>
      <Signp />
    </Router>
  );

  // Remplir les champs sauf l'email avec un format invalide
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Email/i), {
    target: { value: "john.doe@com" }, // Email invalide
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Prénom/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Nom/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Mot de passe/i), {
    target: { value: "password123" },
  });
  fireEvent.change(
    screen.getByPlaceholderText(/Confirmer votre mot de passe/i),
    {
      target: { value: "password123" },
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/Entrer votre numéro de téléphone/i),
    {
      target: { value: "1234567890" },
    }
  );

  fireEvent.click(screen.getByRole("button", { name: /Créer un compte/i }));

  // Vérifier que l'alerte pour un email invalide est affichée
  expect(global.alert).toHaveBeenCalledWith("Veuillez entrer un email valide");

  global.alert.mockRestore();
});

test("Accepts a valid email format", () => {
  jest.spyOn(global, "alert").mockImplementation(() => {});

  render(
    <Router>
      <Signp />
    </Router>
  );

  // Remplir tous les champs avec des valeurs valides
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Prénom/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Nom/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Email/i), {
    target: { value: "john.doe@example.com" }, // Email valide
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Mot de passe/i), {
    target: { value: "password123" },
  });
  fireEvent.change(
    screen.getByPlaceholderText(/Confirmer votre mot de passe/i),
    {
      target: { value: "password123" },
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/Entrer votre numéro de téléphone/i),
    {
      target: { value: "1234567890" },
    }
  );

  fireEvent.click(screen.getByRole("button", { name: /Créer un compte/i }));

  // Vérifier qu'aucune alerte n'est affichée pour un email valide
  expect(global.alert).not.toHaveBeenCalled();

  global.alert.mockRestore();
});

test("submits the form when the 'Créer un compte' button is clicked", () => {
  jest.spyOn(global, "alert").mockImplementation(() => {});

  render(
    <Router>
      <Signp />
    </Router>
  );

  // Remplir les champs avec des valeurs valides
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Prénom/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Nom/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Email/i), {
    target: { value: "john.doe@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Mot de passe/i), {
    target: { value: "password123" },
  });
  fireEvent.change(
    screen.getByPlaceholderText(/Confirmer votre mot de passe/i),
    {
      target: { value: "password123" },
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/Entrer votre numéro de téléphone/i),
    {
      target: { value: "1234567890" },
    }
  );

  // Clic sur le bouton "Créer un compte"
  fireEvent.click(screen.getByRole("button", { name: /Créer un compte/i }));

  // Vérifier qu'aucune alerte n'est affichée (formulaire valide)
  expect(global.alert).not.toHaveBeenCalled();

  global.alert.mockRestore();
});

test("displays an alert when the form is incomplete", () => {
  jest.spyOn(global, "alert").mockImplementation(() => {});

  render(
    <Router>
      <Signp />
    </Router>
  );

  // Laisser certains champs vides
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Prénom/i), {
    target: { value: "John" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Nom/i), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Email/i), {
    target: { value: "" }, // Email vide
  });
  fireEvent.change(screen.getByPlaceholderText(/Entrer votre Mot de passe/i), {
    target: { value: "password123" },
  });
  fireEvent.change(
    screen.getByPlaceholderText(/Confirmer votre mot de passe/i),
    {
      target: { value: "password123" },
    }
  );
  fireEvent.change(
    screen.getByPlaceholderText(/Entrer votre numéro de téléphone/i),
    {
      target: { value: "1234567890" },
    }
  );

  // Clic sur le bouton "Créer un compte"
  fireEvent.click(screen.getByRole("button", { name: /Créer un compte/i }));

  // Vérifier que l'alerte pour le champ vide (email) est affichée
  expect(global.alert).toHaveBeenCalledWith("Veuillez remplir le champ email");

  global.alert.mockRestore();
});
