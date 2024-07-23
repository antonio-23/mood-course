// Import statements
import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import EntryCard from "../components/EntryCard";

// Mock the global Date object
vi.useFakeTimers();
vi.setSystemTime(new Date("2023-01-01"));

describe("EntryCard", () => {
  it("renders correctly with given entry", () => {
    // Mock entry data
    const mockEntry = {
      createdAt: "2023-01-01T00:00:00.000Z",
      summary: "Test summary",
      mood: "Happy",
    };

    // Render the EntryCard component with mock entry
    const { getByText } = render(<EntryCard entry={mockEntry} />);

    // Assertions to check if the component renders correctly
    expect(getByText("Sun Jan 01 2023")).toBeTruthy();
    expect(getByText("summary")).toBeTruthy(); // This should be updated to reflect dynamic content if implemented
    expect(getByText("mood")).toBeTruthy(); // This should be updated to reflect dynamic content if implemented
  });
});
