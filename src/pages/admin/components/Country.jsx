import React, { useState } from 'react'
import MaterialTable from 'material-table'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { tableIcons } from '../icons'
import CountryDialog from '../dialogs/Country'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css' // Import css

export default function Country({
  countries,
  languages,
  handleSubmit,
  handleRemove,
}) {
  const [columns, setColumns] = useState([
    { title: 'Country', field: 'country' },
    { title: 'Language', field: 'language' },
  ])

  const theme = createMuiTheme({
    typography: {
      fontFamily: 'Roboto',
    },
  })

  const [selected, setSelected] = useState({})
  const [open, setOpen] = useState(false)
  return (
    <MuiThemeProvider theme={theme}>
      <div style={{ width: '100%' }}>
        <MaterialTable
          icons={tableIcons}
          title="Country List"
          columns={columns}
          data={countries}
          options={{
            rowStyle: {
              fontFamily: 'Roboto',
            },
          }}
          actions={[
            {
              icon: 'edit',
              tooltip: 'Edit Country',
              onClick: (event, rowData) => {
                setSelected(rowData)
                setOpen(true)
                // open dialog and fill your data to update
              },
            },
            {
              icon: 'delete',
              tooltip: 'Delete Country',
              onClick: (event, rowData) =>
                confirmAlert({
                  title: 'Confirm to delete',
                  message: 'Are you sure to do this.',
                  buttons: [
                    {
                      label: 'Delete',
                      onClick: () => handleRemove(rowData),
                    },
                    {
                      label: 'Cancel',
                    },
                  ],
                }),
            },
            {
              icon: 'add',
              isFreeAction: true,
              onClick: () => {
                setSelected({})
                setOpen(true)
                // open dialog to save new one
              },
            },
          ]}
        />
        <CountryDialog
          open={open}
          onClose={() => setOpen(false)}
          data={selected}
          languages={languages}
          handleSubmit={handleSubmit}
        />
      </div>
    </MuiThemeProvider>
  )
}
