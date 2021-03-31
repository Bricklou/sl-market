import { Meta, Story } from '@storybook/react/types-6-0'
import Footer from './Footer'

export default {
  title: 'Footer',
  component: Footer,
  argTypes: {},
} as Meta

const Template: Story = (args) => <Footer {...args} />

export const Default = Template.bind({})
Default.args = {}
