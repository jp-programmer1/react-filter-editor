import { addons } from '@storybook/addons';
import theme from './theme';

addons.setConfig({
  isFullscreen: false,
  showNav: true,
  showPanel: false,
  panelPosition: 'bottom',
  enableShortcuts: true,
  isToolshown: true,
  theme: theme,
  selectedPanel: undefined,
  initialActive: 'sidebar',
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: true },
    zoom: { hidden: true },
    eject: { hidden: true },
    copy: { hidden: true },
    fullscreen: { hidden: true },
    'storybook/background': { hidden: true },
    'storybook/viewport': { hidden: true },
    'storybook/outline': {hidden: true},
    'storybook/measureEnabled': {hidden: true}
  }
});