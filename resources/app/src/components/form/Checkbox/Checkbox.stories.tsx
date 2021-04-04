import { Meta, Story } from '@storybook/react/types-6-0'
import Checkbox, { CheckboxProps } from './Checkbox'

export default {
  title: 'form/Checkbox',
  component: Checkbox,
  argTypes: {},
} as Meta

const Template: Story<CheckboxProps> = (args) => <Checkbox {...args} />

export const Default = Template.bind({})
Default.args = {
  id: 'checkbox-story-default',
  label: 'Checkbox',
}

export const Disabled = Template.bind({})
Disabled.args = {
  id: 'checkbox-story-disabled',
  label: 'Checkbox',
  disabled: true,
}
