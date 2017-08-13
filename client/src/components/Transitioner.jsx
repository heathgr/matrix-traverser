import React, { Component, Children } from 'react';
import Style from 'style-it';

class Transitioner extends Component {

  constructor(props) {
    super(props);
    this.cleanActualChildren = this.cleanActualChildren.bind(this);

    const actualChildren = Children.toArray(props.children).map(
      (child, i) => ({
        element: child,
        isVisible: true,
        key: i,
      })
    );

    this.state = {
      actualChildren,
      keyCount: actualChildren.length,
      transitionTimeout: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    const oldChildren = this.state.actualChildren.map(
      child => ({
        ...child,
        isVisible: false,
      })
    );
    const newChildren = Children.toArray(nextProps.children).map(
      (child, i) => ({
        element: child,
        isVisible: true,
        key: i + this.state.keyCount,
      })
    );
    const combinedChildren = oldChildren.concat(newChildren);

    clearTimeout(this.state.transitionTimeout);
    const transitionTimeout = setTimeout(
      this.cleanActualChildren,
      500,
    );
    this.setState({
      ...this.state,
      actualChildren: combinedChildren,
      keyCount: this.state.keyCount + newChildren.length,
      transitionTimeout,
    });
  }

  cleanActualChildren() {
    this.setState({
      ...this.state,
      actualChildren: this.state.actualChildren.filter(
        child => child.isVisible
      ),
    });
  }

  render() {
    return Style.it(`
      @keyframes transitionInKeyframes {
        0% {opacity: 0; }
        100% {opacity: 1; }
      }

      @keyframes transitionOutKeyframes {
        0% {opacity: 1; }
        100% {opacity: 0; }
      }

      .transitionWrapper {
        width: 100%;
        height: 100%:
      }

      .transitionItem {
        position: absolute;
        left: 0px;
        right: 0px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .transitionIn {
        animation: 0.5s ease transitionInKeyframes;
      }

      .transitionOut {
        animation: 0.5s ease transitionOutKeyframes;
      }
    `, (
      <div className='transitionWrapper'>
        {
          this.state.actualChildren.map(
            child => (
              <div className={`transitionItem ${child.isVisible ? 'transitionIn' : 'transitionOut'}`} key={child.key}>
                {
                  child.element
                }
              </div>
            )
          )
        }
      </div>
    ));
  }
}

export default Transitioner;
