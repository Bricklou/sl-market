import { Story, Meta } from '@storybook/react/types-6-0'
import Button, { ButtonProps } from './Button'

export default {
  title: 'Base/Button',
  component: Button,
  argType: {},
} as Meta

const Template: Story<ButtonProps> = (args) => (
  <div className="w-40">
    <Button {...args}>Button</Button>
  </div>
)
Template.args = {
  type: 'button',
}

export const Primary = Template.bind({})
Primary.args = {}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Icon = Template.bind({})
Icon.args = {
  icon: 'fas fa-user',
}
