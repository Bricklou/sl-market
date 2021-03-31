import { Meta, Story } from '@storybook/react/types-6-0'
import Loading, { LoadingProps } from './Loading'

export default {
  title: 'Base/Loading',
  component: Loading,
  argTypes: {},
} as Meta

const Template: Story<LoadingProps> = (args) => <Loading {...args} />

export const Default = Template.bind({})
Default.args = {}
