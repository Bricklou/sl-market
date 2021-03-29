import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

/**
 * Views controller is only here to render the frontend page
 */
export default class ViewsController {
  public async app({ view }: HttpContextContract) {
    return view.render('app')
  }
}
