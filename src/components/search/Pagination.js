import React from 'react';
import PropTypes from 'prop-types';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// A simple component that shows the pathname of the current location
class Paginations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResult: [],
      currentPage: 1,
      isMobile: false,
      windowWidth: 0,
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextSave = this.nextSave.bind(this);
    // eslint-disable-next-line
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.state.currentPage) {
      this.setState({ currentPage: nextProps.page });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  throttledHandleWindowResize() {
    this.setState({ isMobile: window.innerWidth < 480 });
    console.log(this.state.isMobile);
  }

  updateDimensions() {
    // eslint-disable-next-line
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
    this.setState({ windowWidth });
  }

  nextSave(prevNext, pageNumbers) {
    if (prevNext >= 1 && prevNext <= pageNumbers[pageNumbers.length - 1]) {
      this.setState({
        currentPage: Number(prevNext),
      }, () => {
        this.sendDate();
      });
    }
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id),
    }, () => {
      this.sendDate();
    });
  }

  sendDate() {
    this.props.paginationCurrentpage(this.state.currentPage);
  }
  render() {
    const { currentPage, windowWidth } = this.state;
    let renderPageNumbers = [];
    const pageNumbers = [];
    let numberResults = '';
    let startPage = '';
    let endPage = '';
    if (this.props.resultSearch) {
      numberResults = Object.keys(this.props.resultSearch).length;
      // eslint-disable-next-line
      for (let i = 1; i <= Math.ceil(numberResults / this.props.perPage); i += 1) {
        pageNumbers.push(i);
      }

      if (currentPage) {
        console.log(this.state.windowWidth);
        if (windowWidth < 600) {
          if (currentPage < 3) {
            startPage = 0;
          } else {
            startPage = currentPage - 3;
          }
          if (currentPage + 2 > numberResults) {
            endPage = numberResults;
          } else {
            endPage = currentPage + 2;
          }

          // eslint-disable-next-line
          renderPageNumbers = pageNumbers.slice(startPage,endPage).map(number => (
            <PaginationItem
              key={number}
              className={(this.state.currentPage === number ? 'active ' : '')}
            >
              <PaginationLink id={number} onClick={this.handleClick}>
                {number}
              </PaginationLink>
            </PaginationItem>
          ));
        } else {
          renderPageNumbers = pageNumbers.map(number => (
            <PaginationItem
              key={number}
              className={(this.state.currentPage === number ? 'active ' : '')}
            >
              <PaginationLink id={number} onClick={this.handleClick}>
                {number}
              </PaginationLink>
            </PaginationItem>
          ));
        }
      }
    }

    return (
      <Pagination
        style={{ display: 'flex', justifyContent: 'center' }}
        aria-label="Page navigation"
        id="page-numbers"
      >
        <PaginationItem disabled={currentPage <= 1}>
          <PaginationLink
            onClick={() => { this.nextSave(currentPage - 1, pageNumbers); }}
          >
            {__('Previous')}
          </PaginationLink>
        </PaginationItem>
        {renderPageNumbers}
        <PaginationItem
          disabled={currentPage >= pageNumbers[pageNumbers.length - 1]}
        >
          <PaginationLink
            onClick={() => { this.nextSave(currentPage + 1, pageNumbers); }}
          >
            {__('Next')}
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    );
  }
}

Paginations.propTypes = {
  paginationCurrentpage: PropTypes.func,
  resultSearch: PropTypes.shape,
  page: PropTypes.string,
  perPage: PropTypes.number,
};

Paginations.defaultProps = {
  paginationCurrentpage: () => {},
  resultSearch: [],
  page: '',
  perPage: 6,
};

export default Paginations;
