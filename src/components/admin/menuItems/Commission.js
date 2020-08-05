import * as React from 'react'
import { Link } from 'react-router-dom'
import { stringify } from 'query-string'
import {
  CreateButton,
  ArrayField,
  List,
  Create,
  ReferenceField,
  Edit,
  SimpleForm,
  NumberField,
  TopToolbar,
  Button,
  Datagrid,
  TextField,
  TextInput,
  DateInput,
  ArrayInput,
  NumberInput,
  DateField,
  EditButton,
  Show,
  SimpleShowLayout,
  DeleteButton,
  AutocompleteInput,
  ListButton,
  RichTextField,
  ShowButton,
  DisabledInput,
  BooleanInput,
  LongTextInput,
  ReferenceManyField,
  FunctionField,
  Typography,
  Filter,
  SearchInput
} from 'react-admin'

const CommissionFilter = props => {
  return (
    <Filter {...props}>
      <BooleanInput
        source='representative'
        label='My Sales'
        alwaysOn
        style={{ display: 'none' }}
      />
    </Filter>
  )
}

const Aside = ({ data, ids }) => {
  // console.log('aside', data, ids)
  return (
    <div style={{ width: 200, margin: '1vw' }}>
      <h1>Customer Spending</h1>
      <p>pulled from current list</p>
      <div>
        ${' '}
        {ids
          .map(id => data[id].total)
          .reduce((orderCost, total) => orderCost + total, 0)}
      </div>
    </div>
  )
}

export const CommissionList = props => (
  <List
    aside={<Aside />}
    filters={<CommissionFilter />}
    filterDefaultValues={{ commission: true }}
    {...props}
  >
    <Datagrid rowClick='show'>
      <ReferenceField
        label='User'
        link='show'
        source='user'
        reference='admin-users'
      >
        <TextField label='Name' source='name' />
      </ReferenceField>

      <ReferenceField
        label='Representative'
        source='representative'
        reference='admin-users'
        link='show'
      >
        <TextField label='Name' source='name' />
      </ReferenceField>
      <NumberField
        label='Total'
        source='total'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <DateField label='Date' source='date' />
      <ShowButton />
    </Datagrid>
  </List>
)

export const CommissionShow = props => (
  <Show actions={<CommissionShowActions />} {...props}>
    <SimpleShowLayout>
      <ReferenceField label='User Email' source='user' reference='admin-users'>
        <TextField label='email' source='email' />
      </ReferenceField>
      <ReferenceField label='User Name' source='user' reference='admin-users'>
        <TextField label='Name' source='name' />
      </ReferenceField>
      <ReferenceField
        label='Representative'
        link='show'
        source='representative'
        reference='admin-users'
      >
        <TextField label='Name' source='name' />
      </ReferenceField>
      <TextField label='Order ID' source='id' />
      <ArrayField label='Products Ordered' source='products'>
        <Datagrid rowClick='show'>
          <ReferenceField
            label='Product'
            source='productId'
            reference='admin-products'
          >
            <TextField label='Product' source='name' />
          </ReferenceField>
          <NumberField label='Quantity' source='productQuantity' />
          <NumberField
            label='Price Per Unit'
            options={{ style: 'currency', currency: 'USD' }}
            source='productPrice'
          />
          <NumberField
            label='Final Price'
            options={{ style: 'currency', currency: 'USD' }}
            source='productTotal'
          />
        </Datagrid>
      </ArrayField>
      <NumberField
        label='Order Total'
        source='total'
        options={{ style: 'currency', currency: 'USD' }}
      />
      <h2>Tracking Information</h2>
      <TextField label='Shipping Company' source='tracking.company' />
      <TextField label='Tracking Number' source='tracking.number' />
    </SimpleShowLayout>
  </Show>
)

//custom comps
const CommissionShowActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
    {/* Add your custom actions */}
  </TopToolbar>
)
