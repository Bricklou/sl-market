import React from 'react'
import { CombinedState } from 'redux'
import { RootState } from '@/store'
import { UserInfo } from '@/store/modules/user'
import api from '@/utils/api'
import './profile.scss'
import StripeLogo from '@/assets/img/stripe_logo.svg'
import Button from '@c/base/Button/Button'

interface ApiStatusResponse {
  isSeller: boolean
  isStripeLinked: boolean
}

interface ProfileState {
  seller: {
    isSeller: boolean
    isStripeLinked: boolean
  }
}

const mapStateToProps = (state: RootState): CombinedState<{ user?: UserInfo }> => ({
  user: state.user.user,
})

type ProfileProps = ReturnType<typeof mapStateToProps>

class Profile extends React.Component<ProfileProps, ProfileState> {
  public state: ProfileState = {
    seller: {
      isSeller: false,
      isStripeLinked: false,
    },
  }

  public async componentDidMount(): Promise<void> {
    try {
      const user = await api.get<ApiStatusResponse>('/user/profile')

      this.setState({
        seller: user.data,
      })
    } catch (error) {
      console.error(error)
    }
  }

  private async logoutStripe(): Promise<void> {
    try {
      await api.get('/seller/unlink-stripe')

      const user = await api.get<ApiStatusResponse>('/user/profile')

      this.setState({
        seller: user.data,
      })
    } catch (error) {
      console.error(error)
    }
  }

  private showSellersOptions(): JSX.Element | undefined {
    if (this.state.seller.isSeller) {
      return (
        <section>
          <h3 className="title">Vendeur</h3>
          <div className="option">
            <p>
              Afin de pouvoir vendre vos service, il est nécessaire de lier un compte Stripe à votre
              profil:
            </p>
            {this.state.seller.isStripeLinked ? (
              <Button onClick={this.logoutStripe.bind(this)} className="stripe-disconnect">
                {'Déconnecter '}
                <img src={StripeLogo} alt="Logo" />
              </Button>
            ) : (
              <a className="stripe-connect button" href="/api/seller/link-stripe">
                {'Se connecter avec '}
                <img src={StripeLogo} alt="Logo" />
              </a>
            )}
          </div>
        </section>
      )
    }
  }

  public render(): JSX.Element {
    return (
      <main id="profile">
        <header>
          <h2 className="title">Mon profil</h2>
        </header>
        {this.showSellersOptions()}
      </main>
    )
  }
}

export default Profile
