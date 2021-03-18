import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class AclSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    const adminRole = await Role.create({
      name: 'Administrateur',
      slug: 'admin',
      description: "L'administrateur a les plein contrôles sur tout le site au complet.",
    })
    await adminRole.save()

    const sellerRole = await Role.create({
      name: 'Vendeur',
      slug: 'seller',
      description:
        "Le vendeur a l'autorisation d'accéder au panel de vente et de proposer des services",
    })
    await sellerRole.save()
  }
}
