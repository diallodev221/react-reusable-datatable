import DataTable, { Column } from "./components/DataTable";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
};

const userData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", age: 28 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", age: 34 },
  { id: 3, name: "Alice Johnson", email: "alice@example.com", age: 23 },
];

const userColumns: Column<User>[] = [
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "age", header: "Age" },
];


function App() {
  return (
    <div className="container mx-auto p-4 mt-4">
      <h1 className="text-3xl text-center text-blue-400 font-bold underline mb-5">
       React reusable table component
      </h1>
      <DataTable data={userData} columns={userColumns} />
    </div>
  );
}

export default App;
