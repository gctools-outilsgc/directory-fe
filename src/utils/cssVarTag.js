/**
 * This module provides fallback for browsers who don't support CSS variables
 */

const cssVariables = {
  '--blue': '#007bff',
  '--indigo': '#6610f2',
  '--purple': '#6f42c1',
  '--pink': '#e83e8c',
  '--red': '#dc3545',
  '--orange': '#fd7e14',
  '--yellow': '#ffc107',
  '--green': '#28a745',
  '--teal': '#20c997',
  '--cyan': '#17a2b8',
  '--white': '#fff',
  '--gray': '#6c757d',
  '--gray-dark': '#343a40',
  '--primary': '#002D42',
  '--secondary': '#002D42',
  '--success': '#278400',
  '--info': '#269abc',
  '--warning': '#f90',
  '--danger': '#d3080c',
  '--light': '#FFF',
  '--dark': '#343a40',
  '--breakpoint-xs': '0',
  '--breakpoint-sm': '576px',
  '--breakpoint-md': '768px',
  '--breakpoint-lg': '992px',
  '--breakpoint-xl': '1200px',
  '--font-family-sans-serif': '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"', // eslint-disable-line max-len
  '--font-family-monospace': 'SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace', // eslint-disable-line max-len
};
const styles = getComputedStyle(document.body);

const varTag = (variable) => {
  if (!styles.getPropertyValue(variable)) {
    return cssVariables[variable];
  }
  return `var(${variable})`;
};

export default varTag;

