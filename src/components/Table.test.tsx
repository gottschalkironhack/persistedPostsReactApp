import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Table } from "./Table";
import { Column } from "../types";

interface TestItem {
  id: number;
  name: string;
}

const columns: Column<TestItem>[] = [
  { key: "id", header: "ID" },
  { key: "name", header: "Name" },
];

const items: TestItem[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
];

describe("Table", () => {
  it("renders column headers", () => {
    render(<Table columns={columns} data={items} keyExtractor={(i) => i.id} />);

    expect(screen.getByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
  });

  it("renders row data", () => {
    render(<Table columns={columns} data={items} keyExtractor={(i) => i.id} />);

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows empty message when no data", () => {
    render(
      <Table
        columns={columns}
        data={[]}
        keyExtractor={(i) => i.id}
        emptyMessage="Nothing here"
      />
    );

    expect(screen.getByText("Nothing here")).toBeInTheDocument();
  });

  it("renders actions column when rowActionContent provided", () => {
    const onAction = vi.fn();

    render(
      <Table
        columns={columns}
        data={items}
        keyExtractor={(i) => i.id}
        rowActionContent={(item) => (
          <button onClick={() => onAction(item.id)}>Action</button>
        )}
      />
    );

    expect(screen.getByText("Actions")).toBeInTheDocument();
    expect(screen.getAllByText("Action")).toHaveLength(2);
  });

  it("uses default empty message", () => {
    render(<Table columns={columns} data={[]} keyExtractor={(i) => i.id} />);

    expect(screen.getByText("No data available")).toBeInTheDocument();
  });
});
