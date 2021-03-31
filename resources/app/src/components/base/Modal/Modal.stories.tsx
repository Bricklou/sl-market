import { Meta, Story } from '@storybook/react/types-6-0'
import Modal, { ModalProps } from './Modal'

export default {
  title: 'Base/Modal',
  component: Modal,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} as Meta

const Template: Story<ModalProps> = (args) => (
  <div className="min-h-screen">
    <Modal {...args}>
      {{
        main: <h1>coucou</h1>,
        footer: <h1>salut</h1>,
      }}
    </Modal>
  </div>
)

export const Default = Template.bind({})
Default.args = {
  title: 'Title',
  isOpen: true,
}

export const WithIcon = Template.bind({})
WithIcon.args = {
  title: 'Title',
  icon: 'fas fa-user',
  isOpen: true,
}

export const WithCloseBtn = Template.bind({})
WithCloseBtn.args = {
  title: 'Title',
  icon: 'fas fa-user',
  isOpen: true,
  showCloseBtn: true,
}
