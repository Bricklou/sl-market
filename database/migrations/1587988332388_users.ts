import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 24).primary()
      table.string('username', 200).notNullable()
      table.string('email', 300).notNullable()
      table.string('avatar').notNullable()
      table.dateTime('last_login').nullable()
      table.timestamps(true)
    })
  }

  public async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
