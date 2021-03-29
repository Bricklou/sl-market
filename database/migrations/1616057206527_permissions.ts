import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Permissions extends BaseSchema {
  protected tableName = 'permissions'

  public async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable()
      table.text('description').nullable()
    })
  }

  public async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
