import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class SellerProfiles extends BaseSchema {
  protected tableName = 'seller_profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('user_id', 24).references('users.id').onDelete('cascade')
      table.enum('status', ['available', 'unavailable', 'vacation'])
      table.string('bio')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
