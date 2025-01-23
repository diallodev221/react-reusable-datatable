# Composant de Tableau Réutilisable React

Ce projet fournit un composant de tableau minimal pour afficher tout type de données avec simplicité.

## Technologies

- React
- TypeScript
- Tailwind CSS

## Comment Utiliser ce composant

Pour utiliser ce composant dans votre projet, suivez ces étapes :

1. **Cloner le Répertoire** :

  ```bash
  git clone [nom-du-répertoire]
  ```

   1. **Créer le Composant DataTable** :
      Copiez les composants `TableHeader`, `TableRow`, `TableCell` et `DataTable` fournis dans votre projet.

   2. **Définir Vos Colonnes et Données** :
      Créez un tableau de définitions de colonnes et de données que vous souhaitez afficher dans le tableau. Chaque colonne doit avoir une `key` et un `header`, et éventuellement une fonction `render` pour personnaliser le contenu de la cellule.

      ```tsx
      const columns = [
      { key: 'id', header: 'ID' },
      { key: 'name', header: 'Nom' },
      { key: 'age', header: 'Âge', render: (value) => <span>{value} ans</span> },
      ];

      const data = [
      { id: 1, name: 'John Doe', age: 28 },
      { id: 2, name: 'Jane Smith', age: 34 },
      // Ajoutez plus de données si nécessaire
      ];
      ```

   3. **Afficher le Composant DataTable** :
      Utilisez le composant `DataTable` dans votre application React, en passant les `columns` et `data` en tant que props.

      ```tsx
      import React from 'react';
      import DataTable from './chemin-vers-votre-composant-datatable';

      function App() {
      return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Mon DataTable</h1>
        <DataTable columns={columns} data={data} />
      </div>
      );
      }

      export default App;
      ```

   4. **Styliser le Tableau avec Tailwind CSS** :
  Assurez-vous que Tailwind CSS est correctement configuré dans votre projet pour styliser les composants du tableau. Vous pouvez suivre le guide d'installation officiel de Tailwind CSS pour le configurer : [Installation de Tailwind CSS](https://tailwindcss.com/docs/installation).

En suivant ces étapes, vous devriez pouvoir intégrer et utiliser le composant de tableau réutilisable React dans votre projet.

## Exemple de Code

### Composant Header pour le DataTable

```tsx
function TableHeader<T>({ columns }: Readonly<TableHeaderProps<T>>) {
  return (
  <thead>
    <tr className="bg-gray-200 text-left">
    {columns.map((column) => (
      <th className="border p-4" key={String(column.key)}>
      {column.header}
      </th>
    ))}
    </tr>
  </thead>
  );
}
```

### Composant Row pour le DataTable

```tsx
function TableRow<T extends { id: number | string }>({
  row,
  columns,
}: Readonly<TableRowProps<T>>) {
  return (
  <tr key={row.id} className="border p-4 hover:bg-gray-100">
    {columns.map((column) => (
    <TableCell
      key={String(column.key)}
      value={row[column.key]}
      render={column.render}
    />
    ))}
  </tr>
  );
}
```

### Composant Cell pour le DataTable

```tsx
function TableCell<T>({ value, render }: Readonly<TableCellProps<T>>) {
  return <td className="border p-4">{render ? render(value) : String(value)}</td>;
}
```

### Composant DataTable

#### Les types pour les composants

```tsx
import React from 'react';

// Start of types declaration
export type Column<T> = {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T]) => React.ReactNode;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
};

type TableHeaderProps<T> = {
  columns: Column<T>[];
};

type TableRowProps<T> = {
  row: T;
  columns: Column<T>[];
};

type TableCellProps<T> = {
  value: T;
  render?: (value: T) => React.ReactNode;
};

// END of types declaration

```

### Composants pour DataTables

```tsx

// TableHeader
function TableHeader<T>({ columns }: Readonly<TableHeaderProps<T>>) {
  return (
    <thead>
      <tr className="bg-gray-200 text-left">
        {columns.map((column) => (
          <th className="border p-4" key={String(column.key)}>
            {column.header}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// TableRow 
function TableRow<T extends { id: number | string }>({
  row,
  columns,
}: Readonly<TableRowProps<T>>) {
  return (
    <tr key={row.id} className="border p-4 hover:bg-gray-100">
      {columns.map((column) => (
        <TableCell
          key={String(column.key)}
          value={row[column.key]}
          render={column.render}
        />
      ))}
    </tr>
  );
}

// TableCell
function TableCell<T>({ value, render }: Readonly<TableCellProps<T>>) {
  return <td className="border p-4">{render ? render(value) : String(value)}</td>;
}

// DataTable
export default function DataTable<T extends { id: number | string }>({
  data,
  columns,
}: Readonly<DataTableProps<T>>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row) => (
            <TableRow key={row.id} row={row} columns={columns} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

`Utilisation de DataTable`

```tsx
import DataTable, { Column } from "./components/DataTable";

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
```
