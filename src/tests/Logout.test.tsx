import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, beforeEach } from "@jest/globals";
import Logout from "../pages/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const navigate = jest.fn();

jest.mock("firebase/auth", () => ({
  signOut: jest.fn(),
}));

jest.mock("../firebaseConfig", () => ({
  auth: {},
}));

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("Logout page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("signs the user out and redirects home", async () => {
    render(<Logout />);

    expect(screen.getByText("Logging out...")).toBeInTheDocument();

    await waitFor(() => {
      expect(signOut).toHaveBeenCalledWith(auth);
      expect(navigate).toHaveBeenCalledWith("/");
    });
  });

  it("matches the logout UI snapshot", () => {
    const { container } = render(<Logout />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
