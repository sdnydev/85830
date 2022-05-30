module.exports = {
  '*.{html,js,json,md}': ['yarn prettier --write '],
  '*.{ts,tsx}': ['yarn eslint --fix '],
};
