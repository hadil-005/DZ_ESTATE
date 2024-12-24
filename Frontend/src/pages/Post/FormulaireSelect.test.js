import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FormulaireSelect from "./FormulaireSelect";

describe("FormulaireSelect", () => {
  it("rendu initial du composant", () => {
    render(<FormulaireSelect />);

    // Vérifier que le label du select est bien présent
    expect(screen.getByLabelText(/Type/i)).toBeInTheDocument();
    // Vérifier que la valeur initiale du select est vide
    expect(screen.getByRole("combobox")).toHaveValue("");
  });

  it("affiche les champs conditionnels pour 'Appartement' quand sélectionné", () => {
    render(<FormulaireSelect />);

    // Sélectionner l'option "Appartement"
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "1" } });

    // Vérifier que les champs pour Appartement sont affichés avec les id uniques
    expect(screen.getByLabelText(/Nombre de chambres/i)).toHaveAttribute(
      "for",
      "nombreChambres1"
    );
    expect(screen.getByLabelText(/Nombre de salles de bains/i)).toHaveAttribute(
      "for",
      "nombreSallesDeBains1"
    );
  });

  it("affiche les champs conditionnels pour 'Villa' quand sélectionné", () => {
    render(<FormulaireSelect />);

    // Sélectionner l'option "Villa"
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "4" } });

    // Vérifier que les champs pour Villa sont affichés avec les id uniques
    expect(screen.getByLabelText(/Nombre de chambres/i)).toHaveAttribute(
      "for",
      "nombreChambres4"
    );
    expect(screen.getByLabelText(/Nombre de salles de bains/i)).toHaveAttribute(
      "for",
      "nombreSallesDeBains4"
    );
    expect(screen.getByLabelText(/Surface du jardin/i)).toHaveAttribute(
      "for",
      "jardin4"
    );
  });

  it("affiche les champs conditionnels pour 'Maison' quand sélectionné", () => {
    render(<FormulaireSelect />);

    // Sélectionner l'option "Maison"
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "2" } });

    // Vérifier que les champs pour Maison sont affichés avec les id uniques
    expect(screen.getByLabelText(/Nombre de chambres/i)).toHaveAttribute(
      "for",
      "nombreChambres2"
    );
    expect(screen.getByLabelText(/Nombre de salles de bains/i)).toHaveAttribute(
      "for",
      "nombreSallesDeBains2"
    );
  });

  it("les champs disparaissent si aucune option n'est sélectionnée", () => {
    render(<FormulaireSelect />);

    const select = screen.getByRole("combobox");

    // Sélectionner l'option "Appartement"
    fireEvent.change(select, { target: { value: "1" } });

    // Vérifier que les champs conditionnels apparaissent
    expect(screen.getByLabelText(/Nombre de chambres/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Nombre de salles de bains/i)
    ).toBeInTheDocument();

    // Revenir à la sélection vide
    fireEvent.change(select, { target: { value: "" } });

    // Vérifier que les champs conditionnels disparaissent
    expect(
      screen.queryByLabelText(/Nombre de chambres/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(/Nombre de salles de bains/i)
    ).not.toBeInTheDocument();
  });
});
