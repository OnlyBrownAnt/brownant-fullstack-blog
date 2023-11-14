import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'BrownAnt Full-Stack Blog',
  tagline: '>_< 人生不熄，Coding不止',
  // favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'http://brownant.top',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  // organizationName: 'onlyBrownAnt', // Usually your GitHub org/user name.
  // projectName: 'brownant-fullstack-blog', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
  themeConfig: {
    // Replace with your project's social card
    // image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'Home',
      hideOnScroll: false,
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'JavaScriptSidebar',
          position: 'left',
          label: 'JavaScript',
        },
        {
          type: 'docSidebar',
          sidebarId: 'HTMLSidebar',
          position: 'left',
          label: 'HTML',
        },
        {
          type: 'docSidebar',
          sidebarId: 'CSSSidebar',
          position: 'left',
          label: 'CSS',
        },
        {
          type: 'docSidebar',
          sidebarId: 'VueSidebar',
          position: 'left',
          label: 'Vue',
        },
        {
          type: 'docSidebar',
          sidebarId: 'ReactSidebar',
          position: 'left',
          label: 'React',
        },
        {
          type: 'docSidebar',
          sidebarId: 'ExtensionSidebar',
          position: 'right',
          label: 'Extension',
        },
        {
          type: 'search',
          position: 'right',
        },
        {
          href: 'https://github.com/OnlyBrownAnt',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    algolia: {
      // The application ID provided by Algolia
      appId: '113ROSTJD8',

      // Public API key: it is safe to commit it
      apiKey: '3681a52a632bb331ff4ce8c886209d70',

      indexName: 'brownant',

      // Optional: see doc section below
      contextualSearch: true,

      // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
      externalUrlRegex: 'external\\.com|domain\\.com',

      // Optional: Replace parts of the item URLs from Algolia. Useful when using the same search index for multiple deployments using a different baseUrl. You can use regexp or string in the `from` param. For example: localhost:3000 vs myCompany.com/docs
      replaceSearchResultPathname: {
        from: '/docs/', // or as RegExp: /\/docs\//
        to: '/',
      },

      // Optional: Algolia search parameters
      searchParameters: {},

      // Optional: path for search page that enabled by default (`false` to disable it)
      searchPagePath: 'search',

      //... other Algolia params
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} BrownAnt, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'java', 'json'],
    }, 
  } satisfies Preset.ThemeConfig,
};

export default config;
