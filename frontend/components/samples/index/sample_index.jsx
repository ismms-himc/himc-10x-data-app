import React from 'react';
import LoadingIcon from '../../loading/loading_icon';
import ReactDataGrid from 'react-data-grid';
{/*
  there's a warning that's raised when importing this package.
  see https://github.com/adazzle/react-data-grid/issues/858
*/}
import { Toolbar, Data } from 'react-data-grid-addons';

const Selectors = Data.Selectors;

import { cloneDeep } from 'lodash';
import $ from 'jquery';

export default class SampleIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [
        { key: 'sample_id', name: 'Sample ID', sortable: true, filterable: true },
        { key: 'run_id', name: 'Run ID', sortable: true, filterable: true },
        { key: 'reference_transcriptome', name: 'Reference Transcriptome', sortable: true, filterable: true },
        { key: 'viewWebSummaryButton', name: 'Web Summary' },
        { key: 'downloadFastqsButton', name: 'FASTQs'},
        { key: 'downloadGeneBcMatricesButton', name: 'Gene BC Matrices'}
      ],
      sortColumn: null,
      sortDirection: null,
      filters: {}
    };

    this.viewWebSummary = this.viewWebSummary.bind(this);
    this.addViewWebSummaryButton = this.addViewWebSummaryButton.bind(this);
    this.fetchWebSummaryUrl = this.fetchWebSummaryUrl.bind(this);

    this.addDownloadFastqsButton = this.addDownloadFastqsButton.bind(this);
    this.downloadFastqs = this.downloadFastqs.bind(this);
    this.fetchFastqsUrl = this.fetchFastqsUrl.bind(this);

    this.addDownloadGeneBcMatricesButton = this.addDownloadGeneBcMatricesButton.bind(this);
    this.downloadGeneBcMatrices = this.downloadGeneBcMatrices.bind(this);
    this.fetchGeneBcMatricesUrl = this.fetchGeneBcMatricesUrl.bind(this);

    this.rowGetter = this.rowGetter.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getSize = this.getSize.bind(this);

    this.fetchPresignedUrl = this.fetchPresignedUrl.bind(this);
    this.handleGridSort = this.handleGridSort.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.onClearFilters = this.onClearFilters.bind(this);
  }

  componentDidMount() {
    console.log('component is mounting');
    this.props.requestSamples();
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
    console.log(this.props);
    console.log(nextProps);
    console.log(this.props == nextProps);
  }

  addDownloadFastqsButton(sample) {
    const downloadFastqsButton = <button type="submit"
                                  onClick={() => this.downloadFastqs(sample['id'])}>Download Run FASTQs</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['downloadFastqsButton'] = downloadFastqsButton;
    return sampleClone;
  }

  addDownloadGeneBcMatricesButton(sample){
    const downloadGeneBcMatricesButton = <button type="submit"
                                            onClick={() => this.downloadGeneBcMatrices(sample['id'])}>Download Matrices</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['downloadGeneBcMatricesButton'] = downloadGeneBcMatricesButton;
    return sampleClone;
  }

  addViewWebSummaryButton(sample) {
    const viewWebSummaryButton = <button type="submit"
                                  onClick={() => this.viewWebSummary(sample['id'])}>View Web Summary</button>;
    const sampleClone = cloneDeep(sample);
    sampleClone['viewWebSummaryButton'] = viewWebSummaryButton;
    return sampleClone;
  }

  downloadFastqs(sampleId) {
    {/* TODO:
      disable download button?
      put up the loading modal
      make request to backend - done
      take down loading modal
      open the presigned URL - done
      */}
    this.fetchFastqsUrl(sampleId)
  }

  downloadGeneBcMatrices(sampleId) {
    {/* TODO:
      disable download button?
      put up the loading modal
      make request to backend - done
      take down loading modal
      open the presigned URL - done
      */}
    this.fetchGeneBcMatricesUrl(sampleId);
  }

  fetchFastqsUrl(sampleId) {
    this.fetchPresignedUrl('fastqs_url', sampleId)
  }

  fetchGeneBcMatricesUrl(sampleId) {
    this.fetchPresignedUrl('gene_bc_matrices_url', sampleId)
  }

  fetchWebSummaryUrl(sampleId) {
    this.fetchPresignedUrl('web_summary_url', sampleId)
  }

  fetchPresignedUrl(resourceType, sampleId) {
    {/* Note, use of snake-case resourceType arguments below is due to the fact that
      the backend routes are named with snake-case (Python convention) instead
      of camel-case (JavaScript) convention */}
    $.ajax({
      method: 'GET',
      url: `/api/samples/${sampleId}/${resourceType}`
    })
    .fail(function (response, textStatus, errorThrown) {
      {/*
        TODO: handle failures better; also handle when fastqs not yet uploaded to
        S3 bucket. AJAX request response will be 200 OK even if resource doesn't
        exist at the URL. A new tab with and Error Code 'NoSuchKey' will open.

        In addition, handle when gene_bc_matrices not yet uploaded to S3 bucket.
        App crashes when you click 'Download Matrices' and there are none to download.
        */}
      alert('request failed')
    })
    .done(function (data, textStatus, response) {
      data = JSON.parse(data);
        window.open(data[resourceType]);
    });
  }

  getRows() {
    var rows = this.props.samples || [];
    if (rows.length > 0) {
      const rowsWithViewWebSummaryButton = rows.map(this.addViewWebSummaryButton);
      const rowsWithDownloadFastqsButton = rowsWithViewWebSummaryButton.map(this.addDownloadFastqsButton);
      const rowsWithDownloadGeneBcMatricesButton = rowsWithDownloadFastqsButton.map(this.addDownloadGeneBcMatricesButton);
      return rowsWithDownloadGeneBcMatricesButton;
    } else {
      return rows;
    }
  }

  getSize() {
    return this.getRows().length;
  }

  handleFilterChange(filter) {
    console.log('handling filter change');
    console.log(filter);
    let newFilters = Object.assign({}, this.state.filters);
    if (filter.filterTerm) {
      newFilters[filter.column.key] = filter;
    } else {
      delete newFilters[filter.column.key];
    }
    console.log('before setState');
    {/*this.setState({ filters: newFilters });*/}
  }

  handleGridSort(sortColumn, sortDirection) {
    console.log('handling grid sort');
    console.log(sortColumn);
    console.log(sortDirection);
    console.log(this);
    {/*  TODO: flesh out this function */}
    this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
  }

  onClearFilters() {
    console.log('clearing filters');
    this.setState({ filters: {} });
  }

  rowGetter(rowIdx) {
    const rows = this.getRows();
    return rows[rowIdx];
  }

  viewWebSummary(sampleId) {
    {/* TODO:
      disable download button?
      put up the loading modal
      make request to backend - done
      take down loading modal
      open the presigned URL - done
      */}
    this.fetchWebSummaryUrl(sampleId)
  }

  render() {
    const { samples, loading } = this.props;
    const { columns, allowedPageSizes } = this.state;

    if (loading) {
      return <LoadingIcon />;
    } else {
      return (
        <div className='samples-index'>
          <ReactDataGrid
            onGridSort={this.handleGridSort}
            enableCellSelect={true}
            columns={columns}
            rowGetter={this.rowGetter}
            rowsCount={this.getSize()}
            minHeight={500}
            toolbar={<Toolbar enableFilter={true}/>}
            onAddFilter={this.handleFilterChange}
            onClearFilters={this.onClearFilters} />
        </div>
      );
    }
  }
}
