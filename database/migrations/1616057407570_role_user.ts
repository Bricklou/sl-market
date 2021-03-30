import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserRoles extends BaseSchema {
  protected tableName = 'role_user'

  public async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('user_id', 24).references('users.id').notNullable()
      table.integer('role_id').references('roles.id').notNullable()
    })
  }

  public async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
