import '@vaadin/app-layout';
import { AppLayout } from '@vaadin/app-layout';
import '@vaadin/app-layout/vaadin-drawer-toggle';
import '@vaadin/avatar/vaadin-avatar';
import '@vaadin/context-menu';
import '@vaadin/tabs';
import '@vaadin/tabs/vaadin-tab';
import { html, render } from 'lit';
import { customElement } from 'lit/decorators.js';
import { logout } from '../auth';
import { router } from '../index';
import { appStore } from '../stores/app-store';
import { Layout } from './view';

interface RouteInfo {
  path: string;
  title: string;
  icon: string;
}

@customElement('main-layout')
export class MainLayout extends Layout {
  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <header class="view-header" slot="navbar">
          <vaadin-drawer-toggle aria-label="Menu toggle" class="view-toggle" theme="contrast"></vaadin-drawer-toggle>
          <h1 class="view-title">${appStore.currentViewTitle}</h1>
        </header>
        <section class="drawer-section" slot="drawer">
          <h2 class="app-name">${appStore.applicationName}</h2>
          <nav aria-labelledby="views-title" class="menu-item-container">
            <ul class="navigation-list">
              ${this.getMenuRoutes().map(
                (viewRoute) => html`
                  <li>
                    <a
                      ?highlight=${viewRoute.path == appStore.location}
                      class="menu-item-link"
                      href=${router.urlForPath(viewRoute.path)}
                    >
                      <span class="${viewRoute.icon} menu-item-icon"></span>
                      <span class="menu-item-text">${viewRoute.title}</span>
                    </a>
                  </li>
                `
              )}
            </ul>
          </nav>
          <footer class="footer">
            ${appStore.user
              ? html` <vaadin-context-menu open-on="click" .renderer="${this.renderLogoutOptions}">
                  <vaadin-avatar
                    theme="xsmall"
                    img="${appStore.user.profilePictureUrl}"
                    name="${appStore.user.name}"
                  ></vaadin-avatar>
                  <span class="font-medium ms-xs text-s text-secondary">${appStore.user.name}</span>
                </vaadin-context-menu>`
              : html`<a router-ignore href="login">Sign in</a>`}
          </footer>
        </section>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.add('block', 'h-full');
    this.reaction(
      () => appStore.location,
      () => {
        AppLayout.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  private renderLogoutOptions(root: HTMLElement) {
    render(html`<vaadin-list-box><vaadin-item @click=${() => logout()}>Logout</vaadin-item></vaadin-list-box>`, root);
  }

  private getMenuRoutes(): RouteInfo[] {
    return [
      {
        path: 'hello',
        title: 'Hello World',
        icon: 'la la-globe',
      },

      {
        path: 'about',
        title: 'About',
        icon: 'la la-file',
      },

      {
        path: 'dashboard',
        title: 'Dashboard',
        icon: 'la la-chart-area',
      },

      {
        path: 'card-list',
        title: 'Card List',
        icon: 'la la-list',
      },

      {
        path: 'list',
        title: 'List',
        icon: 'la la-th',
      },

      {
        path: 'master-detail',
        title: 'Master-Detail',
        icon: 'la la-columns',
      },

      {
        path: 'collaborative-master-detail',
        title: 'Collaborative Master-Detail',
        icon: 'la la-columns',
      },

      {
        path: 'person-form',
        title: 'Person Form',
        icon: 'la la-user',
      },

      {
        path: 'address-form',
        title: 'Address Form',
        icon: 'la la-map-marker',
      },

      {
        path: 'credit-card-form',
        title: 'Credit Card Form',
        icon: 'la la-credit-card',
      },

      {
        path: 'map',
        title: 'Map',
        icon: 'la la-map',
      },

      {
        path: 'chat',
        title: 'Chat',
        icon: 'la la-comments',
      },

      {
        path: 'rich-text-editor',
        title: 'Rich Text Editor',
        icon: 'la la-edit',
      },

      {
        path: 'image-list',
        title: 'Image List',
        icon: 'la la-th-list',
      },

      {
        path: 'checkout-form',
        title: 'Checkout Form',
        icon: 'la la-credit-card',
      },

      {
        path: 'hello-world',
        title: 'Hello Hilla',
        icon: 'la la-globe',
      },
    ];
  }
}
