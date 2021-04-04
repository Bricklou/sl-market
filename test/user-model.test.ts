import User from 'App/Models/User'
import test from 'japa'

test.group('User model', (group) => {
  const USER_ID = '12345678'
  group.beforeEach(async () => {
    const user = new User()
    user.id = USER_ID
    user.username = 'random username'
    user.email = 'some@random.email'
    user.avatar = ''
    await user.save()
  })

  test('Should create an user properly', async (assert) => {
    const u = User.find(USER_ID)
    assert.exists(u)
  })

  test("Shouldn't have roles", async (assert) => {
    const u = await User.find(USER_ID)

    const hasRole = await u!.hasRole('randomRole')
    assert.isFalse(hasRole)
  })

  test("Shouldn't have permisions", async (assert) => {
    const u = await User.find(USER_ID)

    const perms = await u!.getPermissions()
    assert.isEmpty(perms)
  })

  group.afterEach(async () => {
    const u = await User.find(USER_ID)
    if (u) {
      await u.delete()
    }
  })
})
