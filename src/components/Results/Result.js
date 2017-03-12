import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    elevation: 4,
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },

  city: {
    fontSize: 18,
  },

  image: { width: 86, height: 29, marginRight: 20 },

  stats: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

class Result extends Component {
  constructor(props) {
    super(props);

    this.renderBus = this.renderBus.bind(this);
    this.renderMetro = this.renderMetro.bind(this);
  }

  renderBus() {
    if (this.props.hasTerminus) {
      return (
        <Image
          style={styles.image}
          source={require('../../../assets/bus.png')}
        />
      );
    }
    return (
      <Image
        style={styles.image}
        source={require('../../../assets/bus_grey.png')}
      />
    );
  }

  renderMetro() {
    if (this.props.hasMetro) {
      return (
        <Image
          style={styles.image}
          source={require('../../../assets/metro.png')}
        />
      );
    }
    return (
      <Image
        style={styles.image}
        source={require('../../../assets/metro_grey.png')}
      />
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, alignItems: 'center' }} >
          <Text style={styles.name}>
            {this.props.name}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10,
            marginTop: 20,
          }}
        >
          {this.renderMetro()}
          {this.renderBus()}
        </View>


        <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }} >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              margin: 10,
              marginTop: 20,
            }}
          >
            <View style={{ alignItems: 'center' }} >
              <Text style={styles.label}>Stationnements</Text>
              <Text style={styles.stats}>{this.props.numPlaces.total}</Text>
            </View>
            <View style={{ alignItems: 'center' }} >
              <Text style={styles.label}>Places payantes</Text>
              <Text style={styles.stats}>{this.props.numPlaces.withFee}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-around',
              margin: 10,
              marginTop: 0,
            }}
          >
            <View style={{ alignItems: 'center' }} >
              <Text style={styles.label}>Co-voiturage</Text>
              <Text style={styles.stats}>{this.props.numPlaces.forCarpoolers}</Text>
            </View>
            <View style={{ alignItems: 'center' }} >
              <Text style={styles.label}>Borne électrique</Text>
              <Text style={styles.stats}>{this.props.numPlaces.withEVStation}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Result.propTypes = {

};

export default Result;