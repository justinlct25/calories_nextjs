import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'


  type Participant = {
  id: number
  firstname: string
  lastname: string
  phone: string
  weight: number
  birth: string
  email: string
}

type Donor = {
  id: number
  userId: string
  username: string
//   calories: number
//   levels: number
//   scores: null | number
}

type ActivityParticipant = {
  participant: Participant
  donor: Donor
}

const columnHelper = createColumnHelper<ActivityParticipant>()

const columns = [
    columnHelper.group({
        id: 'donorInfo',
        header: () => <span style={{ color: 'white', border: 'white' }}>Donor Info</span>,
        columns: [
            columnHelper.accessor('donor.id', {
                id: 'donorId',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>ID</span>,
              }),
              columnHelper.accessor('donor.userId', {
                id: 'donorUserId',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>User ID</span>,
              }),
              columnHelper.accessor('donor.username', {
                id: 'donorUsername',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>Username</span>,
              }),
        ]
    }),
    columnHelper.group({
        id: 'participantInfo',
        header: () => <span style={{ color: 'white' }}>Participant Info</span>,
        columns: [
            columnHelper.accessor('participant.id', {
                id: 'participantId',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>ID</span>,
              }),
              columnHelper.accessor('participant.firstname', {
                id: 'participantFirstname',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>First Name</span>,
              }),
              columnHelper.accessor('participant.lastname', {
                id: 'participantLastname',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>Last Name</span>,
              }),
              columnHelper.accessor('participant.phone', {
                id: 'participantPhone',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>Phone</span>,
              }),
              columnHelper.accessor('participant.email', {
                id: 'participantEmail',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>Email</span>,
              }),
              columnHelper.accessor('participant.weight', {
                id: 'participantWeight',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>Weight</span>,
              }),
              columnHelper.accessor('participant.birth', {
                id: 'participantBirth',
                cell: info => info.getValue(),
                header: () => <span style={{ color: 'white' }}>Birth</span>,
              }),
        ]
    }),
]

interface ActivityParticipantTableProps {
    data: any[];
  };

const ActivityParticipantTable: React.FC<ActivityParticipantTableProps> = ({ data }) => {

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="flex justify-center mb-24">
      <table 
        className="my-auto border"
      >
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr
              key={headerGroup.id}
            //   className="border-b text-gray-800 uppercase"
              >
              {headerGroup.headers.map(header => (
                <th
                  key={header.id} colSpan={header.colSpan}
                className=" border border-white"

                  >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 pt-[14px] pb-[18px] border border-white">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div/>
    </div>
  )
}

export default ActivityParticipantTable;