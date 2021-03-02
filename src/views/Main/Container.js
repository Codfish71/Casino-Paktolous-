import React, { PropTypes as T } from 'react'
import { Nav, Navbar, NavItem, Header, Brand } from 'react-bootstrap'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import AuthService from 'utils/AuthService'
import Wheel from './Wheel';
import './styles.module.css';

const auth = new AuthService()

export class Container extends React.Component {
  static contextTypes = {
    router: T.object
  }
  constructor() {
        super();
        this.places = [1,2,3,4,5,6,7];
          }

  logout(){
    auth.logout()
    this.context.router.push('/home')
  }

  render() {
    let children = null
    if (this.props.children) {
      children = React.cloneElement(this.props.children, {
        auth: this.props.route.auth //sends auth instance to children
      })
    }

    return (
      <div>
        <Navbar fluid={true}>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to={'/home'}>
                Casino
              </Link>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            { auth.isAuthenticated() &&
              <LinkContainer to={'/profile'}>
                <NavItem>Profile</NavItem>
              </LinkContainer>
            }
            {/*{ auth.isAuthenticated() &&
              <LinkContainer to={'/instructor'}>
                <NavItem>Players</NavItem>
              </LinkContainer>              
            }*/}
          </Nav>
          <Nav pullRight>
            { auth.isAuthenticated() ? (
              <LinkContainer to={'/home'}>
                <NavItem onClick={this.logout.bind(this)}>Log Out</NavItem>
              </LinkContainer>
            ) : (
              <LinkContainer to={'/login'}>
                <NavItem>Log In</NavItem>
              </LinkContainer>
            )}
          </Nav>
        </Navbar>
        <div className="container">
          { children }
          <h1>What should you Play today?</h1>
          <Wheel items={this.places} />
        </div>

      </div>
    )
  }
}

export default Container
