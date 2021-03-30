import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'

export default class AclSeeder extends BaseSeeder {
  public async run(): Promise<void> {
    // Write your database queries inside the run method
    const adminRole = await Role.updateOrCreate(
      {
        slug: 'admin',
      },
      {
        name: 'Administrateur',
        description: "L'administrateur a les plein contrôles sur tout le site au complet.",
      }
    )
    await adminRole.save()

    const sellerRole = await Role.updateOrCreate(
      {
        slug: 'seller',
      },
      {
        name: 'Vendeur',
        description:
          "Le vendeur a l'autorisation d'accéder au panel de vente et de proposer des services",
      }
    )
    await sellerRole.save()

    const adminPerm = await Permission.updateOrCreate(
      {
        slug: 'access:adminPanel',
      },
      {
        name: 'Accès au panel admin',
        description: "Autorise l'utilisateur à accéder au panel administrateur",
      }
    )
    await adminPerm.save()
    await adminRole.related('permissions').save(adminPerm, true)

    const sellerPerm = await Permission.updateOrCreate(
      {
        slug: 'access:sellerPanel',
      },
      {
        name: 'Accès au panel vendeur',
        description: "Autorise l'utilisateur d'accéder au panel vendeur",
      }
    )
    await sellerPerm.save()
    await sellerRole.related('permissions').save(sellerPerm, true)
  }
}
