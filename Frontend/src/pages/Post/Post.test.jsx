import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@material-tailwind/react"; // Import du provider nécessaire
import Post from "./Post"; // Assurez-vous d'importer correctement votre composant

test("handle la soumission du formulaire avec des données valides", async () => {
  // Rendu du composant Post enveloppé dans ThemeProvider
  render(
    <ThemeProvider>
      <Post />
    </ThemeProvider>
  );

  // Assurez-vous que le formulaire est rendu correctement (par exemple, vérification d'un champ spécifique)
  const nomInput = screen.getByLabelText(/Nom/i); // Remplacez par le bon label ou placeholder
  const emailInput = screen.getByLabelText(/Email/i); // Remplacez par le bon label ou placeholder
  const submitButton = screen.getByRole("button", { name: /Soumettre/i });

  // Simulez la saisie des données dans le formulaire
  fireEvent.change(nomInput, { target: { value: "John Doe" } });
  fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });

  // Soumettez le formulaire
  fireEvent.click(submitButton);

  // Attendez que l'action asynchrone soit terminée, si applicable
  await waitFor(() => {
    // Ajoutez des assertions selon ce qui doit se passer après la soumission
    // Par exemple, vous pouvez vérifier si un message de confirmation est apparu
    expect(
      screen.getByText(/Formulaire soumis avec succès/i)
    ).toBeInTheDocument();
  });
});
