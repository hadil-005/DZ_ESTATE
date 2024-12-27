import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FormulaireSelect from "./FormulaireSelect";
import axios from "axios"; // Ajoutez cette ligne en haut de votre fichier
jest.mock("axios");
import "@testing-library/jest-dom";

describe("FormulaireSelect", () => {
  it("rend correctement le composant avec une valeur initiale vide", () => {
    render(<FormulaireSelect />);

    // Vérifier que le label est présent
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    // Vérifier que la valeur initiale du select est vide
    expect(screen.getByRole("combobox")).toHaveValue("");
  });

  it("affiche les champs conditionnels pour 'Appartement' quand sélectionné", () => {
    render(<FormulaireSelect />);

    // Sélectionner l'option "Appartement"
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });

    // Vérifier que les champs spécifiques pour Appartement sont présents
    expect(screen.getByLabelText(/Nombre de chambres/i)).toBeInTheDocument();
  });

  it("affiche les champs conditionnels pour 'Villa' quand sélectionné", () => {
    render(<FormulaireSelect />);

    // Sélectionner l'option "Villa"
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "4" } });

    // Vérifier que les champs spécifiques pour Villa sont présents
    expect(screen.getByLabelText(/Nombre de chambres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Surface du jardin/i)).toBeInTheDocument();
  });

  it("affiche les champs conditionnels pour 'Maison' quand sélectionné", () => {
    render(<FormulaireSelect />);

    // Sélectionner l'option "Maison"
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "2" } });

    // Vérifier que les champs spécifiques pour Maison sont présents
    expect(screen.getByLabelText(/Nombre de chambres/i)).toBeInTheDocument();
  });

  it("cache les champs conditionnels si aucune option n'est sélectionnée", () => {
    render(<FormulaireSelect />);

    const select = screen.getByRole("combobox");

    // Sélectionner une option
    fireEvent.change(select, { target: { value: "1" } });

    // Vérifier que les champs conditionnels apparaissent
    expect(screen.getByLabelText(/Nombre de chambres/i)).toBeInTheDocument();

    // Revenir à la sélection vide
    fireEvent.change(select, { target: { value: "" } });

    // Vérifier que les champs conditionnels disparaissent
    expect(
      screen.queryByLabelText(/Nombre de chambres/i)
    ).not.toBeInTheDocument();
  });
});
