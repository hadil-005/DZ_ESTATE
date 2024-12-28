import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import PhotoUploader from "./PhotoUploader";
import axios from "axios"; // Ajoutez cette ligne en haut de votre fichier
jest.mock("axios");
import "@testing-library/jest-dom";

describe("PhotoUploader", () => {
  it("rend correctement le composant", () => {
    render(<PhotoUploader onUpload={jest.fn()} />);
    expect(screen.getByText(/Ajouter des photos/i)).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("ajoute des photos correctement", async () => {
    const mockOnUpload = jest.fn();
    render(<PhotoUploader onUpload={mockOnUpload} />);
    const fileInput = screen.getByTestId("file-input");

    const files = [
      new File(["image1"], "image1.png", { type: "image/png" }),
      new File(["image2"], "image2.jpg", { type: "image/jpeg" }),
    ];

    fireEvent.change(fileInput, { target: { files } });

    await waitFor(() => {
      expect(screen.getByText("image1.png")).toBeInTheDocument();
      expect(screen.getByText("image2.jpg")).toBeInTheDocument();
    });

    expect(mockOnUpload).toHaveBeenCalledWith(expect.arrayContaining(files));
  });

  it("supprime une photo correctement", async () => {
    const mockOnUpload = jest.fn();
    render(<PhotoUploader onUpload={mockOnUpload} />);
    const fileInput = screen.getByTestId("file-input");

    const files = [
      new File(["image1"], "image1.png", { type: "image/png" }),
      new File(["image2"], "image2.jpg", { type: "image/jpeg" }),
    ];

    fireEvent.change(fileInput, { target: { files } });

    await waitFor(() => {
      const removeButtons = screen.getAllByText("−");
      expect(removeButtons.length).toBe(2);

      fireEvent.click(removeButtons[0]);
    });

    await waitFor(() => {
      expect(screen.queryByText("image1.png")).not.toBeInTheDocument();
      expect(screen.getByText("image2.jpg")).toBeInTheDocument();
    });

    expect(mockOnUpload).toHaveBeenCalledWith(
      expect.arrayContaining([files[1]]) // Vérifie que seule la deuxième image reste
    );
  });

  it("réinitialise l'input après ajout", () => {
    const mockOnUpload = jest.fn();
    render(<PhotoUploader onUpload={mockOnUpload} />);
    const fileInput = screen.getByTestId("file-input");

    const files = [new File(["image1"], "image1.png", { type: "image/png" })];
    fireEvent.change(fileInput, { target: { files } });

    expect(fileInput.value).toBe(""); // Vérifie la réinitialisation
  });
});