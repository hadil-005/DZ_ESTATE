import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import VideoUploader from "./VideoUploader";
import "@testing-library/jest-dom";

describe("VideoUploader", () => {
  it("rend correctement le composant", () => {
    render(<VideoUploader />);
    expect(screen.getByText(/Ajouter des vidéos/i)).toBeInTheDocument();
    expect(screen.getByText("+")).toBeInTheDocument();
  });

  it("ajoute des vidéos correctement", async () => {
    render(<VideoUploader />);
    const fileInput = screen.getByTestId("file-input");

    // Simuler l'ajout de fichiers vidéo
    const files = [
      new File(["video1"], "video1.mp4", { type: "video/mp4" }),
      new File(["video2"], "video2.avi", { type: "video/avi" }),
    ];

    fireEvent.change(fileInput, { target: { files } });

    // Vérifier que les vidéos sont affichées dans le DOM
    await waitFor(() => {
      expect(screen.getByText("video1.mp4")).toBeInTheDocument();
      expect(screen.getByText("video2.avi")).toBeInTheDocument();
    });
  });

  it("supprime une vidéo correctement", async () => {
    render(<VideoUploader />);
    const fileInput = screen.getByTestId("file-input");

    // Ajouter des vidéos
    const files = [
      new File(["video1"], "video1.mp4", { type: "video/mp4" }),
      new File(["video2"], "video2.avi", { type: "video/avi" }),
    ];

    fireEvent.change(fileInput, { target: { files } });

    // Vérifier qu'on a bien deux vidéos affichées
    const removeButtons = screen.getAllByText("−");
    expect(removeButtons.length).toBe(2);

    // Simuler la suppression de la première vidéo
    fireEvent.click(removeButtons[0]);

    // Vérifier que la première vidéo est supprimée et que la seconde reste
    await waitFor(() => {
      expect(screen.queryByText("video1.mp4")).not.toBeInTheDocument();
      expect(screen.getByText("video2.avi")).toBeInTheDocument();
    });
  });

  it("réinitialise l'input après ajout", async () => {
    render(<VideoUploader />);
    const fileInput = screen.getByTestId("file-input");

    // Ajouter une vidéo
    const files = [new File(["video1"], "video1.mp4", { type: "video/mp4" })];
    fireEvent.change(fileInput, { target: { files } });

    // Vérifier que l'input est réinitialisé
    await waitFor(() => {
      expect(fileInput.value).toBe("");
    });
  });
});
