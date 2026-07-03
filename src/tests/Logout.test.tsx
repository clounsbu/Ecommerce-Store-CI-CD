import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import Logout from "../pages/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";

const navigate = vi.fn();

vi.mock("firebase/auth", () => ({
  signOut: vi.fn(),
}));

vi.mock("../firebaseConfig", () => ({
  auth: {},
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );

  return {
    ...actual,
    useNavigate: () => navigate,
  };
});

describe("Logout page", () => {
  beforeEach(() => {
    vi.clearAllMocks();
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
