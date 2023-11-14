import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],
  JavaScriptSidebar: [{type: 'autogenerated', dirName: 'javascript'}],
  HTMLSidebar: [{type: 'autogenerated', dirName: 'html'}],
  CSSSidebar: [{type: 'autogenerated', dirName: 'css'}],
  VueSidebar: [{type: 'autogenerated', dirName: 'vue'}],
  ReactSidebar: [{type: 'autogenerated', dirName: 'react'}],
  ExtensionSidebar: [{type: 'autogenerated', dirName: 'extension'}],
  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
