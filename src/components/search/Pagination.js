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
      todosPerPage: 6,
    };
    this.handleClick = this.handleClick.bind(this);
    this.nextSave = this.nextSave.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.page !== this.state.currentPage) {
      this.setState({ currentPage: nextProps.page });
    }
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
    const { currentPage, todosPerPage } = this.state;
    let renderPageNumbers = [];
    const pageNumbers = [];
    let numberResults = '';

    if (this.props.resultSearch) {
      numberResults = Object.keys(this.props.resultSearch).length;
      for (let i = 1; i <= Math.ceil(numberResults / todosPerPage); i += 1) {
        pageNumbers.push(i);
      }

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
};

Paginations.defaultProps = {
  paginationCurrentpage: () => {},
  resultSearch: [],
  page: '',
};

export default Paginations;
