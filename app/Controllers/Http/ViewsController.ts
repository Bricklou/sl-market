import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ViewsController {
  public async app({ view }: HttpContextContract) {
    return view.render('app')
  }
}
