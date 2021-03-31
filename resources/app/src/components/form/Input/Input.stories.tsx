import { Meta, Story } from '@storybook/react/types-6-0'
import Input, { InputProps } from './Input'

export default {
  title: 'form/Input',
  component: Input,
  argTypes: {},
} as Meta

const Template: Story<InputProps> = (args) => (
  <div className="w-60 m-4">
    <Input {...args} />
  </div>
)

export const Default = Template.bind({})
Default.args = {
  id: 'input-story-default',
  placeholder: 'Text field',
  type: 'text',
  name: 'input-story-default',
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  id: 'input-story-with-icon',
  icon: 'fas fa-user',
  placeholder: 'Text field',
  type: 'text',
  name: 'input-story-with-icon',
}

export const Disabled = Template.bind({})
Disabled.args = {
  id: 'input-story-disabled',
  disabled: true,
  placeholder: 'Text field',
  name: 'input-story-disabled',
}

export const Password = Template.bind({})
Password.args = {
  id: 'input-story-password',
  type: 'password',
  placeholder: 'Password field',
  icon: 'fas fa-lock',
  name: 'input-story-password',
}
