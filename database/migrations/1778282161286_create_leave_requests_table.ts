import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'leave_requests'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.integer('total_days')
      table.text('reason')
      table.string('attachment').nullable()
      table.enum('status', ['pending', 'approved', 'rejected']).defaultTo('pending')
      table
        .integer('approved_by')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('users')
        .onDelete('SET NULL')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
