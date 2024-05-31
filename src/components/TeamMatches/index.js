// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import LatestMatch from '../LatestMatch'

import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {blogData: {}, isLoading: true}

  componentDidMount() {
    this.getBlogItemData()
  }

  getBlogItemData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: data.latest_match_details,
      recentMatches: data.recent_matches,
    }
    this.setState({blogData: updatedData, isLoading: false})
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  renderBlogItemDetails = () => {
    const {blogData} = this.state

    const {teamBannerUrl, latestMatchDetails, recentMatches} = blogData

    return (
      <div className="teamMatches-container">
        <img
          src={teamBannerUrl}
          className="teamMatch-banner-img"
          alt="team banner"
        />
        <ul className="latestMatches-container">
          <li>
            <h1 className="heading">Latest Matches</h1>
          </li>
          <LatestMatch latestMatchDetails={latestMatchDetails} />
        </ul>
        <ul className="recentMatches-container">
          {recentMatches.map(item => (
            <MatchCard recentMatch={item} key={item.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    const containerClassName = `bg-container ${this.getRouteClassName()}`
    return (
      <div className={containerClassName}>
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          this.renderBlogItemDetails()
        )}
      </div>
    )
  }
}

export default TeamMatches
