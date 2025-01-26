import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Post from "./Post"; // Assuming your Post component is in this file
import axios from "axios"; // Mock axios for API calls
jest.mock("axios");
import "@testing-library/jest-dom";

describe("Post component", () => {
  // Render the component
  it("renders the component", () => {
    render(
      <Router>
        <Post />
      </Router>
    );

    // Check if the form is rendered by looking for labels or text
    expect(screen.getByLabelText(/Title/i)).toBeInTheDocument(); // Adjust label based on your actual component
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument(); // Adjust label based on your actual component
  });

  // Allow the user to input data and select options
  it("allows user to input data and select options", () => {
    render(
      <Router>
        <Post />
      </Router>
    );

    // Find the input fields and simulate user typing
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Property" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "A beautiful house" },
    });

    // Check if the input values were correctly updated
    expect(screen.getByDisplayValue("New Property")).toBeInTheDocument();
    expect(screen.getByDisplayValue("A beautiful house")).toBeInTheDocument();
  });

  // Validate required fields before submission
  it("validates required fields before submission", async () => {
    render(
      <Router>
        <Post />
      </Router>
    );

    // Submit without filling out the required fields
    fireEvent.submit(screen.getByRole("button", { name: /submit/i })); // Adjust if you have a submit button with this name

    // Wait for validation error messages to appear
    await waitFor(() => {
      expect(screen.getByText(/Title is required/i)).toBeInTheDocument(); // Adjust the error message based on your form
      expect(screen.getByText(/Description is required/i)).toBeInTheDocument(); // Adjust the error message based on your form
    });
  });

  // Submit the form when all fields are valid
  it("submits the form when all fields are valid", async () => {
    render(
      <Router>
        <Post />
      </Router>
    );

    // Fill the form with valid data
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "New Property" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "A beautiful house" },
    });

    // Mock axios to resolve the form submission
    axios.post.mockResolvedValueOnce({ data: { success: true } });

    // Submit the form
    fireEvent.submit(screen.getByRole("button", { name: /submit/i })); // Adjust the button role or name based on your component

    // Wait for the mock API call to be triggered
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "/api/submitForm",
        expect.any(Object)
      ); // Adjust the URL based on your API
    });

    // Check for a success message or some indication that the form was submitted successfully
    expect(
      screen.getByText(/Form submitted successfully/i)
    ).toBeInTheDocument(); // Adjust based on your actual success message
  });
});
