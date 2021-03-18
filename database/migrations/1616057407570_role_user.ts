import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserRoles extends BaseSchema {
  protected tableName = 'role_user'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.bigInteger('user_id').references('user.id').notNullable()
      table.integer('role_id').references('roles.id').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
