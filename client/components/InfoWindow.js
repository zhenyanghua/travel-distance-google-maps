import React from 'react'

class InfoWindow extends React.Component {
  render() {
    const {feature} = this.props
    const point = feature.getGeometry().get()
    const colorMap = {
      0: 'green',
      1: 'yellow',
      2: 'red'
    }
    const fake = feature.getProperty('fake')
    const matrix = feature.getProperty('matrix')
    const radius = matrix.distance ? matrix.distance.value : undefined
    return (
      <div className="ui card">
        <div className="content">
          <div className="ui header">
            {feature.getProperty('name')} &nbsp;
            <span className={"ui mini basic label " + colorMap[fake]}>
              {feature.getProperty('transaction_type')}
            </span>
            <div className="sub header">
              {feature.getProperty('transaction_time')}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="description">
            <i className="flag icon"></i>
            {feature.getProperty('formatted_address')}
          </div>
          <div className="description">
            <i className="call icon"></i>
            <span>{feature.getProperty('formatted_phone_number') || 'N/A'}</span>
          </div>
          <br />
          { !!feature.getProperty('opening_hours') ?
            feature.getProperty('opening_hours').map((x, i) => (
            <div className="description" key={i}>{x}</div>
          )) : null}
        </div>
        {
          feature.getProperty('transaction_type') !== 'online' &&
            !feature.getProperty('last') ?
            (<div className="content">
              <button className="ui button" onClick={() => this.showTravelArea(point, radius)}>
                <i className="red map pin icon"></i>Show Travel Area
              </button>
            </div>) : null
        }

      </div>
    )
  }

  showTravelArea(pos, radius) {
    const {circle} = this.props
    circle.setCenter(pos)
    circle.setRadius(radius)
  }

}

export default InfoWindow