import React, { Component } from 'react';

import { Container, Row } from 'reactstrap';

import LocalizedComponent
  from '@gctools-components/react-i18n-translation-webpack';

import ProductJumbo from '../components/home/ProductJumbo';
import InfoText from '../components/home/InfoText';
import ProductFeatures from '../components/home/ProductFeatures';
import CallToActionLinks from '../components/home/CallToActionLinks';
import BlockCta from '../components/home/BlockCta';

import WaterMark from '../assets/imgs/wmms-alt.png';
import auroraStamp from '../assets/imgs/aurora-stamp.png';

import selfService from '../assets/imgs/home/self-service.png';
import search from '../assets/imgs/home/search.png';
import simpleProfile from '../assets/imgs/home/simple-profile.png';
import teams from '../assets/imgs/home/teams.png';
import orgChart from '../assets/imgs/home/org-chart.png';
import newUi from '../assets/imgs/home/new-ui.png';

/* eslint max-len: 0 */

class Home extends Component {
  componentDidMount() {
    document.title = 'Home Page';
  }

  render() {
    return (
      <div>
        <ProductJumbo
          appName={__('Search for anyone')}
          appDescription={__('Type in a name')}
        />
        <Container>
          <Row>
            <InfoText
              heading={__('This has no exclamation marks')}
              body={
                [
                  {
                    text: __('Welcome block text'),
                  },
                ]
              }
            />
          </Row>
          <CallToActionLinks />
          <ProductFeatures
            features={
              [
                {
                  img: selfService,
                  imgAlt: '',
                  featureHeading: __('Self-serve contact information'),
                  description: __('Easily update your contact information so that it is always accurate. You can make changes yourself and they will show up immediately.'),
                },
                {
                  img: search,
                  imgAlt: '',
                  featureHeading: __('Easy to search'),
                  description: __('Looking for someone? Quickly find other members and start collaborating.'),
                },
                {
                  img: simpleProfile,
                  imgAlt: '',
                  featureHeading: __('Clean and simple profile'),
                  description: __('Your profile is yours to complete. Add a profile photo to make it personal.'),
                },
                {
                  img: teams,
                  imgAlt: '',
                  featureHeading: __('Create teams'),
                  description: __('Supervisors can create teams and self-manage members.'),
                },
                {
                  img: orgChart,
                  imgAlt: '',
                  featureHeading: __('Organizational chart'),
                  description: __('Explore an entire team and find the exact person you need to talk to.'),
                },
                {
                  img: newUi,
                  imgAlt: '',
                  featureHeading: __('New interface design'),
                  description: __('A bright-blue colour scheme, rounded elements and minimalist look make the application just a little more fun to use.'),
                },
              ]
            }
            heading={__('Key features')}
          />
          <Row>
            <InfoText
              heading={__('What’s coming next?')}
              body={
                [
                  {
                    text: __('This is the first version of the Directory but we have big plans for the future. Below is a list of some features we have planned for development.'),
                  },
                  {
                    text: __('Please note that all these features are subject to change, as future features and improvements will depend on your feedback.'),
                  },
                ]
              }
            />
            <div className="d-flex justify-content-center w-100 mb-4">
              <ul className="w-75 ml-3 mr-3">
                <li>
                  {__('Automatic profile creation when you register for GCaccount, which includes your name and email address.')}
                </li>
                <li>
                  {__('Approval workflow that allows supervisors to approve requests for team members and employees.')}
                </li>
                <li>
                  {__('In-app notifications for items that require your attention (approvals, change requests, etc.)')}
                </li>
                <li>
                  {__('Ability to choose team avatars and colours')}
                </li>
                <li>
                  {__('Enhanced search functionality')}
                </li>
                <li>
                  {__('One-time profile transfer from GCcollab to Directory')}
                </li>
                <li>
                  {__('Integrating non-government accounts and users into Directory')}
                </li>
              </ul>
            </div>
          </Row>
        </Container>
        <BlockCta
          heading={__('How to provide your feedback')}
          body={
            [
              {
                text: __('We want your feedback to help us improve Directory and priorities new features to be developed. Before telling us what you think, play around and test out the new design and functionality of Directory. Take note of what you like, don’t like, and suggestions for improvement.'),
              },
              {
                text: __('We will be hosting user testing and feedback sessions where you can share what you’ve discovered. Join the (x) GCcollab group and keep an eye out for the next research session on Directory.'),
              },
            ]
          }
          actionText={__('Give us your Feedback')}
          actionLink="https://gccollab.ca/groups/profile/2104442/enresearch-participants-open-accessible-digital-workspacefrparticipants-de-recherche-u2013-espace-de-travail-numu00e9rique-ouvert-et-accessible"
        />
        <Container>
          <Row>
            <InfoText
              heading={__('All about the details')}
              body={
                [
                  {
                    text: __('This application is in its early stages. As a proof of concept, this application is not a finalized product ready for full use. It’s meant to be a first version with base features so that you can add your contact info, explore, and provide your feedback.'),
                  },
                  {
                    text: __('As a functional prototype, this application is set for user testing and exploration. We will be running user testing and feedback sessions soon, so play around and take note of what you like, what you don’t, and suggestions for improvement. See below for more information on how you can provide your feedback.'),
                  },
                  {
                    text: __('Because this is a proof of concept, there will be bugs in the system. If you come across a bug, don’t worry. We’ll be fixing bugs on a regular basis as we develop new features and improvements.'),
                  },
                  {
                    text: __('NOTE:'),
                  },
                  {
                    text: __('This application currently uses fake content so that we could accurately display certain features, such as the organizational chart. Approximately 12,000 users were randomly generated to add data to the application and show a realistic sample.'),
                  },
                  {
                    text: __('As we onboard more departments, and more public servants complete their profile, we will remove the fake content.'),
                  },
                ]
              }
            />
          </Row>
        </Container>
        <footer>
          <div className="bg-dark text-white p-4">
            <Container>
              <ul className="list-inline mb-0">
                <li className="list-inline-item pr-2">
                  <a
                    href="https://design.gccollab.ca/"
                    className="text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={auroraStamp}
                      alt=""
                      className="mr-2"
                    />
                    {__('Made with Aurora')}
                  </a>
                </li>
                <li className="list-inline-item pr-2">
                  <a
                    href="https://twitter.com/DigiEnablement"
                    className="text-white"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </Container>
          </div>
          <div>
            <Container className="pt-4">
              <img
                src={WaterMark}
                alt=""
                className="float-right mb-4"
              />
            </Container>
          </div>
        </footer>
      </div>
    );
  }
}

export default LocalizedComponent(Home);
