import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "@jest/globals";
import Navbar from "./Navbar";
import { useAuth } from "../context/AuthContext";

jest.mock("../context/AuthContext", () => ({
  useAuth: jest.fn(),
}));

describe("Navbar", () => {
  it("shows profile and logout links for signed-in users", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { uid: "1", email: "test@example.com" } as any,
      setUser: jest.fn(),
    });

    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
  });
});
