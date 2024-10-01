import * as React from 'react'
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { EditIcon } from 'lucide-react'
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import SelectionMenu from '../table/OptionalSelectionMenu';


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

type AttendanceRecord = {
  id: number
  attendanceStatus: any
  record: string
  calories: number
}

type ActivityParticipant = {
  participantInfo: Participant
  donor: Donor
  attendanceRecord: AttendanceRecord
}

const columnHelper = createColumnHelper<ActivityParticipant>()


interface ActivityParticipantTableProps {
  data: any[];
};

const ActivityParticipantTable: React.FC<ActivityParticipantTableProps> = ({ data }) => {
  const [attendanceStatuses, setAttendanceStatuses] = useState<any[]>([]);

  useEffect(() => {
    fetch(`/api/attendance-status`)
    .then((res) => res.json())
    .then(async (data) => {
      if (data) {
        setAttendanceStatuses(data);
        console.log("statuses" + JSON.stringify(attendanceStatuses));
      }
    })
  }, [])


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
              columnHelper.accessor('participantInfo.id', {
                  id: 'participantId',
                  cell: info => info.getValue(),
                  header: () => <span style={{ color: 'white' }}>ID</span>,
                }),
                columnHelper.accessor('participantInfo.firstname', {
                  id: 'participantFirstname',
                  cell: info => info.getValue(),
                  header: () => <span style={{ color: 'white' }}>First Name</span>,
                }),
                columnHelper.accessor('participantInfo.lastname', {
                  id: 'participantLastname',
                  cell: info => info.getValue(),
                  header: () => <span style={{ color: 'white' }}>Last Name</span>,
                }),
                columnHelper.accessor('participantInfo.phone', {
                  id: 'participantPhone',
                  cell: info => info.getValue(),
                  header: () => <span style={{ color: 'white' }}>Phone</span>,
                }),
                columnHelper.accessor('participantInfo.email', {
                  id: 'participantEmail',
                  cell: info => info.getValue(),
                  header: () => <span style={{ color: 'white' }}>Email</span>,
                }),
                columnHelper.accessor('participantInfo.weight', {
                  id: 'participantWeight',
                  cell: info => info.getValue(),
                  header: () => <span style={{ color: 'white' }}>Weight</span>,
                }),
                columnHelper.accessor('participantInfo.birth', {
                  id: 'participantBirth',
                  cell: info => info.getValue(),
                  header: () => <span style={{ color: 'white' }}>Birth</span>,
                }),
          ]
      }),
      columnHelper.group({
          id: 'info-actions',
          header: () => <span style={{ color: 'white' }}>Info Actions</span>,
          columns: [
              columnHelper.display({
                  id: 'edit',
                  cell: () => <button>
                    <EditIcon />
                  </button>,
                  header: () => <span style={{ color: 'white' }}>Edit</span>,
                }),
                columnHelper.display({
                  id: 'delete',
                  cell: (row) => <button onClick={() => {
                    console.log(row.row.original)
                  }}>Delete</button>,
                  header: () => <span style={{ color: 'white' }}>Delete</span>,
                }),
  
          ]
      }),
      columnHelper.group({
        id: 'record-actions',
        header: () => <span style={{ color: 'white' }}>Record Actions</span>,
        columns: [
            // columnHelper.display({
            //     id: 'attended',
            //     cell: () => <button>Attended</button>,
            //     header: () => <span style={{ color: 'white' }}>Attended</span>,
            //   }),
            //   columnHelper.display({
            //     id: 'record',
            //     cell: (row) => <button onClick={() => {
            //       console.log(row.row.original)
            //     }}>
            //       <EditIcon />
            //     </button>,
            //     header: () => <span style={{ color: 'white' }}>Record</span>,
            //   }),
            //   columnHelper.display({
            //     id: 'calories',
            //     cell: (row) => <button onClick={() => {
            //       console.log(row.row.original)
            //     }}>Delete</button>,
            //     header: () => <span style={{ color: 'white' }}>Calories</span>,
            //   }),
            columnHelper.accessor('attendanceRecord.attendanceStatus.name', {
              id: 'attendanceStatus',
              // cell: info => info.getValue(),
              cell: (info) => {
                return (
                  <SelectionMenu 
                    options={attendanceStatuses} 
                    value={info.getValue()} 
                    updateFunc={async (updateObj: any) => {
                      console.log(updateObj);
                      await fetch(`/api/attendance-record/${info.row.original.attendanceRecord.id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(updateObj)
                      })
                    }}
                  />
                )
                // <Select
                //   value={info.getValue()}
                //   onChange={(e) => {
                //     console.log(e.target.value)
                //   }}
                // >
                //   <MenuItem value="Absent">Absent</MenuItem>
                //   <MenuItem value="attending">Attending</MenuItem>
                //   <MenuItem value="Excused">Excused</MenuItem>
                // </Select>
              },
              header: () => <span style={{ color: 'white' }}>Status</span>,
            }),
            columnHelper.accessor('attendanceRecord.record', {
              id: 'attendanceRecord',
              cell: info => info.getValue(),
              header: () => <span style={{ color: 'white' }}>Record</span>,
            }),
            columnHelper.accessor('attendanceRecord.calories', {
              id: 'attendanceCalories',
              cell: info => info.getValue(),
              header: () => <span style={{ color: 'white' }}>Calories</span>,
            }),
  
        ]
    }),
      
  ]

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