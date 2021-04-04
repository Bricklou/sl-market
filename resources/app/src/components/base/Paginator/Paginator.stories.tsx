import { Meta, Story } from '@storybook/react/types-6-0'
import Paginator, { PaginatorProps } from './Paginator'

export default {
  title: 'Base/Paginator',
  component: Paginator,
  argTypes: {},
} as Meta

const Template: Story<PaginatorProps> = (args) => <Paginator {...args} />

export const Default = Template.bind({})
Default.args = {
  currentPage: 2,
  pageLimit: 20,
  totalRecords: 150,
}

export const Neighbours = Template.bind({})
Neighbours.args = {
  maxNeighbours: 1,
  currentPage: 2,
  pageLimit: 20,
  totalRecords: 150,
}

export const First = Template.bind({})
First.args = {
  maxNeighbours: 1,
  currentPage: 1,
  pageLimit: 20,
  totalRecords: 150,
}

export const Last = Template.bind({})
Last.args = {
  maxNeighbours: 3,
  currentPage: 3,
  pageLimit: 20,
  totalRecords: 60,
}
