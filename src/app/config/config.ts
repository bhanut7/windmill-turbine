import { environment } from './../../environments/environment';

const domain = window.location.href.split('#')[0].split('://')[0];
const host_domain = window.location.host;
export class Config {
    public static get BASE_API(): string { return environment.BASE_API; }
    public static get COLOR_LIST(): any { return this.ColorCodesList; }
    public static API: any = {
      //  Organization component
      GET_ORGANIZATIONS: Config.BASE_API + 'org_mgmt/fetch_org',
      ADD_ORGANIZATION: Config.BASE_API + 'org_mgmt/create_org',
      EDIT_ORGANIZATION: Config.BASE_API + 'org_mgmt/update_org',
      DELETE_ORGANIZATION: Config.BASE_API + 'org_mgmt/delete_org',

         // App Component
        //  GET_TOKEN: Config.BASE_API + 'get_token',

         // Login Component
        //  LOGIN_USER: Config.BASE_API + 'login',
        //  GET_CAPTCHA: Config.BASE_API + 'get_captcha_image',
        //  FORGOT_PASSWORD: Config.BASE_API + 'user/forgot_password',
        //  RESET_PASSWORD: Config.BASE_API + 'user/reset_password',

         //Log Out
        //  LOGOUT_USER: Config.BASE_API + 'logout',

    }
    public static getRandomColor() {
        return Math.floor(Math.random() * 16777215).toString(16);
    }
    public static CONSTANTS: any = {
        timeoutSec: 20,
        debounceTime: 1500,
        BYPASS_SIGNATURE_LIST: [],
        MQTT: {
          ip: host_domain,
          port: domain === 'http' ? '8982' : '8982',
          ws: domain === 'http' ? 'ws://' : 'wss://'
        },
      }
      public static PROJECTCONSTANTS: any = {
        
      };
      public static HEADERCOMPCONSTANTS = {
        THEMES: {
          "dark-blue": {
            bgColor: "#001d6c",
          },
          // 'light': {
          //   "bgColor":"#DFE1E6"
          // },
          "high-contrast-dark": {
            bgColor: "#000000",
          },
        },
        SUBMENUTHEMES: {
          "dark-blue": {
            bgColor: "#002d9c",
          },
          // 'light': {
          //   "bgColor":'#f0f0f0'
          // },
          "high-contrast-dark": {
            bgColor: "#000000",
          },
        },
        projectThemes: [
          {
            theme: 'default-skin',
            tableClass: 'ag-theme-alphine',
            label: 'Default'
          },
          {
            theme: 'flourish-theme',
            tableClass: 'ag-theme-flourish',
            label: 'Flourish'
          },
          {
            theme: 'indigo-theme',
            tableClass: 'ag-theme-indigo',
            label: 'Indigo Blue'
          }
        ],
        defaultTheme: {
          theme: 'flourish-theme',
          tableClass: 'ag-theme-flourish',
          label: 'Flourish'
        },
        CLASSNAMES: ["app-header", "mini-sidebar-menu"],
        SUBCLASSNAMES: ["text-white", "indication", "each-item"],
      };
      public static ALERT_MESSAGES: any = {
        CONFIRM_ALART_MESSAGE: 'Are you sure do you want to cancel? Any changes made cannot be saved.'
      }
      public static ColorCodesList: any = [];  // color list valiable
      public static setColorCodes() {
        if (this.ColorCodesList.length > 0) {
          return;
        }
        this.ColorCodesList = [];
        while (this.ColorCodesList.length <= 1000) {
          let color = this.getRandomColor();
          while (this.ColorCodesList.indexOf(color) > 0 || color.toString().length !== 6) {
            color = this.getRandomColor();
          }
          this.ColorCodesList.push(color);
        }
      }
}
