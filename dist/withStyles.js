/*! Isomorphic Style Loader | MIT License | https://github.com/kriasoft/isomorphic-style-loader */

'use strict';

var React = require('react');
var hoistStatics = require('hoist-non-react-statics');
var StyleContext = require('./StyleContext.js');

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function withStyles() {
  for (var _len = arguments.length, styles = new Array(_len), _key = 0; _key < _len; _key++) {
    styles[_key] = arguments[_key];
  }

  return function wrapWithStyles(ComposedComponent) {
    var WithStyles = function (_React$PureComponent) {
      _inheritsLoose(WithStyles, _React$PureComponent);

      function WithStyles() {
        return _React$PureComponent.apply(this, arguments) || this;
      }

      var _proto = WithStyles.prototype;

      _proto.componentWillUnmount = function componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(this.removeCss, 0);
        }
      };

      _proto.render = function render() {
        var _this = this;

        return React.createElement(StyleContext.Consumer, null, function (_ref) {
          var insertCss = _ref.insertCss;
          _this.removeCss = insertCss.apply(void 0, styles);
          return React.createElement(ComposedComponent, _this.props);
        });
      };

      return WithStyles;
    }(React.PureComponent);

    var displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component';
    WithStyles.displayName = "WithStyles(" + displayName + ")";
    WithStyles.contextType = StyleContext;
    WithStyles.ComposedComponent = ComposedComponent;
    return hoistStatics(WithStyles, ComposedComponent);
  };
}

module.exports = withStyles;
//# sourceMappingURL=withStyles.js.map
