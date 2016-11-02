import React from 'react'

class ListItem extends React.Component {
  render() {
    this.store = this.props.store
    const attrs = this.store.properties
    this.map = this.props.map
    const feature = this.map ? this.map.data.getFeatureById(attrs.id): undefined
    const point = feature ? feature.getGeometry().get(): undefined
    const radius = attrs.matrix.distance ? attrs.matrix.distance.value : undefined
    const colorMap = {
      0: 'green',
      1: 'yellow',
      2: 'red'
    }
    return (
      <div ref="container" className="item store"
           onMouseOver={() => this.mouseOver()}
           onMouseOut={() => this.mouseOut()}>
        <h4 className={"ui top attached inverted header time " + colorMap[attrs.fake]}>
          {attrs.transaction_time}
        </h4>
        <div className="ui attached segment">
          <div className="content details">
            <a className="header" href={'#/' + attrs.name}>
              {attrs.name} &nbsp;
              <span className={"ui mini basic label " + colorMap[attrs.fake]}>
                {attrs.transaction_type}
              </span>
            </a>
            <div className="description">
              <i className="call icon"></i>
              <span>{attrs.formatted_phone_number || 'N/A'}</span>
            </div>
            <div className="description">
              <i className="flag icon"></i>
              <span>{attrs.formatted_address}</span>
            </div>
            {
              !attrs.last &&
              (<div>
                {
                  attrs.drive_time &&
                  <br/>
                }
                {
                  attrs.drive_time &&
                  (<div className="safe description">
                    <i className="icon"></i>
                    <span>{attrs.drive_time}</span>
                  </div>)
                }
                {
                  attrs.transactions_interval &&
                  (<div className="safe description">
                    <i className="icon"></i>
                    <span>{attrs.transactions_interval}</span>
                  </div>)
                }
              </div>)
            }
            {
              attrs.last &&
              (<div>
                  <div className="header">
                    <br/>
                    <i className="warning sign icon"></i>
                    Something is not right:
                  </div>
                  {
                    attrs.drive_time &&
                    (<div className="danger description">
                      <i className="icon"></i>
                      <span>{attrs.drive_time}</span>
                    </div>)
                  }
                  {
                    attrs.transactions_interval &&
                    (<div className="danger description">
                      <i className="icon"></i>
                      <span>{attrs.transactions_interval}</span>
                    </div>)
                  }
                </div>
              )
            }

          </div>
          {/*
            attrs.transaction_type !== 'online' && !attrs.last &&
              (<div className="content operations">
                <div className="tiny ui basic button" onClick={() => this.showTravelArea(point, radius)}>
                  <i className="red map pin icon"></i>
                  Show Travel Area
                </div>
              </div>)
          */}
        </div>
      </div>
    )
  }
  mouseOver() {
    const { properties } = this.store
    const feature = this.map.data.getFeatureById(properties.id)
    this.map.data.overrideStyle(feature, {
      icon: {
        url: 'public/images/blue-pin.png'
      },
      zIndex: 1000
    })
  }
  mouseOut() {
    this.map.data.revertStyle()
  }

  showTravelArea(pos, radius) {
    const {circle} = this.props
    circle.setCenter(pos)
    circle.setRadius(radius)
  }
}
export default ListItem