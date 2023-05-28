import React, { Component } from 'react';
import Newsitem from './Newsitem';

export class News extends Component {
  articals = {
    status: 'ok',
    totalResults: 2,
    articles: [
      {
        source: {
          id: 'espn-cric-info',
          name: 'ESPN Cric Info',
        },
        author: null,
        title:
          'PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com',
        description:
          'Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com',
        url: 'http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket',
        urlToImage:
          'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg',
        publishedAt: '2020-04-27T11:41:47Z',
        content:
          "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
      },
      {
        source: {
          id: 'time',
          name: 'Time',
        },
        author: 'Astha Rajvanshi / Mumbai',
        title: 'Deepika Padukone Is Bringing the World to Bollywood',
        description:
          'Deepika Padukone, India’s most popular actress, has a vision for what it means to be a truly global superstar.',
        url: 'http://time.com/6278237/deepika-padukone-bollywood-india-profile/',
        urlToImage:
          'https://api.time.com/wp-content/uploads/2023/05/deepika-padukone-1-5x4-1.jpg?quality=85&crop=0px%2C663px%2C1920px%2C1006px&resize=1200%2C628&strip',
        publishedAt: '2023-05-11T01:00:52Z',
        content:
          'Deepika Padukone never set out to take India to the world. She wanted the world to come to India. As the most popular actress in the world’s most populous country, she’s often asked if she’s going to… [+16478 chars]',
      },
      {
        source: {
          id: 'espn-cric-info',
          name: 'ESPN Cric Info',
        },
        author: null,
        title:
          'What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com',
        description:
          'Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com',
        url: 'http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again',
        urlToImage:
          'https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg',
        publishedAt: '2020-03-30T15:26:05Z',
        content:
          'Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]',
      },
    ],
  };

  constructor() {
    super();
    this.state = {
      articals: this.articals.articles,
      loading: false,
    };
  }

  async componentDidMount() {
    let url =
      'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=d1a83067ca2a4429a446468500e61923';
    let data = await url(url);
    let parseddata = await data.json();
    console.log(parseddata);
    //    this.setState({this.articals:parseddata.articales})
  }

  render() {
    return (
      <div className='container'>
        <h2>News Monkey</h2>
        <div className='row'>
          {this.state.articals.map((element) => {
            return (
              <div className='col md-4' key={element.url}>
                <Newsitem
                  Title={!element.title ? element.title.slice(0, 45) : ''}
                  Description={
                    !element.description ? element.description.slice(0, 88) : ''
                  }
                  imgurl={!element.urlToImage?element.urlToImage:""}
                  NewsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default News;
