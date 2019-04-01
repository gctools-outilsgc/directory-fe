import React, { Component } from 'react';

import { Container, Row } from 'reactstrap';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import ProductJumbo from '../components/home/ProductJumbo';
import InfoText from '../components/home/InfoText';
import ProductFeatures from '../components/home/ProductFeatures';
import CallToActionLinks from '../components/home/CallToActionLinks';

const featureList = [
  {
    // eslint-disable-next-line max-len
    img: 'https://images.pexels.com/photos/908284/pexels-photo-908284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    imgAlt: 'this is an exmaple',
    featureHeading: 'Self-Service Profile',
    // eslint-disable-next-line max-len
    description: 'Chocolate bar sugar plum jujubes cookie gingerbread cupcake cupcake.',
    linkHref: '#',
    linkText: 'Learn More',
  },
  {
    // eslint-disable-next-line max-len
    img: 'https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    imgAlt: 'this is an example',
    featureHeading: 'Easy to search',
    // eslint-disable-next-line max-len
    description: 'Cookie fruitcake jujubes halvah muffin.',
    linkHref: '#',
    linkText: 'Learn More',
  },
  {
    // eslint-disable-next-line max-len
    img: 'https://images.pexels.com/photos/834949/pexels-photo-834949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    imgAlt: 'this is an example',
    featureHeading: 'Clean and simple profile',
    // eslint-disable-next-line max-len
    description: 'Cake pie liquorice ice cream candy donut.',
    linkHref: '#',
    linkText: 'Learn More',
  },
  {
    // eslint-disable-next-line max-len
    img: 'https://images.pexels.com/photos/908284/pexels-photo-908284.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    imgAlt: 'this is an exmaple',
    featureHeading: 'Create teams',
    // eslint-disable-next-line max-len
    description: 'Chocolate bar sugar plum jujubes cookie gingerbread cupcake cupcake.',
    linkHref: '#',
    linkText: 'Learn More',
  },
  {
    // eslint-disable-next-line max-len
    img: 'https://images.pexels.com/photos/1068523/pexels-photo-1068523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    imgAlt: 'this is an example',
    featureHeading: 'Organizational chart',
    // eslint-disable-next-line max-len
    description: 'Cookie fruitcake jujubes halvah muffin.',
    linkHref: '#',
    linkText: 'Learn More',
  },
  {
    // eslint-disable-next-line max-len
    img: 'https://images.pexels.com/photos/834949/pexels-photo-834949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    imgAlt: 'this is an example',
    featureHeading: 'New interface design',
    // eslint-disable-next-line max-len
    description: 'Cake pie liquorice ice cream candy donut.',
    linkHref: '#',
    linkText: 'Learn More',
  },
];

class Home extends Component {
  componentDidMount() {
    document.title = 'Home Page';
  }

  render() {
    return (
      <div>
        <ProductJumbo
          appName="Search for anyone"
          // eslint-disable-next-line max-len
          appDescription="Type a person's name to find their profile! Note that search is case sensitive."
        />
        <Container>
          <Row>
            <InfoText
              heading="Get Started with the new Directory!"
            />
          </Row>
          <CallToActionLinks />
          <ProductFeatures
            features={featureList}
            heading="Key features"
          />
          <Row>
            <InfoText
              heading="What's coming next?"
            />
          </Row>
          <Row>
            <InfoText
              heading="How to provide feedback"
            />
          </Row>
          <Row>
            <InfoText
              heading="All about the details"
            />
          </Row>
        </Container>
      </div>
    );
  }
}

export default LocalizedComponent(Home);
