import React, { Component } from 'react'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import TextField from '@material-ui/core/TextField'

import MainLayout from '../MainLayout'
import AppToolbar from '../../components/AppToolbar'
import Centered from '../../components/Centered'

class MainPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mag: '',
      magType: '',
      earthquakes: [],
      filteredEarthquakes: [],
    }
  }

  handleOnMagTypeChange = (event) => {
    const { value } = event.target
    this.setState({ magType: value })
    if (value) {
      this.setState({
        filteredEarthquakes: this.state.earthquakes.filter(
          (quake) => quake.properties.magType === value,
        ),
      })
    } else {
      this.setState({ filteredEarthquakes: this.state.earthquakes })
    }
  }

  handleOnMagChange = (event) => {
    const { value } = event.target
    this.setState({ mag: value })
    if (value) {
      this.setState({
        filteredEarthquakes: this.state.earthquakes.filter(
          (quake) => quake.properties.mag === Number(value),
        ),
      })
    } else {
      this.setState({ filteredEarthquakes: this.state.earthquakes })
    }
  }

  componentDidMount() {
    fetch(
      `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02`,
    )
      .then((r) => r.json())
      .then((earthquakes) =>
        this.setState({
          earthquakes: earthquakes.features,
          filteredEarthquakes: earthquakes.features,
        }),
      )
  }

  render() {
    const { filteredEarthquakes, mag, magType } = this.state
    return (
      <MainLayout appBar={<AppToolbar />}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <TextField
            style={{ marginTop: '4rem', marginRight: '4rem' }}
            id="magnitude"
            label="Magnitude"
            placeholder="magnitude"
            value={mag}
            onChange={this.handleOnMagChange}
            variant="outlined"
            autoFocus
          />
          <TextField
            style={{ marginTop: '4rem' }}
            id="magtype"
            label="Magnitude Type"
            placeholder="type of magnitude"
            value={magType}
            onChange={this.handleOnMagTypeChange}
            variant="outlined"
            autoFocus
          />
        </div>
        <Centered>
          {filteredEarthquakes && filteredEarthquakes.length > 0 ? (
            <List>
              {filteredEarthquakes.map((quake) => (
                <ListItem key={quake.id}>
                  <ListItemText>
                    {`${quake.id} : ${quake.properties.place} : ${quake.properties.mag} : ${quake.properties.magType}`}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          ) : (
            <h1>Sorry no earthquakes found</h1>
          )}
        </Centered>
      </MainLayout>
    )
  }
}

export default MainPage
