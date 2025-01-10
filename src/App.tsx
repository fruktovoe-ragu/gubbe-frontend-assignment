import { useEffect, useState } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import { Pagination, Select, SelectChangeEvent, MenuItem, ButtonBase } from '@mui/material';
import CrossIcon from './CrossIcon';

type Person = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  joinDate: string;
  city: string;
  company: string;
  salary: string;
  department: string;
};

const generatePerson = (): Person => ({
  id: faker.string.uuid(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  joinDate: format(faker.date.between({ from: "2020-01-01", to: "2024-02-20" }), "dd.MM.yyyy"),
  city: faker.location.city(),
  company: faker.company.name(),
  salary: faker.finance.amount({ min: 30000, max: 150000, dec: 0 }),
  department: faker.commerce.department(),
});

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor((row, index) => index + 1, {
    header: " ",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("firstName", {
    header: "First Name",
    cell: (info) => String(info.getValue()),
  }),
  columnHelper.accessor("lastName", {
    header: "Last Name",
    cell: (info) => String(info.getValue()),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => String(info.getValue()),
  }),
  columnHelper.accessor("joinDate", {
    header: "Join Date",
    cell: (info) => String(info.getValue()),
  }),
  columnHelper.accessor("city", {
    header: "City",
    cell: (info) => String(info.getValue()),
  }),
  columnHelper.accessor("company", {
    header: "Company",
    cell: (info) => String(info.getValue()),
  }),
  columnHelper.accessor("salary", {
    header: "Salary",
    cell: (info) => String(info.getValue()),
  }),
  columnHelper.accessor("department", {
    header: "Department",
    cell: (info) => String(info.getValue()),
  }),
];

const SELECT_PLACEHOLDER = 'Department';

function App() {
  const [data, setData] = useState<Person[]>([]);
  const [filteredData, setFilteredData] = useState<Person[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedFilterItem, setSelectedFilterItem] = useState<string>(SELECT_PLACEHOLDER);

  useEffect(() => {
    const generatedData = Array.from({ length: 200 }, generatePerson);

    setData(generatedData);
    setFilteredData(generatedData);
  }, []);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handlePaginationChange = (e: React.ChangeEvent<unknown>, number: number): void => {
    setCurrentPage(number);
  };

  const handleSelectChange = (e: SelectChangeEvent): void => {
    setSelectedFilterItem(e.target.value as string);

    const matches = data.filter(num => num.department === e.target.value);
    setFilteredData(matches);
    setCurrentPage(1);
  };

  const handleResetFilterClick = () => {
    setFilteredData(data);
    setSelectedFilterItem(SELECT_PLACEHOLDER);
  };

  const itemsToRender = () => {
    const itemsPerPage = 20;
    const startItemToRender = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startItemToRender + itemsPerPage, 200);

    return table.getRowModel().rows.slice(startItemToRender, endIndex);
  };

  const uniqueDepartmentsList = Array.from(new Set(data.map(row => row.department)));

  return (
    <div className="min-h-screen p-8 bg-customCoral">
      <div className="pb-4 flex justify-end gap-2">
        {selectedFilterItem !== SELECT_PLACEHOLDER && (
          <ButtonBase
            focusRipple
            aria-label="Reset filter"
            onClick={handleResetFilterClick}
            classes={{
              root: '!bg-white !text-customFontGreen !rounded-full !px-8 !py-1 flex gap-1 font-medium'
            }}
          >
            <CrossIcon />
            Reset filter
          </ButtonBase>
        )}
        <Select
          size="small"
          value={selectedFilterItem}
          aria-label="Choose department for filtering"
          onChange={handleSelectChange}
          sx={{
            "& .MuiSelect-select": {
              backgroundColor: '#FFFFFF',
              width: '150px',
            },
            ".MuiTouchRipple-root": {
              color: '#006261',
              borderRadius: '0.75rem',
            }
          }}
        >
          <MenuItem disabled value={SELECT_PLACEHOLDER}>{SELECT_PLACEHOLDER}</MenuItem>
          {uniqueDepartmentsList.map((item, i) => (
            <MenuItem key={i} value={item}>{item}</MenuItem>
          ))}
        </Select>
      </div>
      <div className="max-w-[95vw] overflow-x-auto rounded-lg">
        <table className="w-full border-collapse border-none bg-gray-800">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap text-left text-white px-6 py-2 first:pr-0 bg-customBgGreen"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="border-none">
            {itemsToRender().map((row) => (
              <tr key={row.id} className="odd:bg-white even:bg-customLightGray">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="first:pr-0 first:opacity-40 px-6 py-4 whitespace-nowrap border-none text-customFontCommon">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pt-2 flex justify-center w-full">
        <Pagination
          count={Math.ceil(filteredData.length / 20)}
          page={currentPage}
          onChange={handlePaginationChange}
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: '#FFFFFF',
            },
            ".MuiButtonBase-root": {
              color: '#006261',
              fontSize: '1rem',
              fontWeight: '500',
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
