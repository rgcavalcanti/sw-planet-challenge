import React, { Component } from 'react';
import styles from './PlanetCard.module.css'

import Aux from '../../hoc/Aux'

class PlanetCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      planetName: '',
      population: '',
      climate: '',
      terrain: '',
      planetsCount: 0,
      countFilms: 0,
      isLoaded: false
    };
  }

  async getPlanetsCount() {
    await fetch(`https://swapi.co/api/planets`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            planetsCount: result.count
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  async getRandomPlanet() {

    this.setState({ isLoaded: false })

    let randomPlanet = Math.floor((Math.random() * this.state.planetsCount) + 1)

    await fetch(`https://swapi.co/api/planets/${randomPlanet}`)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            planetName: result.name,
            population: result.population,
            climate: result.climate,
            terrain: result.terrain,
            countFilms: result.films.length
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  async componentDidMount() {
    await this.getPlanetsCount()
    await this.getRandomPlanet()
  }

  loadingInfo() {
    if (this.state.isLoaded) {
      return (
        <Aux>
          <div className={styles.PlanetCard}>
            <div className={styles.header}>
              <span>{this.state.planetName.toUpperCase()}</span>
            </div>
            <div className={styles.body}>
              <span>POPULATION: {this.state.population.toUpperCase()}</span>
              <span>CLIMATE: {this.state.climate.toUpperCase()}</span>
              <span>TERRAIN: {this.state.terrain.toUpperCase()}</span>
              <span>FEATURED IN {this.state.countFilms} FILMS</span>
            </div>
          </div>
          <button className={styles.button} onClick={() => { this.getRandomPlanet() }}>NEXT</button>
        </Aux>
      )
    }
    return (
      <Aux>
        <div className={styles.PlanetCard}>
          <div className={styles.header}>
            <span>LOADING...</span>
          </div>
          <div className={styles.body}>
          </div>
        </div>
        <button className={styles.button} onClick={() => { this.getRandomPlanet() }}>NEXT</button>
      </Aux>
    )
  }

  render() {
    return (
      this.loadingInfo()
    )
  }
}

export default PlanetCard