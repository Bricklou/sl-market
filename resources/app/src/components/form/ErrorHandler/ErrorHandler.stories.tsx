import { Meta, Story } from '@storybook/react/types-6-0'
import ErrorHandler, { ErrorHandlerProps } from './ErrorHandler'
import Input from '../Input/Input'

export default {
  title: 'form/ErrorHandler',
  component: ErrorHandler,
  argTypes: {},
} as Meta

const Template: Story<ErrorHandlerProps> = (args) => (
  <ErrorHandler {...args}>
    <Input
      id="error-handler-input"
      type="text"
      name="error-handler-string"
      placeholder="Text field"
      icon="fas fa-user"
    />
  </ErrorHandler>
)

export const Default = Template.bind({})
Default.args = {
  errors: ['first error', 'second error', 'third error'],
}

export const Disabled = Template.bind({})
Disabled.args = {}
