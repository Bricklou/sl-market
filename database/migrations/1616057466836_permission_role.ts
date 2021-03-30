import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RolePermissions extends BaseSchema {
  protected tableName = 'permission_role'

  public async up(): Promise<void> {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('role_id').references('roles.id').notNullable()
      table.integer('permission_id').references('permissions.id').notNullable()
    })
  }

  public async down(): Promise<void> {
    this.schema.dropTable(this.tableName)
  }
}
