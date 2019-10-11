/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import hoistStatics from 'hoist-non-react-statics'

import StyleContext from './StyleContext'

function withStyles(...styles) {
  return function wrapWithStyles(ComposedComponent) {
    class WithStyles extends React.PureComponent {
      componentWillUnmount() {
        if (this.removeCss) {
          setTimeout(this.removeCss, 0)
        }
      }

      render() {
        return (
          <StyleContext.Consumer>
            {
              ({insertCss}) => {
                this.removeCss = insertCss(...styles);
                return <ComposedComponent {...this.props} />
              }
            }
          </StyleContext.Consumer>
        )
      }
    }

    const displayName = ComposedComponent.displayName || ComposedComponent.name || 'Component'

    WithStyles.displayName = `WithStyles(${displayName})`
    WithStyles.contextType = StyleContext
    WithStyles.ComposedComponent = ComposedComponent

    return hoistStatics(WithStyles, ComposedComponent)
  }
}

export default withStyles
