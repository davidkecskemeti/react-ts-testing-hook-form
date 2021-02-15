import { fireEvent, render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import SignIn from "./SignIn";

describe("SignIn", () => {
  describe("With valid inputs", () => {
    it.todo("calls the onSubmit function", async () => {
      const mockOnSubmit = jest.fn();
      const { getByLabelText, getByRole } = render(
        <SignIn onSubmit={mockOnSubmit} />
      );

      await act(async () => {
        fireEvent.change(getByLabelText("Email Address *"), {
          target: { value: "email@test.com" },
        });
        fireEvent.change(getByLabelText("Password *"), {
          target: { value: "1234567" },
        });
      });

      await act(async () => {
        fireEvent.click(getByRole("Button"));
      });

      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  describe("With invalid email", () => {
    it.todo("renders the email validation error", async () => {
      const { getByLabelText, container } = render(<SignIn />);

      await act(async () => {
        const emailInput = getByLabelText("Email Address *");

        fireEvent.change(emailInput, { target: { value: "invalid email" } });
        fireEvent.blur(emailInput);
      });

      expect(container.innerHTML).toMatch("Enter a valid email");
    });
  });

  describe("With invalid password", () => {
    it.todo("renders the password validation error", async () => {
      const { getByLabelText, container } = render(<SignIn />);

      await act(async () => {
        const passwordInput = getByLabelText("Password *");

        fireEvent.change(passwordInput, { target: { value: "123" } });
        fireEvent.blur(passwordInput);
      });

      expect(container.innerHTML).toMatch(
        "Password should be longer than 6 characters"
      );
    });
  });
});
