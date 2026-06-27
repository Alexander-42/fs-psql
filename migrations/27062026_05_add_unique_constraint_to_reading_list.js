module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.addConstraint('reading_list', {
      fields: ['user_id', 'blog_id'],
      type: 'unique',
      name: 'reading_list_user_id_blog_id_unique'
    })
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeConstraint(
      'reading_list',
      'reading_list_user_id_blog_id_unique'
    )
  }
}
