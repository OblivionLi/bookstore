import React, {PureComponent} from 'react';
import IPaginationProps from "../types/IPaginationProps";

class Pagination extends PureComponent<IPaginationProps> {
    handleClick = (page: number) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
        this.props.onPageChange(page);
    }

    generatePaginationLinks = () => {
        const { currentPage, totalPages } = this.props;
        const links = [];

        for (let page = 1; page <= totalPages; page++) {
            links.push(
                <li key={page} className={`page-item ${currentPage === page - 1 ? 'active' : ''}`}>
                    <a onClick={this.handleClick(page - 1)} className="page-link">
                        {page}
                    </a>
                </li>
            );
        }

        return links;
    }

    render() {
        const { currentPage, totalPages } = this.props;

        return (
            <nav aria-label="Page navigation pagination">
                <ul className="pagination justify-content-center">
                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={this.handleClick(currentPage - 1)}>
                            Previous
                        </a>
                    </li>

                    {this.generatePaginationLinks()}
                    <li className={`page-item ${currentPage === totalPages -1 || currentPage === 0 ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={this.handleClick(currentPage + 1)}>
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Pagination;